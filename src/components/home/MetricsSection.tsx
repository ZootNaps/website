'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToElement } from '@/utils/scrollUtils';

export default function MetricsSection() {
  const pathname = usePathname();
  const router = useRouter();

  // Scroll to process section function - similar to the navigation functionality
  const scrollToProcess = () => {
    if (pathname !== '/') {
      // If not on homepage, navigate to homepage with hash
      router.push('/#process');
      return;
    }
    
    // If already on homepage, use our custom scroll function with offset
    scrollToElement('process');
  };

  return (
    <Section background="light" spacing="lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Typography 
            variant="h2" 
            color="primary" 
            className="mb-4"
          >
            Zero Audience Required.
          </Typography>
          <Typography variant="body-lg" className="max-w-2xl mx-auto">
            We measure success in deals, not downloads. Our Podcast for Sales System delivers tangible business results without relying on audience size.
          </Typography>
          <Typography variant="h3" className="max-w-2xl mx-auto mt-6 mb-4 text-primary">
            Placeholder text
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First metric card - UPDATED */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h4" // Changed from h3 for textual content
                color="primary" 
                className="font-semibold mb-3" // Adjusted styling
              >
                Build your sales pipeline, guaranteed
              </Typography>
              <Typography variant="body" color="gray" className="mb-2">
                Placeholder text
              </Typography>
            </div>
          </div>
          
          {/* Second metric card - UPDATED */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h4" // Changed from h3 for textual content
                color="primary" 
                className="font-semibold mb-3" // Adjusted styling
              >
                1 hour / week
              </Typography>
              <Typography variant="body" color="gray" className="mb-2">
                Placeholder text
              </Typography>
            </div>
          </div>
          
          {/* Third metric card - UPDATED */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h4" // Changed from h3 for textual content
                color="primary" 
                className="font-semibold mb-3" // Adjusted styling
              >
                Expert podcast post-production
              </Typography>
              <Typography variant="body" color="gray" className="mb-2">
                Placeholder text
              </Typography>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={scrollToProcess}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            See Our Process
          </button>
        </div>
      </div>
    </Section>
  );
} 