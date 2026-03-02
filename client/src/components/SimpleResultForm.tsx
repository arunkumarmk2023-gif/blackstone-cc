import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Result } from "@shared/types";

interface SimpleResultFormProps {
  result?: Result;
  onSuccess: () => void;
}

export default function SimpleResultForm({ result, onSuccess }: SimpleResultFormProps) {
  const [date, setDate] = useState(result?.date ? new Date(result.date).toISOString().split("T")[0] : "");
  const [opponentName, setOpponentName] = useState(result?.opponentName || "");
  const [venue, setVenue] = useState(result?.venue || "");
  const [league, setLeague] = useState(result?.league || "");
  const [score, setScore] = useState(result?.score || "");
  const [resultType, setResultType] = useState<"win" | "loss" | "tie" | "no_result">(result?.result || "win");
  const [scorecardUrl, setScorecardUrl] = useState(result?.scorecardUrl || "");

  const createResult = trpc.results.create.useMutation();
  const updateResult = trpc.results.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !opponentName || !venue || !league || !score) {
      toast.error("Date, opponent, venue, league, and score are required");
      return;
    }

    try {
      const payload = {
        date: new Date(date),
        opponentName,
        venue,
        league,
        score,
        result: resultType as "win" | "loss" | "tie" | "no_result",
        scorecardUrl: scorecardUrl || undefined,
      };

      if (result?.id) {
        await updateResult.mutateAsync({
          id: result.id,
          data: payload,
        });
        toast.success("Result updated");
      } else {
        await createResult.mutateAsync(payload);
        toast.success("Result created");
        setDate("");
        setOpponentName("");
        setVenue("");
        setLeague("");
        setScore("");
        setResultType("win");
        setScorecardUrl("");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save result");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-3">
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
          <Label htmlFor="opponentName" className="text-sm">Opponent *</Label>
          <Input
            id="opponentName"
            value={opponentName}
            onChange={(e) => setOpponentName(e.target.value)}
            placeholder="Team name"
            required
          />
        </div>

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

        <div>
          <Label htmlFor="league" className="text-sm">League *</Label>
          <Input
            id="league"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            placeholder="League name"
            required
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="score" className="text-sm">Score *</Label>
          <Input
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="e.g., Blackstone CC 145/6 (20) vs Opponent 132/9 (20)"
            required
          />
        </div>

        <div>
          <Label htmlFor="result" className="text-sm">Result *</Label>
          <select
            id="result"
            value={resultType}
            onChange={(e) => setResultType(e.target.value as "win" | "loss" | "tie" | "no_result")}
            className="w-full px-2 py-1 border border-border rounded text-sm"
          >
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="tie">Tie</option>
            <option value="no_result">No Result</option>
          </select>
        </div>

        <div>
          <Label htmlFor="scorecardUrl" className="text-sm">Scorecard URL</Label>
          <Input
            id="scorecardUrl"
            type="url"
            value={scorecardUrl}
            onChange={(e) => setScorecardUrl(e.target.value)}
            placeholder="https://cricclubs.com/..."
          />
        </div>
      </div>

      <Button type="submit" disabled={createResult.isPending || updateResult.isPending} className="w-full">
        {result ? "Update Result" : "Add Result"}
      </Button>
    </form>
  );
}
