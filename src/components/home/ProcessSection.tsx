'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faSearch, faUserCheck, faPodcast, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<string>('discovery-strategy');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const transitionTime = 600; // Faster transitions
  const visibleTime = 6000; // Slightly longer visible time
  
  const tabs = [
    { id: 'discovery-strategy', step: 'ONE', name: 'Discovery & Strategy', icon: faSearch },
    { id: 'guest-sourcing-qualification', step: 'TWO', name: 'Guest Prospecting & Qualification', icon: faUserCheck },
    { id: 'interview-content-production', step: 'THREE', name: 'Interview & Content Production', icon: faPodcast },
    { id: 'distribution-sales-handoff', step: 'FOUR', name: 'Distribution & Sales Handoff', icon: faShareAlt }
  ];
  
  const tabContent = {
    'discovery-strategy': {
      title: 'Discovery & Strategy',
      description: 'We kick off by deeply understanding your business, ideal client profile, and sales objectives to co-create a podcast strategy laser-focused on generating qualified B2B leads.',
      points: [
        'Collaborative B2B podcast strategy workshop',
        'Ideal Client Persona (ICP) refinement for targeted guest prospecting',
        'Content and interview planning to maximize lead generation opportunities',
        'Defining key performance indicators (KPIs) for sales pipeline impact'
      ]
    },
    'guest-sourcing-qualification': {
      title: 'Guest Prospecting & Qualification',
      description: 'Our unique approach involves identifying and inviting your ideal prospects to be guests on your show, followed by a qualification call with you to ensure perfect alignment.',
      points: [
        'Targeted prospect identification mirroring your Ideal Client Profile',
        'Personalized outreach to invite high-value potential customers as guests',
        'Facilitated pre-interview qualification call between you and the prospect',
        'Seamless scheduling and coordination for both you and your future guest'
      ]
    },
    'interview-content-production': {
      title: 'Interview & Content Production',
      description: 'We equip you with proven interview techniques for insightful conversations. After you record, our team expertly transforms the footage into a suite of compelling marketing assets.',
      points: [
        'Interview preparation: talk tracks for engaging dialogue, pain discovery, and expert positioning',
        'You host impactful interviews (virtual recording), then hand off the raw footage',
        'Professional audio & video editing, plus creation of clips, blog posts, LinkedIn content, etc.',
        'Meticulous quality control for all produced assets to ensure brand excellence'
      ]
    },
    'distribution-sales-handoff': {
      title: 'Distribution, Engagement & Sales Handoff',
      description: 'We strategically publish your content, empower guest promotion, and provide frameworks for you to seamlessly transition these warm conversations into your sales process.',
      points: [
        'Multi-platform publication of podcast episodes and all created assets',
        'Delivery of handcrafted content to guests, encouraging co-promotion and expanding reach',
        'Strategic follow-up email sequences to nurture guest relationships and initiate sales dialogues',
        'Clear handoff and actionable insights for your sales team to convert leads'
      ]
    }
  };

  // Set isMounted to true after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Navigate to the next or previous step with transition
  const navigate = (direction: 'next' | 'prev') => {
    if (!isMounted || isTransitioning) return;
    
    setIsTransitioning(true);
    setContentVisible(false);
    
    setTimeout(() => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      let nextIndex;
      
      if (direction === 'next') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }
      
      setActiveTab(tabs[nextIndex].id);
      
      setTimeout(() => {
        setContentVisible(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, transitionTime);
      }, 50);
    }, transitionTime);
  };
  
  // Manual tab switching with transition
  const handleTabClick = (tabId: string) => {
    if (!isMounted || isTransitioning || tabId === activeTab) return;
    
    setIsTransitioning(true);
    setContentVisible(false);
    
    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => {
        setContentVisible(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, transitionTime);
      }, 50);
    }, transitionTime);
  };
  
  // Auto-cycle through tabs - only run after component is mounted on client
  useEffect(() => {
    if (!isMounted || isTransitioning) return;
    
    autoPlayRef.current = setTimeout(() => {
      navigate('next');
    }, visibleTime);
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeTab, isTransitioning, isMounted]);

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
    <section id="process" className="py-20 md:py-28 relative bg-linear-to-br from-bg-light via-white to-primary-50 overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(42, 61, 69, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(231, 111, 81, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 40% 60%, rgba(88, 164, 176, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="px-4 py-2 bg-linear-to-r from-secondary/10 to-tertiary/10 text-secondary text-sm font-semibold rounded-full border border-secondary/20">
              🎯 Our Proven Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
            Built for Your <span className="font-extrabold bg-linear-to-r from-secondary via-secondary-dark to-secondary-light bg-clip-text text-transparent drop-shadow-sm">Business</span>.
          </h2>
          <p className="text-lg md:text-xl text-gray leading-relaxed max-w-3xl mx-auto">
            Every aspect of our podcast process is designed with your most valuable customers in mind. We work closely with each of our partners to ensure your success every step of the way.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl p-8 md:p-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary"
            variants={itemVariants}
          >
            Full Service from Start to Finish.
          </motion.h3>
          
          {/* Enhanced Desktop progress indicator */}
          <motion.div 
            className="hidden md:flex justify-between items-center mb-16 relative"
            variants={itemVariants}
          >
            {/* Progress line background */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
            {/* Animated progress line */}
            <motion.div 
              className="absolute top-8 left-0 h-1 bg-linear-to-r from-secondary to-tertiary rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length) * 100}%` 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative z-10 text-center font-medium group flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 shadow-lg ${
                    activeTab === tab.id 
                      ? 'bg-linear-to-br from-secondary to-secondary-dark text-white shadow-glow' 
                      : 'bg-white text-primary group-hover:bg-linear-to-br group-hover:from-secondary/10 group-hover:to-tertiary/10 border-2 border-gray-200 group-hover:border-secondary/30'
                  }`}
                  animate={activeTab === tab.id ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-xl" />
                </motion.div>
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-secondary' : 'text-primary group-hover:text-secondary/80'
                }`}>
                  STEP {tab.step}
                </span>
                <span className={`text-sm transition-colors duration-300 max-w-32 leading-tight ${
                  activeTab === tab.id ? 'text-primary font-medium' : 'text-gray group-hover:text-primary'
                }`}>
                  {tab.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Enhanced Content container with fixed height */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 20
              }}
              transition={{ duration: transitionTime / 1000, ease: "easeInOut" }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Mobile step indicator with navigation */}
                <div className="md:hidden mb-8 flex items-center justify-between">
                  <motion.button 
                    onClick={() => navigate('prev')} 
                    disabled={isTransitioning}
                    aria-label="Previous Step"
                    className={`w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-200 ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary hover:border-secondary/30 transition-all duration-300'
                    }`}
                    whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                    whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </motion.button>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-secondary mb-1">STEP {tabs.find(tab => tab.id === activeTab)?.step}</span>
                    <div className="flex gap-2">
                      {tabs.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === tabs.findIndex(tab => tab.id === activeTab) 
                              ? 'bg-secondary w-6' 
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <motion.button 
                    onClick={() => navigate('next')} 
                    disabled={isTransitioning}
                    aria-label="Next Step"
                    className={`w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-200 ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary hover:border-secondary/30 transition-all duration-300'
                    }`}
                    whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                    whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </motion.button>
                </div>
                
                {/* Enhanced content header */}
                <div className="text-center md:text-left mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <motion.div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-linear-to-br from-secondary to-secondary-dark flex items-center justify-center mr-4 shadow-lg"
                    >
                      <FontAwesomeIcon icon={tabs.find(t => t.id === activeTab)!.icon} className="text-white text-xl md:text-2xl" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">
                        {tabContent[activeTab as keyof typeof tabContent].title}
                      </h3>
                      <div className="w-16 h-1 bg-linear-to-r from-secondary to-tertiary rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-gray leading-relaxed text-lg mb-8 max-w-3xl mx-auto md:mx-0">
                    {tabContent[activeTab as keyof typeof tabContent].description}
                  </p>
                </div>
                
                {/* Enhanced feature points grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start p-4 bg-white/80 rounded-xl border border-gray-100 hover:border-secondary/20 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded-full bg-linear-to-br from-secondary to-tertiary flex items-center justify-center mr-4 flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.03 }}
                      >
                        <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                      </motion.div>
                      <span className="text-primary leading-relaxed font-medium">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection; 