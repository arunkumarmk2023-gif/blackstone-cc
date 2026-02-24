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
import SimplePlayerForm from "@/components/SimplePlayerForm";
import SimpleNewsForm from "@/components/SimpleNewsForm";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("fixtures");
  const [showFixtureForm, setShowFixtureForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);

  const fixturesQuery = trpc.fixtures.list.useQuery();
  const playersQuery = trpc.players.list.useQuery();
  const newsQuery = trpc.news.list.useQuery();
  const newsletterQuery = trpc.newsletter.list.useQuery();
  const contactQuery = trpc.contact.list.useQuery();
  const galleryQuery = trpc.gallery.list.useQuery();
  const joinRequestsQuery = trpc.joinClub.list.useQuery();
  const deleteFixture = trpc.fixtures.delete.useMutation();
  const deletePlayer = trpc.players.delete.useMutation();
  const deleteNews = trpc.news.delete.useMutation();
  const deleteJoinRequest = trpc.joinClub.delete.useMutation();
  const deleteGallery = trpc.gallery.delete.useMutation();
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
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="joinRequests">Join Requests</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
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

                {showFixtureForm && <SimpleFixtureForm onSuccess={() => { setShowFixtureForm(false); fixturesQuery.refetch(); }} />}

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
                          <th className="text-left py-3 px-4 font-heading font-semibold">Team 1</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Team 2</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Venue</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixturesQuery.data.map((fixture: any) => (
                          <tr key={fixture.id} className="border-b border-border hover:bg-card/50">
                            <td className="py-3 px-4">{new Date(fixture.fixtureDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{fixture.team1}</td>
                            <td className="py-3 px-4">{fixture.team2}</td>
                            <td className="py-3 px-4">{fixture.venue}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => deleteFixture.mutate({ id: fixture.id })}
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
                    <p className="text-muted-foreground">No fixtures yet.</p>
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

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">Notification management coming soon.</p>
                </Card>
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

                {joinRequestsQuery.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Loading join requests...</span>
                  </div>
                ) : joinRequestsQuery.data && joinRequestsQuery.data.length > 0 ? (
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
                        {joinRequestsQuery.data.map((request: any) => (
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
                                onClick={() => deleteJoinRequest.mutate({ id: request.id }, { onSuccess: () => joinRequestsQuery.refetch() })}
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
