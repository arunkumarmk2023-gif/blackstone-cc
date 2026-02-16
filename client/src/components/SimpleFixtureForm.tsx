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
  const [venue, setVenue] = useState(fixture?.venue || "Connecticut Cricket League");
  const [date, setDate] = useState(fixture?.date ? new Date(fixture.date).toISOString().split("T")[0] : "");
  const [format, setFormat] = useState(fixture?.format || "Hard Tennis Ball");
  const [status, setStatus] = useState<"upcoming" | "live" | "completed" | "cancelled">(fixture?.status || "upcoming");
  const [ourScore, setOurScore] = useState(fixture?.ourScore || "");
  const [theirScore, setTheirScore] = useState(fixture?.theirScore || "");
  const [result, setResult] = useState(fixture?.result || "");

  const createFixture = trpc.fixtures.create.useMutation();
  const updateFixture = trpc.fixtures.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!opponent || !date) {
      toast.error("Opponent and date are required");
      return;
    }

    try {
      const payload = {
        opponent,
        venue,
        date: new Date(date),
        format,
        status: status as "upcoming" | "live" | "completed" | "cancelled",
        ourScore,
        theirScore,
        result,
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
        setVenue("Connecticut Cricket League");
        setDate("");
        setFormat("Hard Tennis Ball");
        setStatus("upcoming");
        setOurScore("");
        setTheirScore("");
        setResult("");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save fixture");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-3">
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

        <div>
          <Label htmlFor="date" className="text-sm">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="venue" className="text-sm">Venue</Label>
          <Input
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="format" className="text-sm">Format</Label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-2 py-1 border border-border rounded text-sm"
          >
            <option>Hard Tennis Ball</option>
            <option>T20</option>
            <option>One Day</option>
            <option>Test</option>
          </select>
        </div>

        <div>
          <Label htmlFor="status" className="text-sm">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "upcoming" | "live" | "completed" | "cancelled")}
            className="w-full px-2 py-1 border border-border rounded text-sm"
          >
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <Label htmlFor="result" className="text-sm">Result</Label>
          <Input
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Win/Loss"
          />
        </div>

        <div>
          <Label htmlFor="ourScore" className="text-sm">Our Score</Label>
          <Input
            id="ourScore"
            value={ourScore}
            onChange={(e) => setOurScore(e.target.value)}
            placeholder="150"
          />
        </div>

        <div>
          <Label htmlFor="theirScore" className="text-sm">Their Score</Label>
          <Input
            id="theirScore"
            value={theirScore}
            onChange={(e) => setTheirScore(e.target.value)}
            placeholder="140"
          />
        </div>
      </div>

      <Button type="submit" disabled={createFixture.isPending || updateFixture.isPending} className="w-full">
        {fixture ? "Update Fixture" : "Add Fixture"}
      </Button>
    </form>
  );
}
