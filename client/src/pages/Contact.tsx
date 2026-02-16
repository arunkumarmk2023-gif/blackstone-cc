/* Heritage Grain Design: Contact page with form and details */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Have questions about joining the club, upcoming matches, or anything else? 
            We'd love to hear from you. Get in touch with Blackstone CC.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <Card className="p-6 bg-card border-border text-center hover:border-accent transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Email</h3>
              <a
                href="mailto:blackstonecricketclub@myyahoo.com?subject=Blackstone%20CC%20Inquiry"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                blackstonecricketclub@myyahoo.com
              </a>
            </Card>

            <Card className="p-6 bg-card border-border text-center hover:border-accent transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <Phone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Phone</h3>
              <a
                href="tel:+1234567890"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                +1 (234) 567-890
              </a>
            </Card>

            <Card className="p-6 bg-card border-border text-center hover:border-accent transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <MapPin className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">
                Connecticut, USA
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 lg:p-12 bg-card border-border">
              <h2 className="font-display font-bold text-3xl text-foreground mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-heading font-medium text-foreground mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (234) 567-890"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-heading font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Inquiry about membership"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-heading font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Response Time
              </h3>
              <p className="text-muted-foreground text-sm">
                We typically respond to inquiries within 24-48 hours. For urgent matters, 
                please call us directly. Follow us on social media for the latest updates and announcements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
