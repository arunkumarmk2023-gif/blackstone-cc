/* Heritage Grain Design: Enhanced footer with decorative divider and comprehensive links */
import { Link } from "wouter";
import { Facebook, Instagram, Mail, ExternalLink, AtSign } from "lucide-react";

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
            <div className="w-16 h-16 mb-4">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348981264/IakRzMrjjaUhHTHm.jpeg"
                alt="Blackstone CC Logo"
                className="w-full h-full object-contain mix-blend-screen"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
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
                  Home
                </Link>
              </li>
              <li>
                <Link href="/fixtures">
                  Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/players">
                  Players
                </Link>
              </li>
              <li>
                <Link href="/news">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">More</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Our Sponsors
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=61571168053666"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/blackstone_cricket_club/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.threads.com/@blackstone_cricket_club"
                target="_blank"
                rel="noopener noreferrer"
                title="Threads"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
              >
                <AtSign className="w-5 h-5" />
              </a>
              <a
                href="mailto:blackstonecricketclub@myyahoo.com"
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
            <p>Hard Tennis Ball Format</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
