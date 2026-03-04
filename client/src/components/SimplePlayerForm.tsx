import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import type { Player } from "@shared/types";

interface SimplePlayerFormProps {
  player?: Player;
  onSuccess: () => void;
}

const ROLE_OPTIONS = ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];

export default function SimplePlayerForm({ player, onSuccess }: SimplePlayerFormProps) {
  const [name, setName] = useState(player?.name || "");
  const [email, setEmail] = useState(player?.email || "");
  const [roles, setRoles] = useState<string[]>(
    player?.role ? (typeof player.role === "string" ? player.role.split(",").map(r => r.trim()) : []) : []
  );
  const [battingStyle, setBattingStyle] = useState(player?.battingStyle || "");
  const [bowlingStyle, setBowlingStyle] = useState(player?.bowlingStyle || "");
  const [jerseyNumber, setJerseyNumber] = useState(player?.jerseyNumber?.toString() || "");
  const [photoUrl, setPhotoUrl] = useState(player?.photoUrl || "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(player?.photoUrl || "");
  const [uploading, setUploading] = useState(false);

  const createPlayer = trpc.players.create.useMutation();
  const updatePlayer = trpc.players.update.useMutation();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhotoMutation = trpc.players.uploadPhoto.useMutation();

  const uploadPhoto = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          const result = await uploadPhotoMutation.mutateAsync({
            fileName: file.name,
            fileData: base64,
          });
          resolve(result.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const toggleRole = (role: string) => {
    setRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Player name is required");
      return;
    }

    if (roles.length === 0) {
      toast.error("Please select at least one role");
      return;
    }

    try {
      setUploading(true);
      let finalPhotoUrl = photoUrl;

      // Upload photo if a new one was selected
      if (photoFile) {
        finalPhotoUrl = await uploadPhoto(photoFile);
      }

      const payload = {
        name,
        email: email || undefined,
        role: roles.join(", "),
        battingStyle,
        bowlingStyle,
        jerseyNumber: jerseyNumber ? parseInt(jerseyNumber) : undefined,
        photoUrl: finalPhotoUrl,
        bio: "",
        runsScored: 0,
        wicketsTaken: 0,
        matchesPlayed: 0,
      };

      if (player?.id) {
        await updatePlayer.mutateAsync({
          id: player.id,
          data: payload,
        });
        toast.success("Player updated");
      } else {
        await createPlayer.mutateAsync(payload);
        toast.success("Player created");
        setName("");
        setEmail("");
        setRoles([]);
        setBattingStyle("");
        setBowlingStyle("");
        setJerseyNumber("");
        setPhotoUrl("");
        setPhotoFile(null);
        setPhotoPreview("");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save player");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Photo Upload */}
        <div className="md:col-span-2">
          <Label className="text-sm">Player Photo</Label>
          <div className="mt-2">
            {photoPreview ? (
              <div className="relative w-32 h-32">
                <img
                  src={photoPreview}
                  alt="Player preview"
                  className="w-full h-full object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview("");
                    setPhotoFile(null);
                    setPhotoUrl("");
                  }}
                  className="absolute top-1 right-1 bg-destructive text-white p-1 rounded hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent transition-colors">
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">Upload Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-sm">Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Player name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm">Email (for match reminders)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="player@example.com"
          />
        </div>

        {/* Jersey Number */}
        <div>
          <Label htmlFor="jerseyNumber" className="text-sm">Jersey Number</Label>
          <Input
            id="jerseyNumber"
            type="number"
            value={jerseyNumber}
            onChange={(e) => setJerseyNumber(e.target.value)}
            placeholder="7"
          />
        </div>

        {/* Batting Style */}
        <div>
          <Label htmlFor="battingStyle" className="text-sm">Batting Style</Label>
          <Input
            id="battingStyle"
            value={battingStyle}
            onChange={(e) => setBattingStyle(e.target.value)}
            placeholder="Right-handed / Left-handed"
          />
        </div>

        {/* Bowling Style */}
        <div>
          <Label htmlFor="bowlingStyle" className="text-sm">Bowling Style</Label>
          <Input
            id="bowlingStyle"
            value={bowlingStyle}
            onChange={(e) => setBowlingStyle(e.target.value)}
            placeholder="Fast / Spin"
          />
        </div>

        {/* Roles - Multiple Selection */}
        <div className="md:col-span-2">
          <Label className="text-sm">Roles * (Select one or more)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {ROLE_OPTIONS.map((roleOption) => (
              <label
                key={roleOption}
                className="flex items-center gap-2 p-2 border border-border rounded cursor-pointer hover:bg-card/50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={roles.includes(roleOption)}
                  onChange={() => toggleRole(roleOption)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{roleOption}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={createPlayer.isPending || updatePlayer.isPending || uploading || uploadPhotoMutation.isPending}
        className="w-full"
      >
        {uploading || uploadPhotoMutation.isPending ? "Uploading..." : player ? "Update Player" : "Add Player"}
      </Button>
    </form>
  );
}
