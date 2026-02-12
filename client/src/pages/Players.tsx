/* Heritage Grain Design: Players page with elegant card grid */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap } from "lucide-react";

interface Player {
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  isCaptain?: boolean;
  isImpactPlayer?: boolean;
}

export default function Players() {
  // Sample player data - replace with actual data
  const players: Player[] = [
    {
      name: "Rajesh Kumar",
      role: "Captain, All-Rounder",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm medium",
      isCaptain: true,
      isImpactPlayer: true,
    },
    {
      name: "Amit Sharma",
      role: "Vice-Captain, Batsman",
      battingStyle: "Right-hand bat",
      bowlingStyle: "N/A",
      isImpactPlayer: true,
    },
    {
      name: "Vikram Patel",
      role: "Wicketkeeper",
      battingStyle: "Right-hand bat",
      bowlingStyle: "N/A",
    },
    {
      name: "Suresh Reddy",
      role: "Bowler",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm fast",
    },
    {
      name: "Anil Gupta",
      role: "All-Rounder",
      battingStyle: "Left-hand bat",
      bowlingStyle: "Left-arm spin",
    },
    {
      name: "Karthik Iyer",
      role: "Batsman",
      battingStyle: "Right-hand bat",
      bowlingStyle: "N/A",
    },
    {
      name: "Deepak Singh",
      role: "Bowler",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm fast",
    },
    {
      name: "Manoj Verma",
      role: "All-Rounder",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm medium",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            Our Squad
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Meet the talented players representing Blackstone CC in the Connecticut Cricket League. 
            Our diverse squad brings together skill, passion, and dedication.
          </p>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-accent transition-all group">
                {/* Player Photo Placeholder */}
                <div className="relative mb-4">
                  <div className="w-full aspect-square rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <div className="text-6xl text-muted-foreground/30 font-display">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {player.isCaptain && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg" title="Captain">
                        <Crown className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                    {player.isImpactPlayer && (
                      <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shadow-lg" title="Impact Player">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Player Info */}
                <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {player.name}
                </h3>
                
                <Badge variant="secondary" className="mb-4 font-heading">
                  {player.role}
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batting:</span>
                    <span className="text-foreground">{player.battingStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bowling:</span>
                    <span className="text-foreground">{player.bowlingStyle}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Player Note */}
          <div className="mt-12 p-8 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Want to Join Our Squad?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're always looking for talented cricketers to join Blackstone CC. 
              If you're passionate about cricket and want to compete in the CCL, get in touch!
            </p>
            <a href="/join-us" className="text-accent hover:text-accent/80 font-heading underline">
              Learn About Joining →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
