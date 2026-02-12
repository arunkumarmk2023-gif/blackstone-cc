/* Heritage Grain Design: News page with blog-style article cards */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsPost {
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
}

export default function News() {
  // Sample news data - replace with actual data source
  const newsPost: NewsPost[] = [
    {
      title: "Blackstone CC Secures Thrilling Victory Against Hartford Hawks",
      date: "March 16, 2025",
      category: "Match Report",
      summary: "In a nail-biting encounter, Blackstone CC defended 165 runs to secure a 23-run victory. Captain Rajesh Kumar's all-round performance (45 runs, 3 wickets) proved decisive in this crucial league match.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-4_1770877525000_na1fn_Y3JpY2tldC10ZWFtLWNlbGVicmF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTRfMTc3MDg3NzUyNTAwMF9uYTFmbl9ZM0pwWTJ0bGRDMTBaV0Z0TFdObGJHVmljbUYwYVc5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fn8LUB9R~8ANOgDkyOh8wmXghNYK9wUGaZAb2yJYvOsUxBmxmXAneS7YZiJqUEq1bkzAceQr87-dBfsjQNm-ZygUQn5r5-4S5QeO26X7F84gDgQnHMlDQpgNKKc2ZpsQRolObPgZYnjVnfPA0w~beN10XXa~29Wagve2yn4eqkwmnOeZp~9-UIlQ4T9Um5Bt2XPb4ciLPTtaP14iuo-GRQBbiQFLtNebiyJDGr32MTufycFdEo3r5AjP6q~686M8AtuqoLDn0LkAoJ4y3xkK0f2mb3-NC0kABe6T0ypRrf8UkOekKhdWW7Nvx6mep6zHy1cDVlbGoEyPM0qLVaE3Gg__",
    },
    {
      title: "Season 2025 Squad Announcement",
      date: "March 1, 2025",
      category: "Announcement",
      summary: "Blackstone CC is proud to announce our squad for the CCL 2025 season. With a mix of experienced players and exciting new talent, we're ready to compete at the highest level.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-3_1770877524000_na1fn_Y3JpY2tldC1hY3Rpb24tYmF0dGluZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTNfMTc3MDg3NzUyNDAwMF9uYTFmbl9ZM0pwWTJ0bGRDMWhZM1JwYjI0dFltRjBkR2x1WncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GaHDvZMmkykhCmHNmD~TGvxC-dCu6QyWgiXJahwQ-EPqjovHk02v7q9w9Y9-gBX4eJhUFu3Goof1cwUKXims3nVZss75srFJAPztF1zK0S1u4uJCYmTMxQGLlL81gYW7DbZtYOaiOuYVd6~ucWezDrcnSURrssRZLBjUb0KANDjWWU3iEkzsrLGXzXbUkSCAJtVBrkc9m8lcRM6gGhFHuR2NU6UxAAngY0ah~S~IfIQ2jeAF7q6-fmkuhY9sUaAwPnpdPd~YoUKplVRIfJxS~PSvwU7YPJtDjPjgTPJBXEiiI7MoafnujoAVZ~mEBzbLiuhBGmGBm8flba9d~IBp1A__",
    },
    {
      title: "Pre-Season Training Camp Success",
      date: "February 15, 2025",
      category: "Event",
      summary: "Our intensive pre-season training camp concluded with excellent results. Players showed great fitness levels and team chemistry as we prepare for the upcoming season.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-5_1770877522000_na1fn_Y3JpY2tldC1maWVsZC1hZXJpYWw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTVfMTc3MDg3NzUyMjAwMF9uYTFmbl9ZM0pwWTJ0bGRDMW1hV1ZzWkMxaFpYSnBZV3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=T~wrwjYyjWotgy4m~Pm13-kdYCrBh2T85p7IQQwEzp-yI-C-5-dHeeqcGJaliJR0SDAcukXMMYhu-vkvxMn4PCcQVei3cFrw25e3sdV5DvXt9pvXlEDQXqIN7afgV904YJ5YNd0QUfJsCOBHnCZIjeM0-k2R-ss1kJYr3nObgljjBnW~76o66fwltEWS8C-CmlW~dfWJHCqZ~rQtVxbMEinkJ0c9TP30ez4igijC~5nDMNrZk8yhZyGA9wWp2oqZrnvnCl6x2Lv8D6fwL29pUIIzY6EznSY41jdUd2ZNedoJKXLAs26YrYcfvCNNPW1JCuIWjkjex8UwylEDk8YaaQ__",
    },
    {
      title: "Welcome New Members to Blackstone CC",
      date: "January 20, 2025",
      category: "Announcement",
      summary: "We're excited to welcome three new players to our squad. Their addition strengthens our batting lineup and bowling attack for the season ahead.",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Match Report":
        return "bg-green-700 text-white";
      case "Announcement":
        return "bg-accent text-accent-foreground";
      case "Event":
        return "bg-blue-700 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

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
      <section className="py-16">
        <div className="container">
          <Card className="overflow-hidden border-border hover:border-accent transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-full">
                <img
                  src={newsPost[0].image}
                  alt={newsPost[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getCategoryColor(newsPost[0].category)}>
                    {newsPost[0].category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {newsPost[0].date}
                  </div>
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors">
                  {newsPost[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {newsPost[0].summary}
                </p>
                <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-heading font-semibold">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Recent Updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsPost.slice(1).map((post, index) => (
              <Card key={index} className="overflow-hidden border-border hover:border-accent transition-all group">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getCategoryColor(post.category)} variant="secondary">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-heading text-sm font-semibold">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
