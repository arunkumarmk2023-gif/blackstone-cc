/* Heritage Grain Design: Fixtures page with elegant table and CricClubs embed */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Fixtures() {
  // Sample fixture data - replace with actual data source
  const fixtures = [
    {
      date: "2025-03-15",
      opponent: "Hartford Hawks",
      venue: "Home",
      format: "T20",
      result: "Won",
      score: "165/7 vs 142/9",
    },
    {
      date: "2025-03-22",
      opponent: "New Haven Knights",
      venue: "Away",
      format: "T20",
      result: "Lost",
      score: "138/8 vs 141/5",
    },
    {
      date: "2025-03-29",
      opponent: "Stamford Strikers",
      venue: "Home",
      format: "T20",
      result: "Upcoming",
      score: "-",
    },
    {
      date: "2025-04-05",
      opponent: "Bridgeport Blasters",
      venue: "Away",
      format: "T20",
      result: "Upcoming",
      score: "-",
    },
  ];

  const getResultBadge = (result: string) => {
    if (result === "Won") {
      return <Badge className="bg-green-700 text-white hover:bg-green-800">Won</Badge>;
    } else if (result === "Lost") {
      return <Badge className="bg-red-700 text-white hover:bg-red-800">Lost</Badge>;
    } else {
      return <Badge variant="outline" className="border-accent text-accent">Upcoming</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            Fixtures & Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Follow Blackstone CC's journey through the CCL 2025 season. View match schedules, 
            results, and detailed statistics.
          </p>
        </div>
      </section>

      {/* Fixtures Table */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Season Fixtures</h2>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Date</th>
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Opponent</th>
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Venue</th>
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Format</th>
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Result</th>
                  <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Score</th>
                </tr>
              </thead>
              <tbody>
                {fixtures.map((fixture, index) => (
                  <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 text-muted-foreground">{fixture.date}</td>
                    <td className="py-4 px-4 text-foreground font-medium">{fixture.opponent}</td>
                    <td className="py-4 px-4 text-muted-foreground">{fixture.venue}</td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="font-heading">{fixture.format}</Badge>
                    </td>
                    <td className="py-4 px-4">{getResultBadge(fixture.result)}</td>
                    <td className="py-4 px-4 text-muted-foreground font-mono text-sm">{fixture.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {fixtures.map((fixture, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{fixture.date}</p>
                    <h3 className="font-heading font-semibold text-lg text-foreground">{fixture.opponent}</h3>
                  </div>
                  {getResultBadge(fixture.result)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="text-foreground">{fixture.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <Badge variant="secondary" className="font-heading">{fixture.format}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="text-foreground font-mono">{fixture.score}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CricClubs Integration */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Live Scores & Detailed Stats
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            View comprehensive match statistics, player performances, and live scoring on CricClubs.
          </p>
          
          <Card className="overflow-hidden border-border">
            <iframe
              src="https://cricclubs.com/ConnecticutCricketLeague1/teams/hPu1xeCvHMLGRWu-iwrX_w?seriesId=duQDJcq0RrsbeBo2nmyLkQ&teamName=BlackStone+CC&seriesName=CCL+Hard+Tennis+Ball+-+TCL+2025"
              className="w-full h-[600px] border-0"
              title="CricClubs Live Scores"
            />
          </Card>
          
          <div className="mt-6 text-center">
            <a
              href="https://cricclubs.com/ConnecticutCricketLeague1/teams/hPu1xeCvHMLGRWu-iwrX_w?seriesId=duQDJcq0RrsbeBo2nmyLkQ&teamName=BlackStone+CC&seriesName=CCL+Hard+Tennis+Ball+-+TCL+2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-heading underline"
            >
              View Full Stats on CricClubs →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
