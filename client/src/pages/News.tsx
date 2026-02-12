/* Heritage Grain Design: News page with dynamic data from database */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function News() {
  const { data: newsItems, isLoading, error } = trpc.news.list.useQuery();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-20">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Loading news...</span>
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
            <div className="text-red-500">Error loading news: {error.message}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Match Report":
        return "bg-green-700 text-white";
      case "Announcement":
        return "bg-accent text-accent-foreground";
      case "Selection":
        return "bg-purple-700 text-white";
      case "Event":
        return "bg-blue-700 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const featuredNews = newsItems && newsItems.length > 0 ? newsItems[0] : null;
  const recentNews = newsItems && newsItems.length > 1 ? newsItems.slice(1) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            News & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Stay informed with the latest match reports, announcements, and club news from Blackstone CC.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredNews && (
        <section className="py-16">
          <div className="container">
            <Card className="overflow-hidden border-border hover:border-accent transition-all group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {featuredNews.imageUrl && (
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={featuredNews.imageUrl}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${!featuredNews.imageUrl ? 'lg:col-span-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getCategoryColor(featuredNews.category)}>
                      {featuredNews.category}
                    </Badge>
                    {featuredNews.publishedAt && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredNews.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    )}
                  </div>
                  <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredNews.summary}
                  </p>
                  {featuredNews.author && (
                    <p className="text-sm text-muted-foreground mb-4">By {featuredNews.author}</p>
                  )}
                  <button 
                    onClick={() => setExpandedId(expandedId === featuredNews.id ? null : featuredNews.id)}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 font-heading font-semibold w-fit"
                  >
                    {expandedId === featuredNews.id ? "Hide" : "Read"} Full Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {expandedId === featuredNews.id && (
                <div className="border-t border-border p-8 bg-background/50">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {featuredNews.content}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      {recentNews.length > 0 && (
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-display font-bold text-3xl text-foreground mb-8">Recent Updates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((post: any) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden border-border hover:border-accent transition-all group cursor-pointer"
                  onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                >
                  {post.imageUrl && (
                    <div className="relative h-48">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getCategoryColor(post.category)} variant="secondary">
                        {post.category}
                      </Badge>
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-heading text-sm font-semibold">
                      {expandedId === post.id ? "Hide" : "Read"} More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {expandedId === post.id && (
                    <div className="border-t border-border p-6 bg-background/50">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {!newsItems || newsItems.length === 0 && (
        <section className="py-16">
          <div className="container text-center">
            <p className="text-muted-foreground text-lg">No news available yet</p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
