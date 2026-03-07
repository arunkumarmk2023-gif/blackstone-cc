import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

export default function FixturesResults() {
  const [activeTab, setActiveTab] = useState<"fixtures" | "results">("fixtures");
  const [sortBy, setSortBy] = useState<"date" | "league">("date");

  const fixturesQuery = trpc.fixtures.list.useQuery();
  const resultsQuery = trpc.results.list.useQuery();

  // Filter upcoming fixtures (date >= today)
  const upcomingFixtures = useMemo(() => {
    if (!fixturesQuery.data) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return fixturesQuery.data
      .filter((f: any) => new Date(f.date) >= today && f.status !== "cancelled")
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [fixturesQuery.data]);

  // Sort results
  const sortedResults = useMemo(() => {
    if (!resultsQuery.data) return [];
    const sorted = [...resultsQuery.data].sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (sortBy === "league") {
      return sorted.sort((a: any, b: any) => a.league.localeCompare(b.league));
    }
    return sorted;
  }, [resultsQuery.data, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Fixtures & Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with our upcoming matches and past results
          </p>
        </div>

        {/* Tab Switcher */}
        <div id="fixtures-results" className="mb-8 flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("fixtures")}
            className={`px-6 py-3 font-heading font-semibold transition-colors ${
              activeTab === "fixtures"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Fixtures
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`px-6 py-3 font-heading font-semibold transition-colors ${
              activeTab === "results"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Results
          </button>
        </div>

        {/* Fixtures Tab */}
        {activeTab === "fixtures" && (
          <div className="space-y-6">
            {fixturesQuery.isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12">
                <Loader2 className="animate-spin" />
                <span>Loading fixtures...</span>
              </div>
            ) : upcomingFixtures.length > 0 ? (
              <div className="space-y-4">
                {upcomingFixtures.map((fixture: any) => (
                  <Card key={fixture.id} className="p-6 bg-card border border-border hover:border-accent/50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                        <p className="font-heading font-semibold">
                          {new Date(fixture.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(fixture.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Match</p>
                        <p className="font-heading font-semibold">Blackstone CC</p>
                        <p className="text-sm">vs {fixture.opponent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Venue</p>
                        <p className="font-heading font-semibold">{fixture.venue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Format</p>
                        <Badge variant="outline">{fixture.format}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <Badge className={`${
                          fixture.status === "upcoming"
                            ? "bg-blue-600 text-white"
                            : fixture.status === "live"
                            ? "bg-red-600 text-white"
                            : fixture.status === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}>
                          {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center bg-card border border-border">
                <p className="text-muted-foreground">No upcoming fixtures scheduled.</p>
              </Card>
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading font-bold">Match Results</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("date")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortBy === "date"
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border hover:bg-card/80"
                  }`}
                >
                  Sort by Date
                </button>
                <button
                  onClick={() => setSortBy("league")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortBy === "league"
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border hover:bg-card/80"
                  }`}
                >
                  Sort by League
                </button>
              </div>
            </div>

            {resultsQuery.isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12">
                <Loader2 className="animate-spin" />
                <span>Loading results...</span>
              </div>
            ) : sortedResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-heading font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Opponent</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Venue</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">League</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Score</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Result</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Scorecard</th>
                      <th className="text-left py-3 px-4 font-heading font-semibold">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.map((result: any) => (
                      <tr key={result.id} className="border-b border-border hover:bg-card/50 transition-colors">
                        <td className="py-3 px-4">
                          {new Date(result.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-4">{result.opponentName}</td>
                        <td className="py-3 px-4">{result.venue}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{result.league}</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">{result.score}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={result.result === "win" ? "default" : "outline"}
                            className={
                              result.result === "win"
                                ? "bg-green-600/20 text-green-400 border-green-600/30"
                                : result.result === "loss"
                                ? "bg-red-600/20 text-red-400 border-red-600/30"
                                : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                            }
                          >
                            {result.result.charAt(0).toUpperCase() + result.result.slice(1).replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {result.scorecardUrl ? (
                            <a
                              href={result.scorecardUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                            >
                              View
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <ShareButtons
                            title={`${result.opponentName} vs Blackstone CC - ${result.result.toUpperCase()}`}
                            text={`Check out the match result: Blackstone CC vs ${result.opponentName}. Score: ${result.score}. Result: ${result.result.toUpperCase()}. #BlackstoneCC #Cricket`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card className="p-12 text-center bg-card border border-border">
                <p className="text-muted-foreground">No results available yet.</p>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
