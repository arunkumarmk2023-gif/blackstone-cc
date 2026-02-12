/* Heritage Grain Design: Navigation with warm gold accents on rich brown background */
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/fixtures", label: "Fixtures & Results" },
    { href: "/players", label: "Players" },
    { href: "/news", label: "News" },
    { href: "/gallery", label: "Gallery" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/join-us", label: "Join Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-xl">BC</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-xl text-foreground">Blackstone CC</div>
                <div className="text-xs text-muted-foreground font-heading">Connecticut Cricket League</div>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`px-4 py-2 rounded-lg font-heading text-sm transition-all ${
                    location === link.href
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-foreground hover:bg-secondary hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

          {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`block px-4 py-3 rounded-lg font-heading transition-all ${
                    location === link.href
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-foreground hover:bg-secondary hover:text-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
