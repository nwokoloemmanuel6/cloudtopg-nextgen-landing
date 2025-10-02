
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle, Globe, Users, Trophy, Instagram, Twitter, Linkedin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import images
import cloudTopGLogo from '@/assets/cloudtopg-logo-red-black.png';
import handsOnProjects from '@/assets/hands-on-projects-new.jpg';
import globalOpportunities from '@/assets/global-opportunities-new.jpg';
import premiumMentorship from '@/assets/premium-mentorship-new.jpg';
import learnerTransformation from '@/assets/learner-transformation.jpg';

interface FormDataState {
  email: string;
  fullName: string;
  phoneNumber: string;
  consent: boolean;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdkwzdzn';

const CloudTopGLanding = () => {
  const [formData, setFormData] = useState<FormDataState>({
    email: '',
    fullName: '',
    phoneNumber: '+234',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked: boolean | "indeterminate") => {
  setFormData(prev => ({ ...prev, consent: checked === true }));
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: 'Consent Required',
        description: 'Please agree to receive updates to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload for Formspree
      const body = new FormData(e.currentTarget);
      // Ensure values from state are sent (Checkbox is custom, not native)
      body.set('email', formData.email);
      body.set('fullName', formData.fullName);
      body.set('phoneNumber', formData.phoneNumber);
      body.set('consent', String(formData.consent));
      // Optional helpers Formspree recognizes:
      body.set('_subject', 'CTG Waitlist Signup');
      body.set('_redirect', `${window.location.origin}/thank-you`);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });

      if (!res.ok) throw new Error('Submit failed');

      toast({ title: 'Success 🎉', description: 'You are on the waitlist.' });
      // Redirect to thank-you page
      window.location.href = '/thank-you';
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_join_waitlist', {
        event_category: 'engagement',
        event_label: 'cta_button',
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
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                radial-gradient(circle at 25% 25%, hsl(0 100% 50% / 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, hsl(0 100% 50% / 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 49%, hsl(0 100% 50% / 0.05) 50%, transparent 51%)
              `,
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <img src={cloudTopGLogo} alt="Cloud Top G Logo" className="h-20 mx-auto lg:mx-0 mb-8" />

            <h1 className="section-title font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Cloud Top G <span className="text-red-500">Cohort 2026</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
              Become a world-class cloud engineer in 12 months. Hands-on labs, live mentorship, and career
              support—built to help you land remote roles that pay in USD.
            </p>

            <p className="microcopy text-gray-400 mb-8">Trusted by aspiring engineers across Africa.</p>
          </div>

          {/* Right Column - Waitlist Form */}
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Join the Waitlist</h3>

              <form onSubmit={handleSubmit} className="space-y-6" id="waitlist-form">
  {/* Honeypot for bots */}
  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

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

  {/* Consent */}
  <div className="flex items-start space-x-2">
    <Checkbox
      id="consent"
      checked={formData.consent}
      onCheckedChange={(v) => handleConsentChange(v)}
      className="mt-1"
    />
    <Label htmlFor="consent" className="text-sm text-gray-600 leading-tight cursor-pointer">
      I agree to receive emails about Cloud Top G admissions, assessments, and program updates. *
    </Label>
    {/* Mirror consent into a native input so FormData always has it */}
    <input type="hidden" name="consent" value={formData.consent ? "true" : "false"} />
  </div>

  <Button
    type="submit"
    className="btn-primary w-full h-14 text-lg font-bold bg-red-500 hover:bg-red-600 text-black"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Processing...' : <>
      Join Waitlist
      <ArrowRight className="ml-2 h-5 w-5" />
    </>}
  </Button>

  <p className="form-note text-center text-gray-500">
    You'll get application dates, assessment prep kits, and early-bird updates.
    No spam—<a href="/privacy" className="text-red-500 hover:underline">unsubscribe anytime</a>.
  </p>
</form>

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
                  <Checkbox id="consent" checked={formData.consent} onCheckedChange={handleConsentChange} className="mt-1" />
                  <Label htmlFor="consent" className="text-sm text-gray-600 leading-tight">
                    I agree to receive emails about Cloud Top G admissions, assessments, and program updates. *
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="btn-primary w-full h-14 text-lg font-bold bg-red-500 hover:bg-red-600 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : <>
                    Join Waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>}
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
      {/* ...rest of your component remains unchanged... */}

      {/* The rest of your sections and footer stay exactly as you had them */}
      {/* --- (omitted for brevity) --- */}
    </div>
  );
};

export default CloudTopGLanding;
