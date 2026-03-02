/* Newsletter subscription form component */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "compact" | "footer";
}

export default function NewsletterForm({ className = "", variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await subscribeMutation.mutateAsync({ email });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setName(""); // Keep name state for UI but don't send to backend
    } catch (error: any) {
      if (error.message.includes("already subscribed")) {
        toast.error("This email is already subscribed");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background border-border flex-1"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          size="sm"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={subscribeMutation.isPending}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <div className="flex gap-2">
          <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-heading font-semibold text-foreground mb-1">Subscribe to Our Newsletter</p>
            <p className="text-sm text-muted-foreground mb-3">Get the latest updates on fixtures, results, and club news.</p>
          </div>
        </div>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background border-border"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-display font-bold text-3xl text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground text-lg">
          Subscribe to our newsletter for the latest news, fixtures, and updates from Blackstone CC.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="newsletter-name" className="block text-sm font-heading font-medium text-foreground mb-2">
            Name (Optional)
          </label>
          <Input
            id="newsletter-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-border"
            disabled={subscribeMutation.isPending}
          />
        </div>

        <div>
          <label htmlFor="newsletter-email" className="block text-sm font-heading font-medium text-foreground mb-2">
            Email Address *
          </label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border"
            disabled={subscribeMutation.isPending}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading"
        disabled={subscribeMutation.isPending}
      >
        {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Now"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
