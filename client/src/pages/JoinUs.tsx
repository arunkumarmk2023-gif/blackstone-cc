/* Heritage Grain Design: Enhanced Join Us page with form validation */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Users, Calendar, Trophy, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitJoiner = trpc.joiners.submit.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        message: "",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit application");
      setIsSubmitting(false);
    },
  });

  const benefits = [
    "Compete in Connecticut Cricket League matches",
    "Access to regular training sessions",
    "Professional coaching and skill development",
    "Team kit and equipment provided",
    "Social events and club gatherings",
    "Opportunity to represent Blackstone CC",
  ];

  const requirements = [
    "Passion for cricket and team sports",
    "Commitment to attend practices and matches",
    "Good sportsmanship and positive attitude",
    "Basic cricket skills (all levels welcome)",
    "Available for weekend matches",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.role) {
      toast.error("Please select your playing role");
      return;
    }
    if (!formData.experience) {
      toast.error("Please select your experience level");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please tell us about yourself");
      return;
    }

    setIsSubmitting(true);

    // Submit to backend
    await submitJoiner.mutateAsync({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role as any,
      experience: formData.experience as any,
      message: formData.message,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            Join Blackstone CC
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Become part of Connecticut's premier cricket club. Whether you're an experienced player 
            or looking to develop your game, we welcome passionate cricketers to our squad. 
            Social players and supporters are also welcome!
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16" id="join">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display font-bold text-4xl text-foreground mb-6">
                Why Join Blackstone CC?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Blackstone Cricket Club offers a competitive yet welcoming environment for cricketers 
                in Connecticut. We compete in the CCL Hard Tennis Ball division and provide opportunities 
                for players to develop their skills while being part of a supportive team.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our club values excellence, sportsmanship, and camaraderie. We're more than just a 
                cricket team—we're a community of players who share a love for the game and support 
                each other both on and off the field.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-4_1770877525000_na1fn_Y3JpY2tldC10ZWFtLWNlbGVicmF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTRfMTc3MDg3NzUyNTAwMF9uYTFmbl9ZM0pwWTJ0bGRDMTBaV0Z0TFdObGJHVmljbUYwYVc5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fn8LUB9R~8ANOgDkyOh8wmXghNYK9wUGaZAb2yJYvOsUxBmxmXAneS7YZiJqUEq1bkzAceQr87-dBfsjQNm-ZygUQn5r5-4S5QeO26X7F84gDgQnHMlDQpgNKKc2ZpsQRolObPgZYnjVnfPA0w~beN10XXa~29Wagve2yn4eqkwmnOeZp~9-UIlQ4T9Um5Bt2XPb4ciLPTtaP14iuo-GRQBbiQFLtNebiyJDGr32MTufycFdEo3r5AjP6q~686M8AtuqoLDn0LkAoJ4y3xkK0f2mb3-NC0kABe6T0ypRrf8UkOekKhdWW7Nvx6mep6zHy1cDVlbGoEyPM0qLVaE3Gg__"
                alt="Team Celebration"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Benefits & Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground">Membership Benefits</h3>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground">What We Look For</h3>
              </div>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 lg:p-12 bg-background border-border">
              <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                Join Our Squad
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll be in touch about upcoming trials and training sessions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-heading font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-card border-border"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Role & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="role" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Playing Role *
                    </label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} disabled={isSubmitting}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="batsman">Batsman</SelectItem>
                        <SelectItem value="bowler">Bowler</SelectItem>
                        <SelectItem value="allrounder">All-Rounder</SelectItem>
                        <SelectItem value="wicketkeeper">Wicketkeeper</SelectItem>
                        <SelectItem value="supporter">Supporter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-heading font-medium text-foreground mb-2">
                      Experience Level *
                    </label>
                    <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)} disabled={isSubmitting}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-heading font-medium text-foreground mb-2">
                    Tell Us About Yourself *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your cricket experience, goals, and why you'd like to join Blackstone CC..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-card border-border min-h-32"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
