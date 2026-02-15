import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("fixtures");

  const fixturesQuery = trpc.fixtures.list.useQuery();
  const playersQuery = trpc.players.list.useQuery();
  const newsQuery = trpc.news.list.useQuery();
  const newsletterQuery = trpc.newsletter.list.useQuery();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
              <p className="text-muted-foreground">You need admin privileges to access this page.</p>
            </div>
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
        {/* Header */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container">
            <h1 className="font-display font-bold text-4xl text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage fixtures, players, and news content
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
              </TabsList>

              {/* Fixtures Tab */}
              <TabsContent value="fixtures" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Fixtures</h2>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Fixture
                  </button>
                </div>

                {fixturesQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading fixtures...</span>
                  </div>
                ) : fixturesQuery.data && fixturesQuery.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Opponent</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Venue</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixturesQuery.data.map((fixture: any) => (
                          <tr key={fixture.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{new Date(fixture.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{fixture.opponent}</td>
                            <td className="py-3 px-4">{fixture.venue}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{fixture.status}</Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-secondary rounded transition-colors">
                                  <Edit className="w-4 h-4 text-accent" />
                                </button>
                                <button className="p-2 hover:bg-secondary rounded transition-colors">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No fixtures yet. Create one to get started!</p>
                  </Card>
                )}
              </TabsContent>

              {/* Players Tab */}
              <TabsContent value="players" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Players</h2>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Player
                  </button>
                </div>

                {playersQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading players...</span>
                  </div>
                ) : playersQuery.data && playersQuery.data.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playersQuery.data.map((player: any) => (
                      <Card key={player.id} className="p-4 border-border">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-foreground">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">{player.role}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-secondary rounded transition-colors">
                              <Edit className="w-4 h-4 text-accent" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Jersey: #{player.jerseyNumber || "-"}</p>
                          <p>Batting: {player.battingStyle || "-"}</p>
                          <p>Bowling: {player.bowlingStyle || "-"}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No players yet. Add one to get started!</p>
                  </Card>
                )}
              </TabsContent>

              {/* News Tab */}
              <TabsContent value="news" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">News</h2>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                    <Plus className="w-4 h-4" />
                    Add News
                  </button>
                </div>

                {newsQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading news...</span>
                  </div>
                ) : newsQuery.data && newsQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {newsQuery.data.map((item: any) => (
                      <Card key={item.id} className="p-4 border-border">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                            <div className="flex gap-2 items-center">
                              <Badge variant="outline" className="text-xs">{item.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Draft"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-secondary rounded transition-colors">
                              <Edit className="w-4 h-4 text-accent" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No news yet. Create one to get started!</p>
                  </Card>
                )}
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                    <Plus className="w-4 h-4" />
                    Send Notification
                  </button>
                </div>
                <Card className="p-6 bg-secondary/50 border-border">
                  <h3 className="font-heading font-semibold text-foreground mb-2">Notification Management</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Send important alerts to club members about match updates, announcements, and events.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-heading text-foreground mb-2">Title</label>
                      <input type="text" placeholder="Notification title" className="w-full px-3 py-2 rounded border border-border bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading text-foreground mb-2">Message</label>
                      <textarea placeholder="Notification message" rows={3} className="w-full px-3 py-2 rounded border border-border bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading text-foreground mb-2">Type</label>
                      <select className="w-full px-3 py-2 rounded border border-border bg-background text-foreground">
                        <option>info</option>
                        <option>success</option>
                        <option>warning</option>
                        <option>error</option>
                        <option>match_alert</option>
                        <option>announcement</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                      Send Notification
                    </button>
                  </div>
                </Card>
              </TabsContent>

              {/* Newsletter Tab */}
              <TabsContent value="newsletter" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
                </div>

                {newsletterQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading subscribers...</span>
                  </div>
                ) : newsletterQuery.data && newsletterQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    <Card className="p-4 bg-secondary/30">
                      <p className="text-sm text-muted-foreground">
                        Total Subscribers: <span className="font-bold text-foreground">{newsletterQuery.data.length}</span>
                      </p>
                    </Card>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-heading font-semibold">Email</th>
                            <th className="text-left py-3 px-4 font-heading font-semibold">Name</th>
                            <th className="text-left py-3 px-4 font-heading font-semibold">Subscribed</th>
                            <th className="text-left py-3 px-4 font-heading font-semibold">Date</th>
                            <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsletterQuery.data.map((subscriber: any) => (
                            <tr key={subscriber.id} className="border-b border-border hover:bg-card/50">
                              <td className="py-3 px-4">{subscriber.email}</td>
                              <td className="py-3 px-4">{subscriber.name || "-"}</td>
                              <td className="py-3 px-4">
                                <Badge variant={subscriber.subscribed ? "default" : "outline"}>
                                  {subscriber.subscribed ? "Active" : "Unsubscribed"}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm">{new Date(subscriber.subscribedAt).toLocaleDateString()}</td>
                              <td className="py-3 px-4">
                                <button className="p-2 hover:bg-secondary rounded transition-colors">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No newsletter subscribers yet.</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Info Box */}
            <Card className="mt-8 p-6 bg-secondary/50 border-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">Admin Features Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                Full CRUD interfaces for adding, editing, and deleting fixtures, players, and news are being built. 
                For now, you can manage content through the database directly or contact your developer.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
