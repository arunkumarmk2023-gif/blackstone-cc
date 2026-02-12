/* Heritage Grain Design: Players page with dynamic data from database */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Players() {
  const { data: players, isLoading, error } = trpc.players.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Loading players...</span>
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
            <div className="text-red-500">Error loading players: {error.message}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
      <section className="py-16" id="players">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players && players.length > 0 ? (
              players.map((player: any) => (
                <Card key={player.id} className="p-6 bg-card border-border hover:border-accent transition-all group">
                  {/* Player Photo */}
                  <div className="relative mb-4">
                    <div className="w-full aspect-square rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                      {player.photoUrl ? (
                        <img 
                          src={player.photoUrl} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl text-muted-foreground/30 font-display">
                          {player.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {player.isCaptain === 1 && (
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg" title="Captain">
                          <Crown className="w-4 h-4 text-accent-foreground" />
                        </div>
                      )}
                      {player.isImpactPlayer === 1 && (
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
                  
                  {player.jerseyNumber && (
                    <p className="text-sm text-muted-foreground mb-2">Jersey #{player.jerseyNumber}</p>
                  )}
                  
                  <Badge variant="secondary" className="mb-4 font-heading">
                    {player.role}
                  </Badge>

                  <div className="space-y-2 text-sm mb-4">
                    {player.battingStyle && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batting:</span>
                        <span className="text-foreground">{player.battingStyle}</span>
                      </div>
                    )}
                    {player.bowlingStyle && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bowling:</span>
                        <span className="text-foreground">{player.bowlingStyle}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  {(player.runsScored > 0 || player.wicketsTaken > 0 || player.matchesPlayed > 0) && (
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <p className="font-bold text-accent">{player.runsScored}</p>
                          <p className="text-muted-foreground">Runs</p>
                        </div>
                        <div>
                          <p className="font-bold text-accent">{player.wicketsTaken}</p>
                          <p className="text-muted-foreground">Wickets</p>
                        </div>
                        <div>
                          <p className="font-bold text-accent">{player.matchesPlayed}</p>
                          <p className="text-muted-foreground">Matches</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {player.bio && (
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      {player.bio}
                    </p>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No players available yet</p>
              </div>
            )}
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
