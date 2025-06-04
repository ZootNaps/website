'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/utils/scrollUtils';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check initially
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section id="home" className="pt-24 pb-20 relative overflow-hidden bg-linear-to-br from-primary-50 via-bg-light to-primary-100">
      {/* Enhanced background with dynamic gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/3 to-primary/8 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      
      {/* Enhanced decorative elements with subtle animations */}
      <motion.div 
        className="absolute right-0 top-20 w-64 h-64 bg-secondary/8 rounded-full blur-3xl z-0"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute left-10 bottom-10 w-40 h-40 bg-primary/8 rounded-full blur-2xl z-0"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-primary relative z-10">
                Turn Your Toughest Prospects{' '}
                <motion.span 
                  className="text-secondary relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Into Engaged Podcast Guests.
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-secondary/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  ></motion.div>
                </motion.span>
              </h1>
            </div>
            
            {/* Enhanced subtitle with visual element for "sales-first podcasting" */}
            {/* <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2.5 rounded-lg">
                <motion.div 
                  className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 8px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0.4)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <span className="text-xl font-semibold text-primary">With a Sales-First Podcast</span>
              </div>
            </motion.div> */}
            
            <motion.p 
              className="text-lg md:text-xl text-black leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Get strategic 45-minute conversations with your most elusive decision-makers. Our 'Podcast for Sales' system uses podcasting to secure meetings, build relationships, and advance deals through your pipeline.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/contact" 
                  className="group bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-10 rounded-xl text-lg text-center transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/50 transform hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-secondary/50 flex items-center gap-2"
                >
                  Get Started
                  <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              <motion.button 
                onClick={() => scrollToElement('what-we-do')}
                className="group text-primary hover:text-secondary font-medium py-3 px-6 rounded-md text-center transition-all duration-300 hover:bg-white/50 flex items-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Enhanced image container with split-screen concept */}
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="/images/hero-image.png"
                alt="Sales development system helping businesses connect with and sell to their top customers through strategic podcast conversations"
                fill
                loading={isMobile ? "lazy" : "eager"}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              {/* Enhanced overlay with better visual hierarchy */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/40 via-transparent to-secondary/20"></div>
            </div>
            
            {/* Enhanced client attribution with better visual treatment - removed quote and box */}
            <motion.div 
              className="mt-4 text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <p className="text-sm text-gray-600">
                Brian Blum - Co-Host of "Sweat Equity"
              </p>
            </motion.div>
            
            {/* Enhanced decorative element */}
            {/* <motion.div 
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-linear-to-br from-bg to-white border-4 border-white rounded-2xl shadow-lg -z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            ></motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 