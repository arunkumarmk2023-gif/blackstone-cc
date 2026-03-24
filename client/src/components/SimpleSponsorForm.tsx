import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sponsor } from "@shared/types";

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

  const showToast = (message: string, error = false) => {
    console.log(error ? `Error: ${message}` : message);
  };
  const utils = trpc.useUtils();

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

  const isLoading = createMutation.isPending || updateMutation.isPending;

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
            Logo URL
          </label>
          <Input
            type="url"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            placeholder="https://example.com/logo.png"
            disabled={isLoading}
          />
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
