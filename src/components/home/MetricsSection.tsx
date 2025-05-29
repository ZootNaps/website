'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrophyIcon, ClockIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
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
          <Typography 
            variant="h2" 
            color="primary" 
            className="mb-6"
          >
            Zero Audience Required.
          </Typography>
          <Typography variant="body-lg" color="gray" className="max-w-3xl mx-auto mb-8">
            We measure success in deals, not downloads. Our Podcast for Sales System delivers tangible business results without relying on audience size.
          </Typography>
          <motion.div
            className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-10 py-5 shadow-lg border border-primary/20 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Connecting line behind text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-[calc(100%-80px)] h-px bg-linear-to-r from-secondary/30 via-primary/20 to-tertiary/30"></div>
            </div>
            
            <motion.div 
              className="w-4 h-4 bg-secondary rounded-full shadow-sm relative z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Typography variant="subheading" as="span" className="font-semibold text-primary whitespace-nowrap leading-none flex items-center relative z-10 bg-white/90 px-4 rounded-full">
              End-to-end podcast production for your business
            </Typography>
            <motion.div
              className="w-3 h-3 bg-tertiary rounded-full relative z-10"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* First metric card - Pipeline Guarantee */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-linear-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <TrophyIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="primary" 
                className="font-bold mb-4 text-2xl"
              >
                <AnimatedCounter value={100} suffix="%" isInView={isInView} />
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Pipeline Guarantee
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                We guarantee qualified leads in your pipeline within 90 days, or we work for free until we deliver results.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
          
          {/* Second metric card - Time Investment */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-linear-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <ClockIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="secondary" 
                className="font-bold mb-4 text-2xl"
              >
                <AnimatedCounter value={1} isInView={isInView} /> hour/week
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Your Time Investment
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                Just one hour per week of your time to conduct high-value interviews with your ideal prospects.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
          
          {/* Third metric card - Production Quality */}
          <motion.div 
            className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-linear-to-br from-primary via-secondary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <MicrophoneIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <Typography 
                variant="h3"
                color="primary" 
                className="font-bold mb-4 text-2xl"
              >
                <AnimatedCounter value={24} isInView={isInView} />/7
              </Typography>
              
              <Typography 
                variant="h4"
                color="primary" 
                className="font-semibold mb-3"
              >
                Expert Production
              </Typography>
              
              <Typography variant="body" color="gray" className="leading-relaxed">
                Professional editing, show notes, and distribution handled by our expert team around the clock.
              </Typography>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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
            whileHover={{ scale: 1.05 }}
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