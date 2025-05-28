'use client';

import React from 'react';
import LogoCarousel from '@/components/LogoCarousel';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';

// Client logos configuration
const clientLogos = [
  {
    src: '/images/logos/openphone.svg',
    alt: 'OpenPhone',
    url: 'https://openphone.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/fermat.svg',
    alt: 'FERMAT',
    url: 'https://fermatcommerce.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/refound.svg',
    alt: 'Refound',
    url: 'https://refound.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/copenhagen-atomics.svg',
    alt: 'Copenhagen Atomics',
    url: 'https://copenhagenatomics.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/marketing-examined.svg',
    alt: 'Marketing Examined',
    url: 'https://marketingexamined.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/dieux.svg',
    alt: 'Dieux',
    url: 'https://dieuxskin.com',
    width: 160,
    height: 80
  },
  {
    src: '/images/logos/vie.svg',
    alt: 'Vie',
    url: 'https://viecard.io',
    width: 160,
    height: 80
  }
];

export default function ClientLogoSection() {
  return (
    <Section className="bg-[#2a3d45]" spacing="md">
      <div className="container mx-auto px-4">
        <Typography 
          variant="h2" 
          color="white" 
          className="text-center mb-8 md:mb-12"
        >
          Driving Real Results for Industry Leaders
        </Typography>

        {/* Key Metrics Section */}
        <div className="flex flex-col md:flex-row justify-around items-center text-center mb-10 md:mb-16 gap-8 md:gap-4 px-4">
          <div className="text-white">
            <p className="text-4xl lg:text-5xl font-bold text-secondary">$800,000+</p>
            <p className="text-base lg:text-lg mt-1 text-slate-200">Client Revenue Generated</p>
          </div>
          <div className="text-white">
            <p className="text-4xl lg:text-5xl font-bold text-secondary">2-3x</p>
            <p className="text-base lg:text-lg mt-1 text-slate-200">Faster Sales Cycles</p>
          </div>
          <div className="text-white">
            <p className="text-4xl lg:text-5xl font-bold text-secondary">10x</p>
            <p className="text-base lg:text-lg mt-1 text-slate-200">Higher Response Rates <span className="block text-xs opacity-70">(vs. Cold Email)</span></p>
          </div>
        </div>
        
        {/* Divider line */}
        <div className="my-8 md:my-10 border-t border-white/20 max-w-xl mx-auto"></div>
        
        <div className="mb-8 -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-24">
          <LogoCarousel 
            logos={clientLogos} 
            monochrome={false} 
            background="primary"
            className="[&_img]:brightness-0 [&_img]:invert px-4 md:px-8"
          />
        </div>

        {/* 
          Testimonial Section - Commented out for now
          <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-white/20 max-w-3xl mx-auto">
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl font-medium italic text-gray-200 leading-relaxed opacity-95">
                {"South Lamar Studios didn't just produce a podcast for us; they crafted a high-performance sales asset. The strategic approach and quality are outstanding."} 
              </p>
              <footer className="mt-6 md:mt-8">
                <p className="text-lg font-semibold text-secondary">Sarah Chen</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">CMO, Tech Innovators Inc.</p>
              </footer>
            </blockquote>
          </div>
        */}

      </div>
    </Section>
  );
} 