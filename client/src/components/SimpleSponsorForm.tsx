import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sponsor } from "@shared/types";
import { Upload, X } from "lucide-react";

interface SimpleSponsorFormProps {
  sponsor?: Sponsor;
  onSuccess?: () => void;
}

export default function SimpleSponsorForm({ sponsor, onSuccess }: SimpleSponsorFormProps) {
  const [formData, setFormData] = useState({
    name: sponsor?.name || "",
    logo: sponsor?.logo || "",
    website: sponsor?.website || "",
    description: sponsor?.description || "",
    tier: sponsor?.tier || "bronze",
    displayOrder: sponsor?.displayOrder || 0,
    active: sponsor?.active || 1,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(sponsor?.logo || null);
  const [isUploading, setIsUploading] = useState(false);

  const showToast = (message: string, error = false) => {
    console.log(error ? `Error: ${message}` : message);
  };
  const utils = trpc.useUtils();

  const uploadPhotoMutation = trpc.sponsors.uploadPhoto.useMutation({
    onSuccess: (data) => {
      setFormData({ ...formData, logo: data.url });
      setLogoPreview(data.url);
      showToast("Logo uploaded successfully");
    },
    onError: (error) => {
      showToast(error.message, true);
    },
  });

  const createMutation = trpc.sponsors.create.useMutation({
    onSuccess: () => {
      showToast("Sponsor created successfully");
      setFormData({
        name: "",
        logo: "",
        website: "",
        description: "",
        tier: "bronze",
        displayOrder: 0,
        active: 1,
      });
      setLogoPreview(null);
      utils.sponsors.listAll.invalidate();
      utils.sponsors.list.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      showToast(error.message, true);
    },
  });

  const updateMutation = trpc.sponsors.update.useMutation({
    onSuccess: () => {
      showToast("Sponsor updated successfully");
      utils.sponsors.listAll.invalidate();
      utils.sponsors.list.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      showToast(error.message, true);
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB", true);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file", true);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      uploadPhotoMutation.mutate({
        file: base64,
        filename: file.name,
      });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Sponsor name is required", true);
      return;
    }

    if (sponsor) {
      updateMutation.mutate({
        id: sponsor.id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isUploading;

  return (
    <Card className="p-6 bg-card border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sponsor Name *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter sponsor name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Logo Upload
          </label>
          <div className="space-y-3">
            {logoPreview && (
              <div className="relative w-full h-32 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    setFormData({ ...formData, logo: "" });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors">
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-muted-foreground/60">PNG, JPG, GIF up to 5MB</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Website URL
          </label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://example.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter sponsor description"
            disabled={isLoading}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tier
            </label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as "gold" | "silver" | "bronze" })}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Display Order
            </label>
            <Input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              placeholder="0"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active === 1}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked ? 1 : 0 })}
              disabled={isLoading}
              className="rounded border-border"
            />
            <span className="text-sm font-medium text-foreground">Active</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading"
        >
          {isLoading ? "Saving..." : sponsor ? "Update Sponsor" : "Add Sponsor"}
        </Button>
      </form>
    </Card>
  );
}
