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
    <section id="features" className="py-20 md:py-28 relative bg-gradient-to-b from-white via-primary-50 to-white overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(42, 61, 69, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(231, 111, 81, 0.05) 0%, transparent 50%)',
           }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-secondary/10 to-tertiary/10 text-secondary text-sm font-semibold rounded-full border border-secondary/20">
              Our Approach
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-primary leading-tight">
            Built for <span className="font-extrabold bg-gradient-to-r from-secondary via-secondary-dark to-secondary-light bg-clip-text text-transparent drop-shadow-sm">Sales</span> - Not Marketing.
          </h2>
          {/* Debug: Test gradient text with standard colors */}
          <div className="text-center mb-4 opacity-50">
            <span className="text-sm">Debug: </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">Standard Colors</span>
            <span className="text-sm"> vs </span>
            <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent font-bold">Custom Colors</span>
          </div>
          <p className="text-xl text-gray leading-relaxed max-w-3xl mx-auto">
            Every step of our process is purpose built for sales - creating valuable touchpoints and customer interactions that drive real revenue.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 border-2 border-gray-100 rounded-2xl hover:border-secondary/30 hover:shadow-strong transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                {/* Enhanced accent gradient border with animation */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 rounded-t-2xl`}></div>
                
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                
                <div className="flex items-start h-full relative z-10">
                  <div className="mr-6 flex-shrink-0 pt-1">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-secondary group-hover:text-white transition-all duration-500 shadow-md opacity-20 group-hover:opacity-100`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FontAwesomeIcon icon={feature.icon} className="text-2xl transition-colors duration-500" aria-hidden="true" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary leading-tight mb-4 group-hover:text-primary-dark transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray leading-relaxed text-base group-hover:text-gray-dark transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Decorative corner element */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 md:mt-24 text-center relative py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Enhanced decorative divider */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-primary max-w-4xl mx-auto leading-tight">
            B2B Podcasts - <span className="font-extrabold bg-gradient-to-r from-secondary via-tertiary-dark to-secondary-dark bg-clip-text text-transparent drop-shadow-sm">Reimagined</span>.
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto mb-10 leading-relaxed">
            Our sales-first approach prioritizes what salespeople care about - and what most agencies miss. Want to see it in action? 
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-strong hover:shadow-glow transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              Book a Demo Today
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 