'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faSearch, faUserCheck, faPodcast, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<string>('discovery-strategy');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTime = 1000; // Transition time in milliseconds - slowed down from 600ms to 1000ms
  const visibleTime = 5000; // Time content is fully visible in milliseconds
  
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
    
    // Wait for fade out transition to complete
    setTimeout(() => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      let nextIndex;
      
      if (direction === 'next') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }
      
      setActiveTab(tabs[nextIndex].id);
      
      // Wait a small amount of time to ensure the DOM has updated
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

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-bg-light via-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary"> Built for Your Business.
          </h2>
          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto">
            Every aspect of our podcast process is designed with your most valuable customers in mind. We work closely with each of our partners to ensure your success every step of the way.</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-8 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
            Full Service from Start to Finish.
          </h3>
          
          {/* Desktop progress indicator - hidden on mobile */}
          <div className="hidden md:flex justify-between items-center mb-12 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="text-center font-medium flex-1 group"
              >
                <span 
                  className={`transition-all duration-1000 ease-in-out flex flex-col items-center justify-center min-h-[48px] ${
                    activeTab === tab.id ? 'text-secondary font-bold' : 'text-primary group-hover:text-secondary/80'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mb-2 text-xl" />
                  {tab.name}
                </span>
                <div className={`h-1 mt-2 rounded transition-all duration-1000 ease-in-out ${
                  activeTab === tab.id ? 'bg-secondary' : 'bg-gray-200 group-hover:bg-secondary/30'
                }`}></div>
              </button>
            ))}
          </div>
          
          {/* Content container with navigation */}
          <div className="relative">
            {/* Content area - now full width */}
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
              <div className={`max-w-3xl mx-auto transition-all duration-1000 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Step indicator with navigation arrows on mobile */}
                <div className="mb-6 flex items-center md:block">
                  {/* Left arrow - mobile only */}
                  <button 
                    onClick={() => navigate('prev')} 
                    disabled={isTransitioning}
                    aria-label="Previous Step"
                    className={`md:hidden w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary transition-colors'
                    }`}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  
                  {/* Centered step indicator */}
                  <span className="text-sm font-bold text-secondary flex-grow text-center">STEP {tabs.find(tab => tab.id === activeTab)?.step}</span>
                  
                  {/* Right arrow - mobile only */}
                  <button 
                    onClick={() => navigate('next')} 
                    disabled={isTransitioning}
                    aria-label="Next Step"
                    className={`md:hidden w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary transition-colors'
                    }`}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary flex items-center">
                  <FontAwesomeIcon icon={tabs.find(t => t.id === activeTab)!.icon} className="mr-3 text-secondary opacity-80 text-2xl" />
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                
                <p className="text-gray leading-relaxed mb-6">
                  {tabContent[activeTab as keyof typeof tabContent].description}
                </p>
                
                <ul className="space-y-4 grid md:grid-cols-2 md:gap-x-8 md:gap-y-4 md:space-y-0">
                  {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-secondary mt-1 mr-3 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 