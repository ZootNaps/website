'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faHandshake, faMicrophone, faEnvelopeOpenText, faClipboardQuestion, faHexagonNodes } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// What We Do items data to ensure consistency
const whatWeDoItems = [
  {
    icon: faEnvelopeOpenText,
    title: "Executive Outreach & Meeting Booking",
    description: "Your dedicated sales development manager identifies and reaches out to your ideal prospects with industry-leading outreach that gets C-Suite executives to say YES to strategic conversations. Every interaction is strategically designed to secure qualified sales meetings.",
    color: "secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20"
  },
  {
    icon: faUserCheck,
    title: "Strategic Sales Conversations & Content Creation",
    description: "Multiple qualification steps ensure every guest is a qualified decision maker ready to buy. We coach you on soft-sell interview techniques that naturally uncover pain points while positioning your solutions - creating valuable content as a byproduct.",
    color: "primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: faClipboardQuestion,
    title: "Research & Prospect Intelligence",
    description: "We research your exact ideal prospects and create custom conversation roadmaps that enable seamless discovery. Know exactly who you're talking to and what challenges you should explore before every strategic conversation.",
    color: "tertiary",
    bgColor: "bg-tertiary/10",
    borderColor: "border-tertiary/20"
  },
  {
    icon: faHandshake,
    title: "Premium Follow-Up Content & Relationship Building",
    description: "We create premium thank you content packages that strengthen your relationship with potential customers. High-quality assets that both you and your prospects are proud to associate with, opening doors for continued conversations.",
    color: "secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20"
  },
  {
    icon: faHexagonNodes,
    title: "Systematic Nurture & Deal Advancement",
    description: "Structured follow-up campaigns create multiple touchpoints to keep you top of mind and advance prospects through your sales pipeline. From post-conversation thank you to publication updates - keeping your sales cycle active.",
    color: "primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: faMicrophone,
    title: "Professional Content Publishing (Bonus)",
    description: "As a bonus, we publish your strategic conversations as a professional podcast. This positions you as a thought leader while providing additional touchpoints with prospects and referral sources - but the primary value is the sales conversations themselves.",
    color: "tertiary",
    bgColor: "bg-tertiary/10",
    borderColor: "border-tertiary/20"
  }
];

const WhatWeDoSection = () => {
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
    <section id="what-we-do" className="py-20 md:py-28 relative bg-linear-to-b from-white via-primary-50 to-white overflow-hidden">
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
                <span className="px-4 py-2 bg-linear-to-r from-secondary/10 to-secondary-50 text-dark text-md font-semibold rounded-full border border-secondary/20">
                  What We Do
                </span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Sales Development System <span className="font-extrabold text-secondary">Disguised as Podcasting</span>.
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray leading-relaxed max-w-4xl mx-auto">
            Our system gets you strategic sales meetings with decision-makers who normally ignore your calls. We systematically research, approach, and nurture your ideal prospects until they're ready to buy. The podcast is just the vehicle - the primary value is executive access and relationship building.
          </p>
        </div>

        {/* What We Do Grid with enhanced cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {whatWeDoItems.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 border border-gray-100 hover:${item.borderColor} transition-all duration-500 hover:shadow-xl hover:-translate-y-2`}
              style={{
                '--hover-shadow': `rgba(${
                  item.color === 'secondary' ? '231, 111, 81' : 
                  item.color === 'primary' ? '42, 61, 69' : 
                  '88, 164, 176'
                }, 0.1)`
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                const shadowColor = item.color === 'secondary' ? 'rgba(231, 111, 81, 0.1)' : 
                                  item.color === 'primary' ? 'rgba(42, 61, 69, 0.1)' : 
                                  'rgba(88, 164, 176, 0.1)';
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Animated top border */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-${item.color} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 rounded-t-2xl`}></div>
              
              {/* Background subtle overlay on hover */}
              <div className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon with clean styling */}
              <div 
                className={`w-16 h-16 rounded-2xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center text-${item.color} transition-all duration-500 shadow-sm mb-6`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-8 h-8" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-primary-dark transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
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
              Executive Access - <span className="font-extrabold text-secondary">Without the Gatekeepers</span>.
            </h3>
            
            <p className="text-lg text-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              While others make cold calls and get ignored, you'll be having strategic conversations with your toughest prospects.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-linear-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-strong hover:shadow-glow transform hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-secondary/50"
              >
                Book a Strategy Call Today
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection; 