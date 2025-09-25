import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle, Globe, Users, Trophy, Instagram, Twitter, Linkedin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import images
import cloudTopGLogo from '@/assets/cloudtopg-logo.svg';
import handsOnProjects from '@/assets/hands-on-projects-new.jpg';
import globalOpportunities from '@/assets/global-opportunities-new.jpg';
import premiumMentorship from '@/assets/premium-mentorship-new.jpg';
import learnerTransformation from '@/assets/learner-transformation.jpg';

interface FormData {
  email: string;
  fullName: string;
  phoneNumber: string;
  consent: boolean;
}

const CloudTopGLanding = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    phoneNumber: '+234',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consent: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive updates to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Track form submit event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submitted', {
        event_category: 'engagement',
        event_label: 'waitlist_signup'
      });
    }
    
    // Track Facebook Pixel event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    // Simulate form submission (replace with actual Mailchimp integration)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to thank you page
    window.location.href = '/thank-you';
  };

  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
    
    // Track CTA click event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_join_waitlist', {
        event_category: 'engagement',
        event_label: 'cta_button'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          {/* Tech grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, hsl(0 100% 50% / 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, hsl(0 100% 50% / 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 49%, hsl(0 100% 50% / 0.05) 50%, transparent 51%)
              `
            }}></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <img 
              src={cloudTopGLogo} 
              alt="Cloud Top G Logo" 
              className="h-20 mx-auto lg:mx-0 mb-8"
            />
            
            <h1 className="section-title font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Cloud Top G{' '}
              <span className="text-red-500">Cohort 2026</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
              Become a world-class cloud engineer in 12 months. Hands-on labs, live mentorship, 
              and career support—built to help you land remote roles that pay in USD.
            </p>
            
            <p className="microcopy text-gray-400 mb-8">
              Trusted by aspiring engineers across Africa.
            </p>
          </div>

          {/* Right Column - Waitlist Form */}
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">
                Join the Waitlist
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" id="waitlist-form">
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-900">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-900">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="+234 XX XXXX XXXX"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleConsentChange}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-600 leading-tight">
                    I agree to receive emails about Cloud Top G admissions, assessments, 
                    and program updates. *
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="btn-primary w-full h-14 text-lg font-bold bg-red-500 hover:bg-red-600 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                <p className="form-note text-center text-gray-500">
                  You'll get application dates, assessment prep kits, and early-bird updates. 
                  No spam—<a href="/privacy" className="text-red-500 hover:underline">unsubscribe anytime</a>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Cloud Top G Section */}
      <section className="section bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why <span className="text-red-500">Cloud Top G</span>?
            </h2>
            <p className="text-xl text-gray-600">
              We combine elite training with real work experience so you can compete globally.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Hands-On Projects */}
            <Card className="card group hover:shadow-xl smooth-transition bg-white">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={handsOnProjects} 
                    alt="Hands-on cloud project on laptop" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Trophy className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Hands-On Projects
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Build real solutions with AWS, Terraform, Docker, and Kubernetes. 
                  Graduate with a portfolio, not just notes.
                </p>
              </CardContent>
            </Card>

            {/* Global Opportunities */}
            <Card className="card group hover:shadow-xl smooth-transition bg-white">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={globalOpportunities} 
                    alt="Global cloud connections" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Globe className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Global Opportunities
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn the skills companies hire for—so you can qualify for remote jobs that pay in USD.
                </p>
              </CardContent>
            </Card>

            {/* Premium Mentorship */}
            <Card className="card group hover:shadow-xl smooth-transition bg-white">
              <CardContent className="p-8 text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={premiumMentorship} 
                    alt="Mentor guiding learner" 
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Premium Mentorship
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get guided by experienced engineers who keep you accountable, 
                  focused, and industry-ready.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Journey Starts Here Section */}
      <section className="section bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Your Journey{' '}
              <span className="text-red-500">Starts Here</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you're switching careers or leveling up, our 12-month program blends live classes, 
              practical assignments, and job-readiness training. We don't just teach tools—we train 
              problem-solvers who can deliver in the real world.
            </p>
            
            <div className="space-y-4">
              {[
                'Weekly live classes + projects',
                'Assessment prep kits on admission',
                'Career reviews & interview practice'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-lg text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={learnerTransformation} 
              alt="Learner studying cloud engineering" 
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-red-500 text-black px-6 py-3 rounded-lg font-bold text-lg glow-effect">
              12 Months
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="section premium-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Be First in Line for{' '}
            <span className="text-black">Cohort 2026</span>
          </h2>
          
          <p className="text-xl text-white mb-8 leading-relaxed">
            Seats are limited. Join the waitlist to get early access to application 
            windows and study materials for the assessment.
          </p>
          
          <Button 
            onClick={scrollToForm}
            className="btn-primary h-16 px-8 text-xl font-bold glow-effect bg-red-500 hover:bg-red-600 text-black mb-6"
          >
            Join the Waitlist
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          
          <p className="microcopy text-white/80">
            1,000+ hours across Linux, Git/GitHub, AWS, Terraform, Docker, Kubernetes.
          </p>
        </div>
      </section>

      {/* Optional Testimonial Strip */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <blockquote className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "I landed my first remote role after Cloud Top G—projects made all the difference."
              </p>
              <cite className="text-gray-900 font-semibold">— Azeem</cite>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "Clear structure, real mentorship, and accountability."
              </p>
              <cite className="text-gray-900 font-semibold">— Precious S.</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <img 
                src={cloudTopGLogo} 
                alt="Cloud Top G Logo" 
                className="h-12 mb-3 mx-auto md:mx-0"
              />
              <p className="text-white font-bold text-lg">
                Cloud Top G — THE ONLY WAY TO STAY IN THE GAME IS TO WIN
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 smooth-transition"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 smooth-transition"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 smooth-transition"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-white smooth-transition">About</a>
                <a href="/privacy" className="text-gray-400 hover:text-white smooth-transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white smooth-transition">Contact</a>
              </div>
              <p className="text-gray-400">
                © 2024 Cloud Top G. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudTopGLanding;