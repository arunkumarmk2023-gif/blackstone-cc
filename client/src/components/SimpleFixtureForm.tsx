import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Fixture } from "@shared/types";

interface SimpleFixtureFormProps {
  fixture?: Fixture;
  onSuccess: () => void;
}

export default function SimpleFixtureForm({ fixture, onSuccess }: SimpleFixtureFormProps) {
  const [opponent, setOpponent] = useState(fixture?.opponent || "");
  const [venue, setVenue] = useState(fixture?.venue || "");
  const [date, setDate] = useState(fixture?.date ? new Date(fixture.date).toISOString().split("T")[0] : "");
  const [time, setTime] = useState(fixture?.date ? new Date(fixture.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) : "");
  const [format, setFormat] = useState(fixture?.format || "Hard Tennis Ball");
  const [status, setStatus] = useState<"upcoming" | "live" | "completed" | "cancelled">(fixture?.status || "upcoming");

  const createFixture = trpc.fixtures.create.useMutation();
  const updateFixture = trpc.fixtures.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!opponent || !date || !time) {
      toast.error("Opponent, date, and time are required");
      return;
    }

    try {
      // Combine date and time, then convert to UTC
      const [hours, minutes] = time.split(":").map(Number);
      const estDate = new Date(date);
      estDate.setHours(hours, minutes, 0, 0);
      
      // Convert EST to UTC (EST is UTC-5, EDT is UTC-4)
      // For simplicity, we'll store the date as-is and handle timezone in display
      const payload = {
        opponent,
        venue,
        date: estDate,
        format,
        status: status as "upcoming" | "live" | "completed" | "cancelled",
        ourScore: "",
        theirScore: "",
        result: "",
        notes: "",
      };

      if (fixture?.id) {
        await updateFixture.mutateAsync({
          id: fixture.id,
          data: payload,
        });
        toast.success("Fixture updated");
      } else {
        await createFixture.mutateAsync(payload);
        toast.success("Fixture created");
        setOpponent("");
        setVenue("");
        setDate("");
        setTime("");
        setFormat("Hard Tennis Ball");
        setStatus("upcoming");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save fixture");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Opponent */}
        <div>
          <Label htmlFor="opponent" className="text-sm">Opponent *</Label>
          <Input
            id="opponent"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="Team name"
            required
          />
        </div>

        {/* Venue */}
        <div>
          <Label htmlFor="venue" className="text-sm">Venue *</Label>
          <Input
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue name"
            required
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-sm">Date (EST) *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time */}
        <div>
          <Label htmlFor="time" className="text-sm">Time (EST) *</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Format */}
        <div>
          <Label htmlFor="format" className="text-sm">Format *</Label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded text-sm bg-background"
            required
          >
            <option>Hard Tennis Ball</option>
            <option>T20</option>
            <option>One Day</option>
            <option>Test</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="text-sm">Status *</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "upcoming" | "live" | "completed" | "cancelled")}
            className="w-full px-3 py-2 border border-border rounded text-sm bg-background"
            required
          >
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <Button type="submit" disabled={createFixture.isPending || updateFixture.isPending} className="w-full">
        {fixture ? "Update Fixture" : "Add Fixture"}
      </Button>
    </form>
  );
}
