'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrophyIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToElement } from '@/utils/scrollUtils';

// Custom hook for animated counter
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

// Counter component
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  isInView 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  isInView: boolean;
}) => {
  const count = useAnimatedCounter(value, isInView);
  return <span>{prefix}{count}{suffix}</span>;
};

export default function MetricsSection() {
  const pathname = usePathname();
  const router = useRouter();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Scroll to process section function
  const scrollToProcess = () => {
    if (pathname !== '/') {
      router.push('/#process');
      return;
    }
    scrollToElement('process');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section background="white" spacing="lg" className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(42, 61, 69, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(231, 111, 81, 0.1) 0%, transparent 50%)`
      }}></div>
      
      <div className="relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
            Optimized for <span className="text-secondary">Revenue, Not Downloads</span>.
          </h2>
          <Typography variant="body-lg" color="gray" className="max-w-3xl mx-auto mb-8">
            We measure success in deals, not downloads. Our Podcast for Sales System delivers tangible business results without relying on audience size.
          </Typography>
          {/* <motion.div
            className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 md:px-10 py-4 md:py-5 shadow-lg border border-primary/20 hover:shadow-xl hover:border-bg-dark transition-all duration-300 relative max-w-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Connecting line behind text - hidden on mobile */}
            {/* <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-[calc(100%-80px)] h-px bg-bg-dark"></div>
            </div>
            
            <motion.div 
              className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-sm relative z-10 flex-shrink-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Typography variant="subheading" as="span" className="font-semibold text-primary text-center md:whitespace-nowrap leading-tight md:leading-none flex items-center relative z-10 bg-white/90 px-3 md:px-4 rounded-full text-sm md:text-base">
              <span className="md:hidden">See Our Process in Action.</span>
              <span className="hidden md:inline">See How Gus Closed 2 Deals from 8 Podcast Interviews</span>
            </Typography>
            <motion.div
              className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full relative z-10 flex-shrink-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div> */}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* First metric card - Client Success Rate */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-linear-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <TrophyIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="primary" 
                className="font-bold mb-4 text-2xl"
              >
                <AnimatedCounter value={95} suffix="%" isInView={isInView} />
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Client Success Rate
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                Of our clients get qualified leads that turn into real business conversations and deals.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-bg-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
          
          {/* Second metric card - Time to First Lead */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-linear-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ClockIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="secondary" 
                className="font-bold mb-4 text-2xl"
              >
                5-<AnimatedCounter value={10} isInView={isInView} />
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Qualified Conversations Per Month
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                Our podcast outreach strategy gets qualified conversations on your calendar.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-bg-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
          
          {/* Third metric card - ROI */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ChartBarIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="primary" 
                className="font-bold mb-4 text-2xl"
              >
                <AnimatedCounter value={3} isInView={isInView} />x
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Average ROI Within 90 Days
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                Every dollar invested returns three dollars in new business within the first quarter.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-bg-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button 
            onClick={scrollToProcess}
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            See Our Process
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
} 