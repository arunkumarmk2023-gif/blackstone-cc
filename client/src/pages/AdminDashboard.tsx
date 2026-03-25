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
import SimpleFixtureForm from "@/components/SimpleFixtureForm";
import SimpleResultForm from "@/components/SimpleResultForm";
import SimplePlayerForm from "@/components/SimplePlayerForm";
import SimpleNewsForm from "@/components/SimpleNewsForm";
import SimpleSponsorForm from "@/components/SimpleSponsorForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("fixtures");
  const [showFixtureForm, setShowFixtureForm] = useState(false);
  const [editingFixture, setEditingFixture] = useState<any>(null);
  const [showResultForm, setShowResultForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<any>(null);

  const fixturesQuery = trpc.fixtures.list.useQuery();
  const resultsQuery = trpc.results.list.useQuery();
  const playersQuery = trpc.players.list.useQuery();
  const newsQuery = trpc.news.list.useQuery();
  const newsletterQuery = trpc.newsletter.list.useQuery();
  const contactQuery = trpc.contact.list.useQuery();
  const galleryQuery = trpc.gallery.list.useQuery();
  const joinersQuery = trpc.joiners.list.useQuery();
  const sponsorsQuery = trpc.sponsors.listAll.useQuery();
  const utils = trpc.useUtils();
  const deleteFixture = trpc.fixtures.delete.useMutation({
    onSuccess: () => {
      utils.fixtures.list.invalidate();
      toast.success("Fixture deleted");
    },
    onError: () => {
      toast.error("Failed to delete fixture");
    },
  });
  const deletePlayer = trpc.players.delete.useMutation({
    onSuccess: () => {
      utils.players.list.invalidate();
      toast.success("Player deleted");
    },
    onError: () => {
      toast.error("Failed to delete player");
    },
  });
  const deleteNews = trpc.news.delete.useMutation({
    onSuccess: () => {
      utils.news.list.invalidate();
      toast.success("News deleted");
    },
    onError: () => {
      toast.error("Failed to delete news");
    },
  });
  const deleteJoiner = trpc.joiners.delete.useMutation({
    onSuccess: () => {
      utils.joiners.list.invalidate();
      toast.success("Joiner deleted");
    },
    onError: () => {
      toast.error("Failed to delete joiner");
    },
  });
  const deleteSponsorMutation = trpc.sponsors.delete.useMutation({
    onSuccess: () => {
      utils.sponsors.listAll.invalidate();
      utils.sponsors.list.invalidate();
      toast.success("Sponsor deleted");
    },
    onError: () => {
      toast.error("Failed to delete sponsor");
    },
  });
  const deleteGallery = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      utils.gallery.list.invalidate();
      toast.success("Gallery item deleted");
    },
    onError: () => {
      toast.error("Failed to delete gallery item");
    },
  });
  const deleteResult = trpc.results.delete.useMutation({
    onSuccess: () => {
      utils.results.list.invalidate();
      toast.success("Result deleted");
    },
    onError: () => {
      toast.error("Failed to delete result");
    },
  });
  const uploadGallery = trpc.gallery.upload.useMutation();

  // Gallery upload form state
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryCategory, setGalleryCategory] = useState<"Match" | "Training" | "Event" | "Team Photo" | "Other">("Match");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
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
              Manage fixtures, players, news, and gallery content
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-10">
                <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="joinRequests">Join Requests</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              </TabsList>

              {/* Fixtures Tab */}
              <TabsContent value="fixtures" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Fixtures</h2>
                  <button
                    onClick={() => setShowFixtureForm(!showFixtureForm)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Fixture
                  </button>
                </div>

                {showFixtureForm && (
                  <SimpleFixtureForm
                    fixture={editingFixture}
                    onSuccess={() => {
                      setShowFixtureForm(false);
                      setEditingFixture(null);
                      fixturesQuery.refetch();
                    }}
                  />
                )}

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
                          <th className="text-left py-3 px-4 font-heading font-semibold">Opponent</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Date/Time (EST)</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Venue</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Format</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixturesQuery.data.map((fixture: any) => {
                          const fixtureDate = new Date(fixture.date);
                          const estTime = fixtureDate.toLocaleString("en-US", {
                            timeZone: "America/New_York",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          });
                          return (
                            <tr key={fixture.id} className="border-b border-border hover:bg-card/50">
                              <td className="py-3 px-4">{fixture.opponent}</td>
                              <td className="py-3 px-4">{estTime}</td>
                              <td className="py-3 px-4">{fixture.venue}</td>
                              <td className="py-3 px-4">{fixture.format}</td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant={fixture.status === "upcoming" ? "outline" : fixture.status === "live" ? "default" : "secondary"}
                                  className={fixture.status === "live" ? "bg-red-600/20 text-red-400 border-red-600/30" : ""}
                                >
                                  {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingFixture(fixture);
                                    setShowFixtureForm(true);
                                  }}
                                  className="text-accent hover:text-accent/90"
                                  title="Edit fixture"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteFixture.mutate({ id: fixture.id })}
                                  className="text-destructive hover:text-destructive/90"
                                  title="Delete fixture"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No fixtures yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Match Results</h2>
                  <button
                    onClick={() => setShowResultForm(!showResultForm)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Result
                  </button>
                </div>

                {showResultForm && <SimpleResultForm onSuccess={() => { setShowResultForm(false); resultsQuery.refetch(); }} />}

                {resultsQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading results...</span>
                  </div>
                ) : resultsQuery.data && resultsQuery.data.length > 0 ? (
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
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultsQuery.data.map((result: any) => (
                          <tr key={result.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{new Date(result.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{result.opponentName}</td>
                            <td className="py-3 px-4">{result.venue}</td>
                            <td className="py-3 px-4">{result.league}</td>
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
                              <button
                                onClick={() => deleteResult.mutate({ id: result.id })}
                                className="text-destructive hover:text-destructive/90"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No results yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Players Tab */}
              <TabsContent value="players" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Players</h2>
                  <button
                    onClick={() => setShowPlayerForm(!showPlayerForm)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Player
                  </button>
                </div>

                {showPlayerForm && <SimplePlayerForm onSuccess={() => { setShowPlayerForm(false); playersQuery.refetch(); }} />}

                {playersQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading players...</span>
                  </div>
                ) : playersQuery.data && playersQuery.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Role</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Jersey Number</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playersQuery.data.map((player: any) => (
                          <tr key={player.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{player.name}</td>
                            <td className="py-3 px-4">{player.role}</td>
                            <td className="py-3 px-4">{player.jerseyNumber}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => deletePlayer.mutate({ id: player.id })}
                                className="text-destructive hover:text-destructive/90"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No players yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* News Tab */}
              <TabsContent value="news" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">News</h2>
                  <button
                    onClick={() => setShowNewsForm(!showNewsForm)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add News
                  </button>
                </div>

                {showNewsForm && <SimpleNewsForm onSuccess={() => { setShowNewsForm(false); newsQuery.refetch(); }} />}

                {newsQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading news...</span>
                  </div>
                ) : newsQuery.data && newsQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {newsQuery.data.map((article: any) => (
                      <Card key={article.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-heading font-semibold text-foreground">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{article.content.substring(0, 100)}...</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(article.publishedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteNews.mutate({ id: article.id })}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No news articles yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Newsletter Tab */}
              <TabsContent value="newsletter" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
                {newsletterQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading subscribers...</span>
                  </div>
                ) : newsletterQuery.data && newsletterQuery.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsletterQuery.data.map((subscriber: any) => (
                          <tr key={subscriber.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{subscriber.email}</td>
                            <td className="py-3 px-4">{subscriber.name}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">
                                {subscriber.verified ? "Verified" : "Pending"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No newsletter subscribers yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Contact Submissions Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Contact Submissions</h2>
                </div>

                {contactQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading submissions...</span>
                  </div>
                ) : contactQuery.data && contactQuery.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Subject</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactQuery.data.map((submission: any) => (
                          <tr key={submission.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{new Date(submission.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{submission.name}</td>
                            <td className="py-3 px-4">{submission.email}</td>
                            <td className="py-3 px-4">{submission.subject}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{submission.status}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No contact submissions yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Join Requests Tab */}
              <TabsContent value="joinRequests" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Join Requests</h2>
                </div>

                {joinersQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading join applications...</span>
                  </div>
                ) : joinersQuery.data && joinersQuery.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Role</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Experience</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {joinersQuery.data.map((request: any) => (
                          <tr key={request.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{request.name}</td>
                            <td className="py-3 px-4">{request.email}</td>
                            <td className="py-3 px-4 capitalize">{request.role}</td>
                            <td className="py-3 px-4 capitalize">{request.experience}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{request.status}</Badge>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => deleteJoiner.mutate({ id: request.id }, { onSuccess: () => joinersQuery.refetch() })}
                                className="text-destructive hover:text-destructive/90"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No join requests yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
                  <button
                    onClick={() => setShowGalleryUpload(!showGalleryUpload)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Upload Image
                  </button>
                </div>

                {showGalleryUpload && (
                  <Card className="p-6 bg-card border border-border">
                    <h3 className="font-heading font-semibold mb-4">Upload Gallery Image</h3>
                    <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      if (!galleryFile) { toast.error("Please select an image file"); return; }
                      setGalleryUploading(true);
                      try {
                        const reader = new FileReader();
                        reader.onload = async () => {
                          try {
                            const base64 = (reader.result as string).split(",")[1];
                            await uploadGallery.mutateAsync({
                              title: galleryTitle,
                              description: galleryDescription || undefined,
                              category: galleryCategory,
                              fileData: base64,
                              fileName: galleryFile.name,
                              mimeType: galleryFile.type,
                            });
                            toast.success("Image uploaded successfully!");
                            setGalleryTitle("");
                            setGalleryDescription("");
                            setGalleryCategory("Match");
                            setGalleryFile(null);
                            setShowGalleryUpload(false);
                            galleryQuery.refetch();
                          } catch (err) {
                            toast.error("Failed to upload image");
                          } finally {
                            setGalleryUploading(false);
                          }
                        };
                        reader.onerror = () => { toast.error("Failed to read file"); setGalleryUploading(false); };
                        reader.readAsDataURL(galleryFile);
                      } catch {
                        toast.error("Failed to upload image");
                        setGalleryUploading(false);
                      }
                    }}>
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input type="text" className="w-full px-3 py-2 border border-border rounded-md" required value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea className="w-full px-3 py-2 border border-border rounded-md" value={galleryDescription} onChange={(e) => setGalleryDescription(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md" value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value as any)}>
                          <option value="Match">Match</option>
                          <option value="Training">Training</option>
                          <option value="Event">Event</option>
                          <option value="Team Photo">Team Photo</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image File</label>
                        <input type="file" accept="image/*" className="w-full" required onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} />
                      </div>
                      <button type="submit" disabled={galleryUploading} className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md disabled:opacity-50">
                        {galleryUploading ? "Uploading..." : "Upload"}
                      </button>
                    </form>
                  </Card>
                )}

                {galleryQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading gallery...</span>
                  </div>
                ) : galleryQuery.data && galleryQuery.data.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryQuery.data.map((image: any) => (
                      <Card key={image.id} className="overflow-hidden">
                        <img src={image.imageUrl} alt={image.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-heading font-semibold mb-2">{image.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                          <Badge variant="outline" className="mb-3">{image.category}</Badge>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (confirm("Delete this image?")) {
                                  deleteGallery.mutate({ id: image.id }, { onSuccess: () => { galleryQuery.refetch(); toast.success("Image deleted"); } });
                                }
                              }}
                              className="flex-1 px-3 py-1 text-sm bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded"
                            >
                              <Trash2 className="w-4 h-4 inline mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No gallery images yet. Upload your first image!</p>
                  </Card>
                )}
              </TabsContent>

              {/* Joiners Tab */}
              <TabsContent value="joiners" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Join Applications</h2>
                  <p className="text-muted-foreground mb-6">Manage membership applications from players interested in joining Blackstone CC.</p>
                </div>

                {joinersQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading applications...</span>
                  </div>
                ) : joinersQuery.data && joinersQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {joinersQuery.data.map((joiner: any) => (
                      <Card key={joiner.id} className="p-6 bg-card border-border">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-heading font-semibold text-foreground text-lg">{joiner.name}</h3>
                            <p className="text-sm text-muted-foreground">{joiner.email}</p>
                            {joiner.phone && <p className="text-sm text-muted-foreground">{joiner.phone}</p>}
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {joiner.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Playing Role</p>
                            <p className="font-medium text-foreground capitalize">{joiner.role}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Experience Level</p>
                            <p className="font-medium text-foreground capitalize">{joiner.experience}</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">Message</p>
                          <p className="text-sm text-foreground bg-background/50 p-3 rounded">{joiner.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Applied on {new Date(joiner.createdAt).toLocaleDateString()}</p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No join applications yet.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Sponsors Tab */}
              <TabsContent value="sponsors" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Sponsors</h2>
                  <p className="text-muted-foreground mb-6">Manage club sponsors and partnerships.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <SimpleSponsorForm />
                  </div>
                  <div className="lg:col-span-2">
                    {sponsorsQuery.isLoading ? (
                      <div className="flex items-center justify-center gap-2 py-12">
                        <Loader2 className="animate-spin" />
                        <span>Loading sponsors...</span>
                      </div>
                    ) : sponsorsQuery.data && sponsorsQuery.data.length > 0 ? (
                      <div className="space-y-4">
                        {sponsorsQuery.data.map((sponsor: any) => (
                          <Card key={sponsor.id} className="p-6 bg-card border-border">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h3 className="font-heading font-semibold text-foreground text-lg">{sponsor.name}</h3>
                                <Badge className="mt-2" variant="outline">
                                  {sponsor.tier?.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingSponsor(sponsor);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    deleteSponsorMutation.mutate({ id: sponsor.id });
                                  }}
                                  disabled={deleteSponsorMutation.isPending}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                            {sponsor.description && (
                              <p className="text-sm text-muted-foreground mb-3">{sponsor.description}</p>
                            )}
                            {sponsor.website && (
                              <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                                {sponsor.website}
                              </a>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No sponsors yet. Add one using the form.</p>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Info Box */}
            <Card className="mt-8 p-6 bg-secondary/50 border-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">Admin Features</h3>
              <p className="text-muted-foreground text-sm">
                File storage is now integrated with the gallery. Upload images directly from the Gallery tab.
                Images are stored securely in Manus S3 storage and displayed in your gallery.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
