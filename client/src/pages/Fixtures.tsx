import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Fixtures() {
  const { data: fixtures, isLoading, error } = trpc.fixtures.list.useQuery();

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return <Badge className="bg-green-700 text-white hover:bg-green-800">Completed</Badge>;
    } else if (status === "cancelled") {
      return <Badge className="bg-red-700 text-white hover:bg-red-800">Cancelled</Badge>;
    } else if (status === "live") {
      return <Badge className="bg-blue-700 text-white hover:bg-blue-800 animate-pulse">Live</Badge>;
    } else {
      return <Badge variant="outline" className="border-accent text-accent">Upcoming</Badge>;
    }
  };

  const getResultText = (fixture: any) => {
    if (fixture.status === "completed" && fixture.ourScore && fixture.theirScore) {
      return `${fixture.ourScore} vs ${fixture.theirScore}`;
    }
    return "-";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Loading fixtures...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="text-red-500">Error loading fixtures: {error.message}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-card border-b border-border">
          <div className="container">
            <h1 className="font-display font-bold text-5xl text-foreground mb-4">
              Fixtures & Results
            </h1>
            <p className="text-muted-foreground text-lg">
              View our upcoming matches and past results in the Connecticut Cricket League
            </p>
          </div>
        </section>

        {/* Fixtures Table */}
        <section className="py-16" id="fixtures">
          <div className="container">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Date</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Opponent</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Venue</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Format</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Score</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fixtures && fixtures.length > 0 ? (
                    fixtures.map((fixture: any) => (
                      <tr key={fixture.id} className="border-b border-border hover:bg-card/50 transition-colors">
                        <td className="py-4 px-4 text-muted-foreground">
                          {new Date(fixture.date).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </td>
                        <td className="py-4 px-4 font-heading text-foreground">{fixture.opponent}</td>
                        <td className="py-4 px-4 text-muted-foreground">{fixture.venue}</td>
                        <td className="py-4 px-4 text-muted-foreground">{fixture.format}</td>
                        <td className="py-4 px-4 text-muted-foreground">{getResultText(fixture)}</td>
                        <td className="py-4 px-4">{getStatusBadge(fixture.status)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 px-4 text-center text-muted-foreground">
                        No fixtures available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CricClubs Embed Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display font-bold text-3xl text-foreground mb-8">
              Live Scores & Detailed Stats on CricClubs
            </h2>
            <div className="bg-background rounded-lg p-8 border border-border">
              <p className="text-muted-foreground mb-4">
                For live scores, detailed statistics, and comprehensive match information, visit our CricClubs page:
              </p>
              <a 
                href="https://www.criclubs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
              >
                View on CricClubs →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
