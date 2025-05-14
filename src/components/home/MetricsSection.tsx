'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';

export default function MetricsSection() {
  return (
    <Section background="light" spacing="lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Typography 
            variant="h2" 
            color="primary" 
            className="mb-4"
          >
            Our Impact By The Numbers
          </Typography>
          <Typography variant="body-lg" className="max-w-2xl mx-auto">
            We take pride in our track record of excellence and the tangible results we deliver to our clients.
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First metric card */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <Typography 
                variant="h3" 
                color="primary" 
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                $1M+
              </Typography>
              <Typography variant="subheading" color="secondary" className="mb-2">
                Direct Revenue Generated
              </Typography>
              <Typography variant="body" color="gray">
                Driving measurable business growth for our clients
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
                Close deals more efficiently with our proven approach
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
                200+
              </Typography>
              <Typography variant="subheading" color="secondary" className="mb-2">
                Podcast Episodes Published
              </Typography>
              <Typography variant="body" color="gray">
                Delivering high-quality content across industries
              </Typography>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/contact" 
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            See How We Can Help Your Business
          </a>
        </div>
      </div>
    </Section>
  );
} 