'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-[85vh] bg-linear-to-br from-bg via-white to-primary-50 overflow-hidden pt-24 md:pt-0 flex items-center">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-bg via-white to-primary-50"></div>
        
        {/* Floating geometric elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-tertiary/8 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-primary mb-2">Turn Your Toughest Prospects</span>
                <span className="block text-secondary font-extrabold">Into Strategic Partners</span>
              </motion.h1>
            </div>
            
            <motion.div
              className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="mb-4">
                <span className="font-semibold text-primary">Skip the cold calling chaos.</span> Our sales development system gets you 45-minute strategic conversations with C-suite executives who normally ignore your outreach—using podcasting as the premium vehicle.
              </p>
              <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-4 rounded-lg border border-secondary/20 mb-4">
                <p className="font-medium text-gray-800">
                  ✅ <span className="font-semibold">No audience required</span> • ✅ <span className="font-semibold">30% higher response rates than cold calling</span> • ✅ <span className="font-semibold">Premium positioning that executives prefer</span>
                </p>
              </div>
              <p className="text-base text-gray-600">
                <span className="italic">While others send 100+ emails hoping for 5-minute calls,</span> we secure strategic meetings that advance real deals.
              </p>
            </motion.div>
            
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
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={85}
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