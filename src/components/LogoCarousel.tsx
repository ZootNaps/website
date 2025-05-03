'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Section from './ui/Section';
import Typography from './ui/Typography';

interface Logo {
  src: string;
  alt: string;
  url?: string;
  width?: number;
  height?: number;
}

interface LogoCarouselProps {
  logos: Logo[];
  title?: string;
  description?: string;
  background?: 'white' | 'light' | 'primary' | 'secondary';
  monochrome?: boolean;
  className?: string;
}

export default function LogoCarousel({
  logos,
  title,
  description,
  background = 'white',
  monochrome = false,
  className = '',
}: LogoCarouselProps) {
  // Ensure smooth looping by duplicating logos
  // We'll duplicate it multiple times to ensure there's enough content for continuous scrolling
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Create a set of duplicated logos that's exactly enough to fill the container twice
  // This ensures smooth looping with precise animation timing
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
  
  return (
    <Section 
      background={background} 
      spacing="md" 
      className={twMerge('overflow-hidden', className)}
    >
      {title && (
        <Typography 
          variant="h3" 
          color={background === 'white' || background === 'light' ? 'primary' : 'white'}
          className="text-center mb-2"
        >
          {title}
        </Typography>
      )}
      
      {description && (
        <Typography 
          variant="body" 
          color={background === 'white' || background === 'light' ? 'default' : 'white'}
          className="text-center mb-8 max-w-2xl mx-auto"
        >
          {description}
        </Typography>
      )}
      
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Outer container with padding to prevent edge-to-edge appearance */}
        <div 
          ref={carouselRef}
          className="overflow-hidden"
        >
          {/* Inner container that animates */}
          <div className="animate-scroll flex items-center gap-12 w-max">
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={`${logo.alt}-${index}`} 
                className={twMerge(
                  'flex items-center justify-center h-16 md:h-20 px-4', 
                  monochrome ? 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300' : ''
                )}
              >
                {logo.url ? (
                  <a 
                    href={logo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width || 160}
                      height={logo.height || 80}
                      className="object-contain max-h-full"
                    />
                  </a>
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 160}
                    height={logo.height || 80}
                    className="object-contain max-h-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
} 