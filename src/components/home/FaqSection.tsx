'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Measure all answer heights on mount and resize
  useEffect(() => {
    const updateHeights = () => {
      const newHeights = answerRefs.current.map((ref) => 
        ref ? ref.scrollHeight : 0
      );
      setHeights(newHeights);
    };
    
    updateHeights();
    window.addEventListener('resize', updateHeights);
    
    return () => window.removeEventListener('resize', updateHeights);
  }, []);
  
  const faqItems = [
    {
      question: "What kind of ROI can we expect?",
      answer: "Our clients average 3x ROI within 90 days with a 95% success rate. ROI is measured by qualified leads, shorter sales cycles, and new revenue. With our sales-first approach targeting high-value B2B deals, even a few conversions deliver significant returns."
    },
    {
      question: "Do I need a large audience for this to work?",
      answer: "Absolutely not. Our 'Podcast for Sales' system works without any audience. The primary value comes from strategic interactions with guests (your potential clients) and the relationship-building process itself, not downloads or listener numbers."
    },
    {
      question: "We tried podcasting, but it didn't generate leads. How are you different?",
      answer: "Most podcasts focus on audience-building and content marketing. Our proprietary 'Podcast for Sales' system is designed specifically to fit within your existing sales processes with three key differentiators: sales-first interview strategy with soft-sell talk tracks, obsessive focus on guest experience including thank you content packages, and tailored follow-up campaigns that keep prospects engaged."
    },
    {
      question: "What exactly is your 'Podcast for Sales' system?",
      answer: "Our 'Podcast for Sales' system is a sales-first approach that uses executive interviews for direct prospect outreach and relationship building. Unlike traditional podcasting, it's designed to integrate seamlessly with your existing sales processes and marketing funnels, effective even with zero audience."
    },
    {
      question: "What's involved in your system? What do you handle vs. what do we do?",
      answer: "We provide a comprehensive done-for-you service: sales-first strategy development, prospect identification and outreach, interview preparation with soft-sell talk tracks, professional recording/editing, guest thank you content packages, and tailored follow-up campaigns. Your main role is approving qualified prospects and conducting the strategic interviews."
    },
    {
      question: "Who is an ideal guest for a 'Podcast for Sales' approach?",
      answer: "Decision-makers at companies fitting your ideal customer profile (e.g., CEOs, CMOs in B2B SaaS). We help you target these executives strategically, making the interview a key sales touchpoint and relationship-building opportunity with qualified prospects."
    },
    {
      question: "How do you help turn podcast guests into clients?",
      answer: "We structure interviews with soft-sell talk tracks to build rapport and uncover needs naturally. Then we create premium thank you content packages that serve as powerful, non-salesy follow-up tools, combined with tailored follow-up campaigns that keep you top-of-mind and create multiple touchpoints for your sales process."
    },
    {
      question: "How much of my team's time will this take per week/month?",
      answer: "Minimal time investment. After initial strategy setup (a few hours total), expect ~2-4 hours/month for 2 episodes, or ~4-8 hours/month for 4 episodes, mainly for interview prep and recording. We handle all prospect outreach, content production, and follow-up campaigns."
    },
    {
      question: "How long until we see results from this approach?",
      answer: "With our sales-first approach, expect positive signals (e.g., better engagement from target accounts, warmer prospect relationships) within 2-3 months post-launch. Converting leads to sales depends on your typical sales cycle, but the relationship foundation is built immediately."
    },
    {
      question: "We're a B2B SaaS company. How does this help our sales process?",
      answer: "Our 'Podcast for Sales' system is perfect for B2B SaaS. It provides a compelling reason to connect with C-level executives in target accounts, showcases thought leadership naturally, builds authentic relationships, and creates premium content that's far more effective than cold outreach in moving prospects through your sales funnel."
    }
  ];

  // Construct FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-linear-to-br from-primary-50 via-bg-light to-white">
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary inline-block pb-2 border-b-2 border-secondary">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mt-4">
            Got questions? We've got answers. Discover how our podcast system directly addresses your business needs.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-hidden active:bg-gray-50 transition-colors duration-200"
                aria-expanded={activeIndex === index}
              >
                <span className="font-bold">{item.question}</span>
                <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                  <FontAwesomeIcon icon={faChevronDown} className={activeIndex === index ? "text-secondary" : "text-gray-dark"} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div 
                      ref={(el) => {
                        answerRefs.current[index] = el;
                      }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray leading-relaxed mb-4">
            Need more help? Get in touch and our team will reach out.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 active:scale-98 hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 