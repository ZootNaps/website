'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
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
    <Section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light relative overflow-hidden" spacing="md">
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
          className="flex flex-col md:flex-row justify-around items-center text-center mb-10 md:mb-16 gap-8 md:gap-4 px-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-white group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">$800,000+</p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Client Revenue Generated</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-white group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">2-3x</p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Faster Sales Cycles</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-white group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300">
              <p className="text-4xl lg:text-5xl font-bold text-secondary group-hover:text-secondary-light transition-colors duration-300">10x</p>
              <p className="text-base lg:text-lg mt-2 text-slate-200">Higher Response Rates</p>
              <p className="text-xs opacity-70 mt-1">(vs. Cold Email)</p>
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
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-xl mx-auto"></div>
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
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
            background="primary"
            className="[&_img]:brightness-0 [&_img]:invert [&_img]:opacity-80 hover:[&_img]:opacity-100 [&_img]:transition-all [&_img]:duration-300 px-4 md:px-8"
          />
        </motion.div>

        {/* Testimonials Section */}
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
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-secondary/30 transition-all duration-300 h-full">
                  {/* Star Rating */}
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

      </div>
    </Section>
  );
} 