import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Fixture } from "@shared/types";

interface FixtureFormProps {
  fixture?: Fixture;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type FixtureStatus = "upcoming" | "live" | "completed" | "cancelled";

export default function FixtureForm({ fixture, isOpen, onClose, onSuccess }: FixtureFormProps) {
  const [formData, setFormData] = useState({
    opponent: fixture?.opponent || "",
    venue: fixture?.venue || "Connecticut Cricket League",
    date: fixture?.date ? new Date(fixture.date).toISOString().split("T")[0] : "",
    format: fixture?.format || "Hard Tennis Ball",
    status: (fixture?.status || "upcoming") as FixtureStatus,
    ourScore: fixture?.ourScore || "",
    ourWickets: fixture?.ourWickets || "",
    theirScore: fixture?.theirScore || "",
    theirWickets: fixture?.theirWickets || "",
    result: fixture?.result || "",
    notes: fixture?.notes || "",
  });

  const createFixture = trpc.fixtures.create.useMutation();
  const updateFixture = trpc.fixtures.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.opponent || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        opponent: formData.opponent,
        venue: formData.venue,
        date: new Date(formData.date),
        format: formData.format,
        status: formData.status,
        ourScore: formData.ourScore,
        ourWickets: formData.ourWickets,
        theirScore: formData.theirScore,
        theirWickets: formData.theirWickets,
        result: formData.result,
        notes: formData.notes,
      };

      if (fixture?.id) {
        await updateFixture.mutateAsync({
          id: fixture.id,
          data: payload,
        });
        toast.success("Fixture updated successfully");
      } else {
        await createFixture.mutateAsync(payload);
        toast.success("Fixture created successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to save fixture");
      console.error(error);
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as FixtureStatus });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{fixture ? "Edit Fixture" : "Add New Fixture"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="opponent">Opponent *</Label>
              <Input
                id="opponent"
                value={formData.opponent}
                onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                placeholder="Team name"
                required
              />
            </div>

            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Venue"
              />
            </div>

            <div>
              <Label htmlFor="date">Match Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="format">Format</Label>
              <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hard Tennis Ball">Hard Tennis Ball</SelectItem>
                  <SelectItem value="T20">T20</SelectItem>
                  <SelectItem value="One Day">One Day</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="result">Result</Label>
              <Input
                id="result"
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                placeholder="e.g., Win, Loss"
              />
            </div>

            <div>
              <Label htmlFor="ourScore">Our Score</Label>
              <Input
                id="ourScore"
                value={formData.ourScore}
                onChange={(e) => setFormData({ ...formData, ourScore: e.target.value })}
                placeholder="e.g., 150"
              />
            </div>

            <div>
              <Label htmlFor="ourWickets">Our Wickets</Label>
              <Input
                id="ourWickets"
                value={formData.ourWickets}
                onChange={(e) => setFormData({ ...formData, ourWickets: e.target.value })}
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <Label htmlFor="theirScore">Their Score</Label>
              <Input
                id="theirScore"
                value={formData.theirScore}
                onChange={(e) => setFormData({ ...formData, theirScore: e.target.value })}
                placeholder="e.g., 140"
              />
            </div>

            <div>
              <Label htmlFor="theirWickets">Their Wickets</Label>
              <Input
                id="theirWickets"
                value={formData.theirWickets}
                onChange={(e) => setFormData({ ...formData, theirWickets: e.target.value })}
                placeholder="e.g., 8"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional match notes..."
              className="w-full p-2 border border-border rounded-md"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createFixture.isPending || updateFixture.isPending}>
              {fixture ? "Update Fixture" : "Create Fixture"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
