'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faHandshake, faMicrophone, faEnvelopeOpenText, faClipboardQuestion, faHexagonNodes } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Feature card data to ensure consistency
const features = [
  {
    icon: faEnvelopeOpenText,
    title: "Unparalleled Response Rates",
    description: "Industry-leading outreach that C Suite Executives are excited to respond to. Get your foot in the door, and get the conversation started.",
    color: "from-secondary to-secondary-dark"
  },
  {
    icon: faUserCheck,
    title: "Customer Qualification",
    description: "Multiple qualification steps ensure every guest is a qualified decision maker - and that they're ready to buy.",
    color: "from-tertiary to-tertiary-dark"
  },
  {
    icon: faClipboardQuestion,
    title: "Seamless Discovery",
    description: "Tailored interview questions that uncover your guests' exact pain points - and show how your product can help.",
    color: "from-primary to-primary-dark"
  },
  {
    icon: faHandshake,
    title: "Impactful Conversations",
    description: "Hour long conversations that create lasting business relationships - and position you as a trusted advisor.",
    color: "from-secondary to-secondary-dark"
  },
  {
    icon: faHexagonNodes,
    title: "Dozens of Touchpoints",
    description: "Our process creates dozens of touchpoints that keep you top of mind for months after the interview.",
    color: "from-tertiary to-tertiary-dark"
  },
  {
    icon: faMicrophone,
    title: "World-Class Production Quality",
    description: "High-quality assets that strengthen your brand, and clips that you (and your guests) are proud to share on social.",
    color: "from-primary to-primary-dark"
  }
];

const FeaturesSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section id="features" className="py-20 md:py-28 relative bg-linear-to-b from-white via-primary-50 to-white overflow-hidden">
      {/* Decorative gradient lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-secondary/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        
        {/* Header Section with enhanced visual hierarchy */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-6">
            {/* Enhanced badge with gradient background */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-linear-to-r from-secondary/10 to-tertiary/10 text-secondary text-sm font-semibold rounded-full border border-secondary/20">
                  🎯 Sales-First Approach
                </span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Built for <span className="font-extrabold bg-linear-to-r from-secondary via-secondary-dark to-secondary-light bg-clip-text text-transparent drop-shadow-sm">Sales</span> - Not Marketing.
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray leading-relaxed max-w-4xl mx-auto">
            This isn't just another marketing podcast. Our system is designed specifically to generate qualified leads, 
            nurture relationships with potential clients, and convert conversations into revenue.
          </p>
        </div>

        {/* Features Grid with enhanced cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-secondary/20 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-2"
            >
              {/* Animated top border */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${feature.color} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 rounded-t-2xl`}></div>
              
              {/* Background gradient overlay on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon with enhanced styling */}
              <div 
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-secondary group-hover:text-white transition-all duration-500 shadow-md opacity-20 group-hover:opacity-100`}
              >
                <FontAwesomeIcon icon={feature.icon} className="w-8 h-8" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-primary-dark transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-linear-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA Section with better visual separation */}
        <div className="relative">
          {/* Decorative top line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-linear-to-r from-secondary to-tertiary"></div>
          
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xl relative overflow-hidden">
            {/* Enhanced headline */}
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              B2B Podcasts - <span className="font-extrabold bg-linear-to-r from-secondary via-tertiary-dark to-secondary-dark bg-clip-text text-transparent drop-shadow-sm">Reimagined</span>.
            </h3>
            
            <p className="text-lg text-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop treating podcasting like a marketing experiment. Start using it as a sophisticated sales tool that generates measurable ROI from day one.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-linear-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-strong hover:shadow-glow transform hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-secondary/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l4 4 4-4m0-6l-4-4-4 4" />
                </svg>
                Start Building Your Sales Machine
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 