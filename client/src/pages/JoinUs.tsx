/* Heritage Grain Design: Join Us page with membership details */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, Calendar, Trophy, Mail } from "lucide-react";
import { Link } from "wouter";

export default function JoinUs() {
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
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16">
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

      {/* How to Join */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="font-display font-bold text-4xl text-foreground mb-12 text-center">
            How to Join
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground font-display font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Get in Touch</h3>
              <p className="text-muted-foreground">
                Contact us via email or phone to express your interest in joining the club.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground font-display font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Attend Trial</h3>
              <p className="text-muted-foreground">
                Join us for a practice session to meet the team and showcase your skills.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground font-display font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Join the Squad</h3>
              <p className="text-muted-foreground">
                Complete registration and become an official member of Blackstone CC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="p-12 bg-gradient-to-br from-accent/10 to-accent/5 border-accent text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Ready to Join Blackstone CC?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards becoming part of our cricket family. 
              Contact us today to learn more about membership and upcoming trials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-heading">
                <Calendar className="mr-2 h-5 w-5" />
                View Practice Schedule
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
