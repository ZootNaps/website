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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First metric card */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h3" 
                color="primary" 
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                $800,000+
              </Typography>
              <Typography variant="subheading" color="secondary" className="mb-2">
                Direct Revenue Generated
              </Typography>
              <Typography variant="body" color="gray">
                Our podcasts have generated over $200k for our clients in less than 3 months.
              </Typography>
            </div>
          </div>
          
          {/* Second metric card */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h3" 
                color="primary" 
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                2-3x
              </Typography>
              <Typography variant="subheading" color="secondary" className="mb-2">
                Faster Sales Cycles
              </Typography>
              <Typography variant="body" color="gray">
                Build trust, credibility, and close deals faster.
              </Typography>
            </div>
          </div>
          
          {/* Third metric card */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h3" 
                color="primary" 
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                10x
              </Typography>
              <Typography variant="subheading" color="secondary" className="mb-1">
                Higher Response Rates
              </Typography>
              <Typography variant="small" color="gray" className="mb-2 italic">
                (vs. cold email)
              </Typography>
              <Typography variant="body" color="gray">
                Connect with executives and desicion makers directly.
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