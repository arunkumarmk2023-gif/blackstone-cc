import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Player } from "@shared/types";

interface SimplePlayerFormProps {
  player?: Player;
  onSuccess: () => void;
}

export default function SimplePlayerForm({ player, onSuccess }: SimplePlayerFormProps) {
  const [name, setName] = useState(player?.name || "");
  const [role, setRole] = useState<"Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper">(player?.role || "Batsman");
  const [battingStyle, setBattingStyle] = useState(player?.battingStyle || "");
  const [bowlingStyle, setBowlingStyle] = useState(player?.bowlingStyle || "");
  const [jerseyNumber, setJerseyNumber] = useState(player?.jerseyNumber?.toString() || "");
  const [isCaptain, setIsCaptain] = useState(player?.isCaptain ? true : false);
  const [isImpactPlayer, setIsImpactPlayer] = useState(player?.isImpactPlayer ? true : false);

  const createPlayer = trpc.players.create.useMutation();
  const updatePlayer = trpc.players.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Player name is required");
      return;
    }

    try {
      const payload = {
        name,
        role: role as "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper",
        battingStyle,
        bowlingStyle,
        jerseyNumber: jerseyNumber ? parseInt(jerseyNumber) : undefined,
        isCaptain: isCaptain ? 1 : 0,
        isImpactPlayer: isImpactPlayer ? 1 : 0,
        photoUrl: "",
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
        setRole("Batsman");
        setBattingStyle("");
        setBowlingStyle("");
        setJerseyNumber("");
        setIsCaptain(false);
        setIsImpactPlayer(false);
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save player");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-3">
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

        <div>
          <Label htmlFor="role" className="text-sm">Role</Label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper")}
            className="w-full px-2 py-1 border border-border rounded text-sm"
          >
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-Rounder</option>
            <option>Wicketkeeper</option>
          </select>
        </div>

        <div>
          <Label htmlFor="battingStyle" className="text-sm">Batting Style</Label>
          <Input
            id="battingStyle"
            value={battingStyle}
            onChange={(e) => setBattingStyle(e.target.value)}
            placeholder="Right-handed / Left-handed"
          />
        </div>

        <div>
          <Label htmlFor="bowlingStyle" className="text-sm">Bowling Style</Label>
          <Input
            id="bowlingStyle"
            value={bowlingStyle}
            onChange={(e) => setBowlingStyle(e.target.value)}
            placeholder="Fast / Spin"
          />
        </div>

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

        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCaptain}
              onChange={(e) => setIsCaptain(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Captain</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isImpactPlayer}
              onChange={(e) => setIsImpactPlayer(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Impact Player</span>
          </label>
        </div>
      </div>

      <Button type="submit" disabled={createPlayer.isPending || updatePlayer.isPending} className="w-full">
        {player ? "Update Player" : "Add Player"}
      </Button>
    </form>
  );
}
