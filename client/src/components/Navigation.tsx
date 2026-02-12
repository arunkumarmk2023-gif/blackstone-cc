/* Heritage Grain Design: Navigation with warm gold accents on rich brown background */
import { useLocation } from "wouter";
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
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348981264/IakRzMrjjaUhHTHm.jpeg"
              alt="Blackstone CC Logo"
              className="w-12 h-12 object-contain mix-blend-screen"
              style={{ backgroundColor: 'transparent' }}
            />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-xl text-foreground">Blackstone CC</div>
              <div className="text-xs text-muted-foreground font-heading">Connecticut Cricket League</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-heading text-sm transition-all ${
                  location === link.href
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground hover:bg-secondary hover:text-accent"
                }`}
              >
                {link.label}
              </a>
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
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-heading transition-all ${
                  location === link.href
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground hover:bg-secondary hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
