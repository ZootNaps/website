'use client';

import { useState, useEffect, useRef } from 'react';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<string>('discovery');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTime = 1000; // Transition time in milliseconds - slowed down from 600ms to 1000ms
  const visibleTime = 5000; // Time content is fully visible in milliseconds
  
  const tabs = [
    { id: 'discovery', step: 'ONE', name: 'Discovery' },
    { id: 'strategy', step: 'TWO', name: 'Strategy' },
    { id: 'implementation', step: 'THREE', name: 'Implementation' },
    { id: 'optimization', step: 'FOUR', name: 'Optimization' }
  ];
  
  const tabContent = {
    discovery: {
      title: 'Discovery',
      description: 'We begin by understanding your business, challenges, and goals through in-depth consultations.',
      points: [
        'Initial consultation to understand your needs',
        'Analysis of your current situation and challenges',
        'Identification of key objectives and success metrics',
        'Preliminary recommendations based on findings'
      ]
    },
    strategy: {
      title: 'Strategy',
      description: 'We develop a customized plan of action to address your specific challenges and achieve your goals.',
      points: [
        'Detailed strategic planning sessions',
        'Prioritization of initiatives and objectives',
        'Resource allocation and timeline planning',
        'Risk assessment and mitigation strategies'
      ]
    },
    implementation: {
      title: 'Implementation',
      description: 'We execute the agreed-upon strategy with precision and attention to detail.',
      points: [
        'Systematic execution of the strategic plan',
        'Regular progress updates and stakeholder communication',
        'Agile approach to adapt to changing requirements',
        'Continuous quality assurance and testing'
      ]
    },
    optimization: {
      title: 'Optimization',
      description: 'We continuously monitor and refine our approach to maximize results and ROI.',
      points: [
        'Ongoing performance analysis and reporting',
        'Identification of improvement opportunities',
        'Refinement of strategies based on results',
        'Long-term support and maintenance'
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
    <section id="process" className="py-20 bg-light border border-gray-200 rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Sales-First Process.</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
          From outreach to publication, and everything in between - we're more than just podcast </p>
          <p>See why our sales-first approach puts our podcasts in a league of their own.
          </p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-8 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
            The process fueling your story.
          </h3>
          
          {/* Desktop progress indicator - hidden on mobile */}
          <div className="hidden md:flex justify-between items-center mb-12 px-8">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="text-center font-medium flex-1"
              >
                <span 
                  className={`transition-all duration-1000 ease-in-out ${
                    activeTab === tab.id ? 'text-secondary font-bold' : 'text-primary'
                  }`}
                >
                  {tab.name}
                </span>
                <div className={`h-1 mt-2 rounded transition-all duration-1000 ease-in-out ${
                  activeTab === tab.id ? 'bg-secondary' : 'bg-gray-200'
                }`}></div>
              </button>
            ))}
          </div>
          
          {/* Content container with navigation */}
          <div className="relative">
            {/* Content area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 rounded-lg shadow-sm">
              {/* Left side: Content */}
              <div className={`transition-all duration-1000 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="md:hidden mb-6">
                  <span className="text-sm font-bold text-secondary">STEP {tabs.find(tab => tab.id === activeTab)?.step}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                
                <p className="text-gray mb-6">
                  {tabContent[activeTab as keyof typeof tabContent].description}
                </p>
                
                <ul className="space-y-4">
                  {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-secondary mt-1 mr-3 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Right side: Illustration */}
              <div className={`relative bg-light rounded-lg flex items-center justify-center p-8 h-80 transition-all duration-1000 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Mobile navigation buttons - positioned on the illustration */}
                <div className="md:hidden flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-4 w-full">
                  <button 
                    onClick={() => navigate('prev')} 
                    disabled={isTransitioning}
                    className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary transition-colors'
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={() => navigate('next')} 
                    disabled={isTransitioning}
                    className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                      isTransitioning ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-secondary transition-colors'
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <span className="text-gray-dark font-medium">Process Illustration {tabs.findIndex(tab => tab.id === activeTab) + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 