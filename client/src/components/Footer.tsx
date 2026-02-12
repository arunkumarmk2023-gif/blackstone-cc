/* Heritage Grain Design: Footer with decorative divider and warm tones */
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-xl text-accent mb-4">Blackstone CC</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Competing in the Connecticut Cricket League (CCL) Hard Tennis Ball division. 
              Building community through cricket excellence since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
                    News & Updates
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/join-us">
                  <a className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    Join the Club
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@blackstonecc.com"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              <a href="mailto:contact@blackstonecc.com" className="hover:text-accent transition-colors">
                contact@blackstonecc.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Blackstone Cricket Club. All rights reserved.</p>
            <p>Connecticut Cricket League – TCL 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
