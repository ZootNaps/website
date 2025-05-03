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
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Create exact duplicates of the logos to ensure seamless looping
  // The key is to duplicate exactly the right amount for the animation to loop perfectly
  const duplicatedLogos = [...logos, ...logos];
  
  // This useEffect ensures the animation resets properly to avoid the jump
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const handleAnimationIteration = () => {
      // Reset to start position instantly when animation completes
      carousel.style.animation = 'none';
      carousel.offsetHeight; // Trigger reflow
      carousel.style.animation = ''; // Restore animation
    };
    
    carousel.addEventListener('animationiteration', handleAnimationIteration);
    
    return () => {
      carousel.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, []);
  
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
        <div className="overflow-hidden">
          <div 
            ref={carouselRef}
            className="animate-scroll flex items-center gap-12 w-max"
          >
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