'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import LogoCarousel from '@/components/LogoCarousel';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';

// Custom hook for animated counter (same as MetricsSection)
const useAnimatedCounter = (targetValue: number, isInView: boolean, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, isInView, duration]);

  return count;
};

// Counter component for different metric types
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  isInView,
  type = 'number'
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  isInView: boolean;
  type?: 'number' | 'currency' | 'percentage' | 'multiplier';
}) => {
  const count = useAnimatedCounter(value, isInView);
  
  if (type === 'currency') {
    return <span>${count.toLocaleString()}+</span>;
  }
  
  if (type === 'percentage') {
    return <span>{count}%</span>;
  }
  
  if (type === 'multiplier') {
    return <span>{count}x</span>;
  }
  
  return <span>{prefix}{count}{suffix}</span>;
};

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

// Testimonials data
const testimonials = [
  {
    quote: "South Lamar Studios transformed our sales approach. We're now having meaningful conversations with C-level executives who used to ignore our emails.",
    author: "Sarah Chen",
    position: "CMO",
    company: "TechFlow Inc.",
    rating: 5
  },
  {
    quote: "The podcast became our secret weapon. Within 3 months, we closed deals worth $200,000 that started as podcast interviews.",
    author: "Michael Rodriguez",
    position: "VP Sales",
    company: "B2B Solutions Corp",
    rating: 5
  },
  {
    quote: "Game-changing results. Our conversion rate from prospects to meetings increased by 300% after launching the podcast.",
    author: "Brian Blum",
    position: "Co-Host",
    company: "Sweat Equity Podcast",
    rating: 5
  }
];

export default function ClientLogoSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section className="bg-linear-to-br from-primary via-primary-dark to-primary-light relative overflow-hidden" spacing="md">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            color="white" 
            className="text-center mb-8 md:mb-12"
          >
            Driving Real Results for Industry Leaders
          </Typography>
        </motion.div>

        {/* Enhanced Key Metrics Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-around items-stretch text-center mb-10 md:mb-16 gap-8 md:gap-4 px-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-white group flex-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300 h-full flex flex-col justify-center min-h-[120px]">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">
                <AnimatedCounter value={800000} isInView={isInView} type="currency" />
              </p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Client Revenue Generated</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-white group flex-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300 h-full flex flex-col justify-center min-h-[120px]">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">
                <AnimatedCounter value={20} isInView={isInView} type="percentage" />
              </p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Shorter Sales Cycles</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-white group flex-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300 h-full flex flex-col justify-center min-h-[120px]">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">
                <AnimatedCounter value={5} isInView={isInView} type="multiplier" />
              </p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Higher Response Rates</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced divider line */}
        <motion.div 
          className="my-8 md:my-10 relative"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent max-w-xl mx-auto"></div>
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
          </div>
        </motion.div>
        
        {/* Enhanced Logo Carousel with improved visibility */}
        <motion.div 
          className="mb-12 -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <LogoCarousel 
            logos={clientLogos} 
            monochrome={false} 
            className="[&_img]:brightness-0 [&_img]:invert [&_img]:opacity-80 hover:[&_img]:opacity-100 [&_img]:transition-all [&_img]:duration-300 px-4 md:px-8"
          />
        </motion.div>

        {/* Testimonials Section - Commented out until real customer quotes are available */}
        {/*
        <motion.div 
          className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/30 transition-all duration-300 h-full">
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-secondary" />
                    ))}
                  </div>
                  
                  <blockquote className="text-center">
                    <p className="text-sm md:text-base font-medium text-gray-200 leading-relaxed mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-4">
                      <p className="text-sm font-semibold text-secondary">{testimonial.author}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}

      </div>
    </Section>
  );
} 