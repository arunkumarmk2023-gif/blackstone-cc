import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, Loader2 } from "lucide-react";

export default function Sponsors() {
  const sponsorsQuery = trpc.sponsors.list.useQuery();

  // Group sponsors by tier
  const sponsorsByTier = useMemo(() => {
    if (!sponsorsQuery.data) return { gold: [], silver: [], bronze: [] };
    
    const grouped = {
      gold: sponsorsQuery.data.filter((s: any) => s.tier === "gold"),
      silver: sponsorsQuery.data.filter((s: any) => s.tier === "silver"),
      bronze: sponsorsQuery.data.filter((s: any) => s.tier === "bronze"),
    };
    return grouped;
  }, [sponsorsQuery.data]);

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case "gold":
        return "Gold Partner";
      case "silver":
        return "Silver Partner";
      case "bronze":
        return "Bronze Partner";
      default:
        return tier;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "gold":
        return "bg-yellow-700 text-white";
      case "silver":
        return "bg-slate-500 text-white";
      case "bronze":
        return "bg-amber-700 text-white";
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
            Our Sponsors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We're grateful to our partners who support Blackstone CC and make our success possible. 
            Together, we're building a stronger cricket community in Connecticut.
          </p>
        </div>
      </section>

      {/* Sponsorship Tiers Info */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8 text-center">
            Partnership Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-background border-border text-center">
              <div className="inline-block mb-4">
                <Badge className="bg-yellow-700 text-white font-heading">Gold Partner</Badge>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Premium Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Maximum visibility and brand association with our club. Featured prominently across all platforms.
              </p>
              <p className="text-accent font-heading font-semibold">Contact for details</p>
            </Card>

            <Card className="p-6 bg-background border-border text-center">
              <div className="inline-block mb-4">
                <Badge className="bg-slate-500 text-white font-heading">Silver Partner</Badge>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Core Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Strong partnership with regular brand visibility at matches and events.
              </p>
              <p className="text-accent font-heading font-semibold">Contact for details</p>
            </Card>

            <Card className="p-6 bg-background border-border text-center">
              <div className="inline-block mb-4">
                <Badge className="bg-amber-700 text-white font-heading">Bronze Partner</Badge>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Community Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Support our mission with recognition in our community and at select events.
              </p>
              <p className="text-accent font-heading font-semibold">Contact for details</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-12">
            Our Current Partners
          </h2>

          {sponsorsQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12">
              <Loader2 className="animate-spin" />
              <span>Loading sponsors...</span>
            </div>
          ) : sponsorsQuery.data && sponsorsQuery.data.length > 0 ? (
            <div>
              {sponsorsByTier.gold.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-display font-bold text-2xl text-yellow-600 mb-6">Gold Partners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sponsorsByTier.gold.map((sponsor: any) => (
                      <Card key={sponsor.id} className="p-6 bg-card border-border hover:border-accent transition-all group">
                        {sponsor.logo && (
                          <div className="relative mb-6 h-32 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="max-w-full max-h-full object-contain p-2"
                            />
                          </div>
                        )}
                        <Badge className={`${getTierColor(sponsor.tier)} mb-3`} variant="secondary">
                          {getTierLabel(sponsor.tier)}
                        </Badge>
                        <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                          {sponsor.name}
                        </h3>
                        {sponsor.description && (
                          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                            {sponsor.description}
                          </p>
                        )}
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-heading text-sm font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {sponsorsByTier.silver.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-display font-bold text-2xl text-slate-400 mb-6">Silver Partners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sponsorsByTier.silver.map((sponsor: any) => (
                      <Card key={sponsor.id} className="p-6 bg-card border-border hover:border-accent transition-all group">
                        {sponsor.logo && (
                          <div className="relative mb-6 h-24 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="max-w-full max-h-full object-contain p-2"
                            />
                          </div>
                        )}
                        <Badge className={`${getTierColor(sponsor.tier)} mb-3`} variant="secondary">
                          {getTierLabel(sponsor.tier)}
                        </Badge>
                        <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                          {sponsor.name}
                        </h3>
                        {sponsor.description && (
                          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                            {sponsor.description}
                          </p>
                        )}
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-heading text-sm font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {sponsorsByTier.bronze.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-display font-bold text-2xl text-amber-600 mb-6">Bronze Partners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sponsorsByTier.bronze.map((sponsor: any) => (
                      <Card key={sponsor.id} className="p-6 bg-card border-border hover:border-accent transition-all group">
                        {sponsor.logo && (
                          <div className="relative mb-6 h-20 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="max-w-full max-h-full object-contain p-2"
                            />
                          </div>
                        )}
                        <Badge className={`${getTierColor(sponsor.tier)} mb-3`} variant="secondary">
                          {getTierLabel(sponsor.tier)}
                        </Badge>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                          {sponsor.name}
                        </h3>
                        {sponsor.description && (
                          <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                            {sponsor.description}
                          </p>
                        )}
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-heading text-xs font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card border-border">
              <p className="text-muted-foreground">No sponsors to display yet.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <Card className="p-12 bg-gradient-to-br from-accent/10 to-accent/5 border-accent text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Become a Sponsor
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Support Blackstone CC and gain valuable brand exposure within our community. 
              We offer flexible partnership packages tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:sponsors@blackstonecc.com" className="inline-block">
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading text-base cursor-pointer transition-colors">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </span>
              </a>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-heading">
                Download Sponsorship Package
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
