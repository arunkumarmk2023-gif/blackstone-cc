/* Heritage Grain Design: Enhanced footer with decorative divider and comprehensive links */
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Decorative Divider */}
      <div className="container py-4">
        <div className="flex items-center gap-4">
          <div className="h-px bg-border flex-1" />
          <div className="w-2 h-2 bg-accent rounded-full" />
          <div className="h-px bg-border flex-1" />
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-lg text-accent mb-4">Blackstone CC</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Competing in the Connecticut Cricket League (CCL) Hard Tennis Ball division. 
              Building community through cricket excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/fixtures">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Fixtures & Results
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/players">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Players
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    News
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">More</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sponsors">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Our Sponsors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/join-us">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Join Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                title="Facebook"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                title="Twitter"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                title="Instagram"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@blackstonecc.com"
                title="Email"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <a
              href="https://cricclubs.com/ConnecticutCricketLeague1/teams/hPu1xeCvHMLGRWu-iwrX_w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-heading"
            >
              CricClubs Stats
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Blackstone Cricket Club. All rights reserved.</p>
            <p>Connecticut Cricket League – TCL 2025 • Hard Tennis Ball Format</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
