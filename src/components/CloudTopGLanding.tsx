import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Twitter, Linkedin, ArrowRight, CheckCircle, Globe, Users, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import images
import heroBackground from '@/assets/hero-background.jpg';
import handsOnProjects from '@/assets/hands-on-projects.jpg';
import globalOpportunities from '@/assets/global-opportunities.jpg';
import premiumMentorship from '@/assets/premium-mentorship.jpg';
import transformation from '@/assets/transformation.jpg';
import cloudTopGLogo from '@/assets/cloud-top-g-logo.png';

interface FormData {
  email: string;
  fullName: string;
  phoneNumber: string;
}

const CloudTopGLanding = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    phoneNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the Waitlist!",
      description: "You're all set. We'll notify you when applications open.",
    });
    
    setFormData({ email: '', fullName: '', phoneNumber: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <img 
              src={cloudTopGLogo} 
              alt="Cloud Top G Logo" 
              className="h-16 mx-auto lg:mx-0 mb-8"
            />
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Cloud Top G{' '}
              <span className="text-primary">Cohort 2026</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">
                Join the Next Generation of Cloud Engineers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Be the first to secure your spot in our world-class Cloud Engineering program. 
              Limited seats, high impact, career transformation.
            </p>
          </div>

          {/* Right side - Form */}
          <Card className="bg-card/95 backdrop-blur-sm border-border shadow-premium">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                Join the Waitlist
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why <span className="text-primary">Cloud Top G</span>?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Hands-On Projects */}
            <Card className="group hover:shadow-glow smooth-transition border-border bg-card">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={handsOnProjects} 
                    alt="Hands-on cloud projects" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Hands-On Projects
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work on real-life assignments: AWS, Docker, Kubernetes, Terraform, and more. 
                  Build the portfolio that gets you hired.
                </p>
              </CardContent>
            </Card>

            {/* Global Opportunities */}
            <Card className="group hover:shadow-glow smooth-transition border-border bg-card">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={globalOpportunities} 
                    alt="Global remote opportunities" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Global Opportunities
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn the skills to land remote jobs that pay in USD and put you in the top 1%. 
                  Work from anywhere, earn globally.
                </p>
              </CardContent>
            </Card>

            {/* Premium Mentorship */}
            <Card className="group hover:shadow-glow smooth-transition border-border bg-card">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={premiumMentorship} 
                    alt="Premium mentorship" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Premium Mentorship
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Be guided by experienced engineers committed to your success. 
                  Get 1-on-1 support throughout your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Journey{' '}
              <span className="text-primary">Starts Here</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From beginner to certified cloud engineer in 12 months. Whether you're starting 
              fresh or looking to level up, Cloud Top G equips you with the skills, confidence, 
              and network to thrive in tech.
            </p>
            
            <div className="space-y-4">
              {[
                'Master AWS, Azure, and Google Cloud platforms',
                'Build production-ready cloud infrastructure',
                'Land high-paying remote positions',
                'Join an exclusive network of top engineers'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={transformation} 
              alt="Student transformation journey" 
              className="w-full rounded-lg shadow-premium"
            />
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-lg glow-effect">
              12 Months
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 px-4 bg-dark-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Be First in Line for{' '}
            <span className="text-primary">Cohort 2026</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Seats are limited. Join the waitlist today and get early access to application 
            details and study kits for the admission assessment.
          </p>
          
          <Button 
            variant="hero" 
            size="lg" 
            className="h-16 px-8 text-xl font-bold glow-effect"
            onClick={() => document.getElementById('fullName')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the Waitlist
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <img 
                src={cloudTopGLogo} 
                alt="Cloud Top G Logo" 
                className="h-12 mb-3"
              />
              <p className="text-muted-foreground font-semibold">
                THE ONLY WAY TO STAY IN THE GAME IS TO WIN
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary smooth-transition"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary smooth-transition"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary smooth-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2024 Cloud Top G. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudTopGLanding;