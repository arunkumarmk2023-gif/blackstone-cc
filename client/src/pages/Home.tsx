/* Heritage Grain Design: Home page with hero section, intro, and sponsors */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import { ArrowRight, Trophy, Users, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-1_1770877521000_na1fn_aGVyby1jcmlja2V0LXN0YWRpdW0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTFfMTc3MDg3NzUyMTAwMF9uYTFmbl9hR1Z5YnkxamNtbGphMlYwTFhOMFlXUnBkVzAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rujPD1lQLxgEV8XtQjxtFK~ZQnvfeDH9VpHbFxpt1JaKwzzl0MvkOcj8mmM6TDcsv~V7Vu0so65ox1FLaJvaWrS3qAcuhaGAhgd9k-nlj4NPjgw4cBD410cL2Bfdf7eW8WZRCTanhzs8bvr8mIIdXLNqLUMJEnvSdajO0U~a5orF2xV3-6Th16fC56ADYgFNkAdBUOPW57HW8M1bihrZKh1iqcqlOp5rttrTG10obdQKgvDY3j193YSg3vGWM4Qk-cYT24dM52J2OoqFgwesdwFfNSJ-0cAIAQHY5lXaaOQaNR5F~-K2lk7nZGHbeSeeEfU96wEpO74LO9O7xpJeHA__"
            alt="Cricket Stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Logo Placeholder */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-accent rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <span className="text-accent-foreground font-display font-bold text-4xl lg:text-5xl">BC</span>
            </div>

            <h1 className="font-display font-bold text-5xl lg:text-7xl text-foreground mb-4 leading-tight">
              Blackstone Cricket Club
            </h1>

            <p className="font-heading text-xl lg:text-2xl text-accent mb-6">
              Connecticut Cricket League – Hard Tennis Ball (TCL 2025)
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              A competitive cricket club dedicated to excellence, sportsmanship, and community.
              We bring together passionate players in Connecticut's premier hard tennis ball league,
              fostering both skill development and lasting friendships on the pitch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/fixtures" className="inline-block">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading text-base cursor-pointer transition-colors">
                View Fixtures
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </a>
            <a href="/join-us" className="inline-block">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground font-heading text-base cursor-pointer transition-colors">
                Join the Club
              </span>
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container">
          <WeatherWidget />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-3xl text-foreground mb-2">CCL 2025</h3>
              <p className="text-muted-foreground font-heading">Connecticut Cricket League</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-3xl text-foreground mb-2">15+ Players</h3>
              <p className="text-muted-foreground font-heading">Active Squad Members</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-3xl text-foreground mb-2">Season 2025</h3>
              <p className="text-muted-foreground font-heading">Hard Tennis Ball Format</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-6">
                About Our Club
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Blackstone Cricket Club represents the spirit of competitive cricket in Connecticut.
                  Founded by passionate cricketers, we compete in the Connecticut Cricket League's
                  Hard Tennis Ball division, bringing together players who share a love for the game.
                </p>
                <p>
                  Our club values skill development, fair play, and camaraderie. Whether you're an
                  experienced cricketer or looking to develop your game, Blackstone CC offers a
                  welcoming environment where players can grow and compete at a high level.
                </p>
                <p>
                  We participate in regular league matches, practice sessions, and club events
                  throughout the season. Join us to be part of Connecticut's vibrant cricket community.
                </p>
              </div>
              <a href="/join-us" className="inline-block mt-8">
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-heading cursor-pointer transition-colors">
                  Learn More About Joining
                </span>
              </a>
            </div>
            <div className="relative">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-2_1770877520000_na1fn_Y3JpY2tldC1lcXVpcG1lbnQtbGVhdGhlcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTJfMTc3MDg3NzUyMDAwMF9uYTFmbl9ZM0pwWTJ0bGRDMWxjWFZwY0cxbGJuUXRiR1ZoZEdobGNnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WQegtibSK7PR-jB2KLCLqvzjm~pHDjoltdfAa63FB9baCrta0MKz7zpDsrI0QY0-qZJjoZcdKwpJTRyU7jOLj~FsA-o0TK1zmwiFo0c4eWKfdkpq6cfEH7r1pBKEPgnSBX-EXthU33aBpLR3ZmarvuI9DG5XvpJMa-6kFvh77Ox9pLQwjBeeXEywfM9M~KVGv120OjSmuFr23BGbek~aq7~IUz4jplz3j4BTzR5ZyI2US3QUiIgWzEH56wLc7XDZDcUhHflRLHA1-wfnC9sPLU4HPrXPNMQIqrB2TVS6SmKtvcXL6wzgbmXAxvQTFcwL1x2gitRbf3AeknkXAdFM7w__"
                alt="Cricket Equipment"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-card border-y border-border" id="sponsors">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display font-bold text-4xl text-foreground">
              Our Partners
            </h2>
            <a href="/sponsors" className="inline-block">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground font-heading text-sm cursor-pointer transition-colors">
                View All Sponsors
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Sponsor Logo Placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <div className="text-center">
                  <p className="text-muted-foreground text-sm font-heading">Partner {i}</p>
                  <p className="text-xs text-muted-foreground/60">Logo here</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Interested in partnering with Blackstone CC?
            </p>
            <a href="mailto:sponsors@blackstonecc.com" className="text-accent hover:text-accent/80 font-heading font-semibold">
              Become a Sponsor →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
