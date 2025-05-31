'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faSearch, faUserCheck, faPodcast, faShareAlt, faUser, faLightbulb, faChartLine, faEnvelope, faHandshake, faCheckCircle, faMicrophone, faVideo, faGift, faRocket, faChartBar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView, PanInfo } from 'framer-motion';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<string>('discovery-strategy');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const transitionTime = 400; // Faster transitions for mobile
  const visibleTime = 8000; // Longer visible time on mobile
  
  const tabs = [
    { id: 'discovery-strategy', step: 'ONE', name: 'Prospect Intelligence & Sales Strategy', shortName: 'Strategy', icon: faSearch },
    { id: 'guest-sourcing-qualification', step: 'TWO', name: 'Executive Outreach & Meeting Booking', shortName: 'Outreach', icon: faUserCheck },
    { id: 'interview-content-production', step: 'THREE', name: 'Strategic Sales Conversations & Content Creation', shortName: 'Conversations', icon: faPodcast },
    { id: 'distribution-sales-handoff', step: 'FOUR', name: 'Systematic Follow-up & Deal Advancement', shortName: 'Follow-up', icon: faShareAlt }
  ];
  
  const tabContent = {
    'discovery-strategy': {
      title: 'Prospect Intelligence & Sales Strategy',
      description: 'We collaborate with your team to identify your ideal prospects and develop a comprehensive sales strategy that positions you for premium conversations, not commodity outreach.',
      features: [
        { 
          icon: faUser, 
          title: 'Ideal Prospect Mapping', 
          description: 'Unlike generic lead lists, we create detailed prospect profiles of C-suite executives who fit your exact ideal customer profile and have decision-making authority.'
        },
        { 
          icon: faLightbulb, 
          title: 'Strategic Conversation Framework', 
          description: 'We develop talk tracks that position you as a strategic partner, not just another vendor—the key difference between our 30% response rate vs. traditional 3% cold calling rates.'
        },
        { 
          icon: faChartLine, 
          title: 'Sales Process Integration', 
          description: 'We map our executive access system directly into your existing CRM and sales processes, ensuring seamless lead handoff and pipeline tracking.'
        }
      ],
      competitive_advantage: "While others use generic outreach lists, we target decision-makers with strategic positioning that executives actually want to engage with."
    },
    'guest-sourcing-qualification': {
      title: 'Executive Outreach & Meeting Booking',
      description: 'Our experienced sales development team conducts targeted outreach to secure strategic meetings with your ideal prospects using our premium positioning approach.',
      features: [
        { 
          icon: faEnvelope, 
          title: 'Premium Executive Outreach', 
          description: 'We position podcast interviews as thought leadership opportunities, giving executives a compelling reason to say yes—achieving 30% response rates vs. 3% for cold calls.'
        },
        { 
          icon: faHandshake, 
          title: 'Strategic Meeting Booking', 
          description: 'We schedule 45-minute strategic conversations, not quick sales pitches. This format allows for relationship building and genuine value exchange with decision-makers.'
        },
        { 
          icon: faCheckCircle, 
          title: 'Qualification & Preparation', 
          description: 'Every booked meeting includes prospect research, conversation preparation, and strategic talking points to maximize your success in these executive conversations.'
        }
      ],
      competitive_advantage: "Traditional appointment setters get defensive 5-minute calls. We secure 45-minute strategic conversations with executives who are excited to participate."
    },
    'interview-content-production': {
      title: 'Strategic Sales Conversations & Content Creation',
      description: 'You conduct strategic sales conversations with qualified prospects while we handle all the professional content production and relationship advancement.',
      features: [
        { 
          icon: faMicrophone, 
          title: 'Executive Strategic Conversations', 
          description: 'Conduct 45-minute strategic discussions with C-suite executives using our proven conversation frameworks that naturally uncover needs and build relationships.'
        },
        { 
          icon: faVideo, 
          title: 'Professional Content Production', 
          description: 'We handle all recording, editing, and content creation—providing professional podcast episodes that position you as a thought leader in your industry.'
        },
        { 
          icon: faGift, 
          title: 'Premium Thank You Packages', 
          description: 'Each guest receives a professional content package including video highlights, quote graphics, and social media assets—creating ongoing goodwill and relationship value.'
        }
      ],
      competitive_advantage: "While others interrupt with cold calls, we create valuable experiences that prospects appreciate and remember—building relationships, not resistance."
    },
    'distribution-sales-handoff': {
      title: 'Systematic Follow-up & Deal Advancement',
      description: 'We manage ongoing relationship nurturing and systematic follow-up to advance prospects through your sales pipeline until they\'re ready to buy.',
      features: [
        { 
          icon: faRocket, 
          title: 'Tailored Follow-up Campaigns', 
          description: 'Custom nurturing sequences based on conversation insights, keeping prospects engaged and moving them through your sales pipeline with strategic touchpoints.'
        },
        { 
          icon: faChartBar, 
          title: 'Pipeline Integration & Tracking', 
          description: 'Full CRM integration with detailed prospect scoring, conversation insights, and pipeline tracking to measure relationship advancement and conversion opportunities.'
        },
        { 
          icon: faTrophy, 
          title: 'Sales Process Optimization', 
          description: 'Continuous refinement of messaging, targeting, and conversation strategies based on performance data to maximize your conversion rates and deal advancement.'
        }
      ],
      competitive_advantage: "Traditional lead gen stops at the handoff. We continue nurturing relationships until prospects are ready to buy—providing true sales development, not just lead generation."
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

  // Handle swipe gestures on mobile
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate('prev');
    } else if (info.offset.x < -threshold) {
      navigate('next');
    }
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
    <section id="process" className="py-16 md:py-28 relative bg-linear-to-br from-bg-light via-white to-primary-50 overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(42, 61, 69, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(231, 111, 81, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 40% 60%, rgba(88, 164, 176, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-secondary/10 to-secondary-50 text-dark text-xs md:text-sm font-semibold rounded-full border border-secondary/20">
              🎯 Our Proven Sales Process
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary leading-tight">
            Built for Your <span className="font-extrabold text-secondary">Sales Pipeline</span>.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray leading-relaxed max-w-3xl mx-auto px-4 md:px-0">
            Every aspect of our sales development process is designed to secure meetings with your most valuable prospects. We work closely with each client to ensure qualified conversations that advance deals through your pipeline.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-gray-200/50 shadow-xl p-4 md:p-8 lg:p-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 text-primary px-4"
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
              className="absolute top-8 left-0 h-1 bg-secondary rounded-full"
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
          
          {/* Mobile-optimized content container */}
          <div className="relative">
            <motion.div 
              className="overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ 
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 20
              }}
              transition={{ duration: transitionTime / 1000, ease: "easeInOut" }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Modern Mobile Header with Step Navigation */}
                <div className="md:hidden mb-8">
                  {/* Step Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-secondary">
                        STEP {tabs.find(tab => tab.id === activeTab)?.step}
                      </span>
                      <span className="text-sm text-gray">
                        {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
                      </span>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute left-0 top-0 h-full bg-linear-to-r from-secondary to-secondary-dark rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: `${((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length) * 100}%` 
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.button 
                      onClick={() => navigate('prev')} 
                      disabled={isTransitioning}
                      aria-label="Previous Step"
                      className={`w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-200 ${
                        isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary hover:border-secondary/30 transition-all duration-300'
                      }`}
                      whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                      whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                    </motion.button>
                    
                    {/* Current Step Indicator */}
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-linear-to-br from-secondary to-secondary-dark flex items-center justify-center shadow-lg mb-2"
                        animate={{ 
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <FontAwesomeIcon icon={tabs.find(t => t.id === activeTab)!.icon} className="text-white text-xl" />
                      </motion.div>
                      <span className="text-sm font-medium text-primary text-center leading-tight max-w-24">
                        {tabs.find(tab => tab.id === activeTab)?.shortName}
                      </span>
                    </div>
                    
                    <motion.button 
                      onClick={() => navigate('next')} 
                      disabled={isTransitioning}
                      aria-label="Next Step"
                      className={`w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-200 ${
                        isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary hover:border-secondary/30 transition-all duration-300'
                      }`}
                      whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                      whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                    </motion.button>
                  </div>

                  {/* Swipe Indicator */}
                  <div className="text-center mb-6">
                    <p className="text-xs text-gray">Swipe left or right to navigate</p>
                  </div>
                </div>
                
                {/* Enhanced content header */}
                <div className="text-center md:text-left mb-8">
                  <div className="flex items-center justify-center md:justify-start mb-6">
                    <motion.div 
                      className="hidden md:flex w-16 h-16 rounded-2xl bg-linear-to-br from-secondary to-secondary-dark items-center justify-center mr-4 shadow-lg"
                    >
                      <FontAwesomeIcon icon={tabs.find(t => t.id === activeTab)!.icon} className="text-white text-2xl" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
                        {tabContent[activeTab as keyof typeof tabContent].title}
                      </h3>
                      <div className="w-16 h-1 bg-secondary rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                  
                  <p className="text-gray leading-relaxed text-base md:text-lg mb-8 max-w-3xl mx-auto md:mx-0">
                    {tabContent[activeTab as keyof typeof tabContent].description}
                  </p>
                </div>
                
                {/* Enhanced feature points - Mobile-first grid */}
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                  {tabContent[activeTab as keyof typeof tabContent].features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-lg border border-white/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="mt-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FontAwesomeIcon icon={feature.icon} className="text-white text-sm md:text-xs" />
                      </motion.div>
                      <span className="text-primary leading-relaxed font-medium text-sm md:text-base">{feature.description}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Competitive Advantage Highlight */}
                <motion.div
                  className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">🎯</span>
                    </div>
                    <div>
                      <h4 className="text-primary font-semibold text-sm mb-1">Competitive Advantage</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {tabContent[activeTab as keyof typeof tabContent].competitive_advantage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection; 