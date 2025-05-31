'use client';

import React, { useEffect, useState, useRef } from 'react';
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

// Add scrollToSection function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
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
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Results That Matter: <span className="font-extrabold text-secondary">Revenue, Not Downloads</span>.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 text-white/90">
            Our sales development system delivers measurable business results through strategic relationship building. Compare our approach to traditional cold calling and generic outreach methods.
          </p>
          
          {/* Competitive Comparison Bar */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-red-300 text-sm font-medium mb-1">Traditional Cold Calling</div>
                <div className="text-white/70 text-lg">3% Response Rate</div>
                <div className="text-white/60 text-sm">5-minute defensive conversations</div>
              </div>
              <div>
                <div className="text-yellow-300 text-sm font-medium mb-1">Email Automation</div>
                <div className="text-white/70 text-lg">1-2% Open Rates</div>
                <div className="text-white/60 text-sm">Generic, easily ignored</div>
              </div>
              <div>
                <div className="text-secondary text-sm font-medium mb-1">Our Strategic Approach</div>
                <div className="text-white text-xl font-bold">30% Response Rate</div>
                <div className="text-secondary text-sm font-medium">45-minute strategic conversations</div>
              </div>
            </div>
          </div>

          {/* Success metrics with sales context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">95%</div>
              <div className="text-white/90 font-medium mb-2">Client Success Rate</div>
              <div className="text-sm text-white/70">Clients book qualified sales meetings within 60 days</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">40-60%</div>
              <div className="text-white/90 font-medium mb-2">Meeting Acceptance Rate</div>
              <div className="text-sm text-white/70">vs. 2-5% with traditional cold outreach</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              variants={itemVariants}
            >
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">3x</div>
              <div className="text-white/90 font-medium mb-2">Average ROI</div>
              <div className="text-sm text-white/70">Within 90 days of strategic sales conversations</div>
            </motion.div>
          </div>

          <motion.div 
            className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm px-3 md:px-6 py-2 md:py-3 rounded-full border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('what-we-do')}
          >
            <Typography variant="subheading" as="span" className="font-semibold text-white text-center md:whitespace-nowrap leading-tight md:leading-none flex items-center relative z-10 bg-white/90 px-3 md:px-4 rounded-full text-sm md:text-base">
              <span className="md:hidden">See Our Sales Development Process.</span>
              <span className="hidden md:inline">See How Our System Delivered 2 Deals from 8 Strategic Conversations</span>
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