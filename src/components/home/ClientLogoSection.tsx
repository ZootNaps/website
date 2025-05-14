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
          className="text-center mb-8"
        >
          Trusted By Industry Leaders
        </Typography>
        
        <div className="mb-8">
          <LogoCarousel 
            logos={clientLogos} 
            monochrome={false} 
            background="primary"
            className="[&_img]:brightness-0 [&_img]:invert"
          />
        </div>
      </div>
    </Section>
  );
} 