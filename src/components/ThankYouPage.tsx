import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import cloudTopGLogo from '@/assets/cloudtopg-logo.svg';

const ThankYouPage = () => {
  useEffect(() => {
    // Track successful form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submitted', {
        event_category: 'conversion',
        event_label: 'waitlist_signup_complete'
      });
    }
    
    // Track Facebook Pixel conversion event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration');
    }
  }, []);

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-ctg-white shadow-premium">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <img 
              src={cloudTopGLogo} 
              alt="Cloud Top G Logo" 
              className="h-16 mx-auto mb-6"
            />
            <div className="bg-green-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ctg-black mb-6">
            You're on the list!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
            We've emailed your confirmation and a quick assessment prep checklist. 
            Watch your inbox for application dates and next steps.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-ctg-black mb-3">What happens next?</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                Check your email for confirmation and prep materials
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                Get early access to application windows
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                Receive assessment prep kits and study guides
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                Stay updated on Cohort 2026 launch details
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={goBack}
            className="btn-primary h-14 px-8 text-lg font-bold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Cloud Top G
          </Button>
          
          <p className="text-sm text-gray-500 mt-6">
            Questions? Email us at{' '}
            <a href="mailto:hello@cloudtopg.com" className="text-primary hover:underline">
              hello@cloudtopg.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouPage;