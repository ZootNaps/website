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
      answer: "ROI is measured by qualified leads, shorter sales cycles, and new revenue. With a focus on high-value B2B deals (e.g., $15k+ ACV), even a few conversions deliver significant returns."
    },
    {
      question: "Do I need a large audience for this to work?",
      answer: "No. The primary value comes from strategic interactions with guests (potential clients) and using the content in direct sales engagement, making it effective even with zero initial listeners."
    },
    {
      question: "We tried podcasting, but it didn't generate leads. How are you different?",
      answer: "Many podcasts lack sales integration. Our proprietary \"B2B Podcast for Sales\" system is designed to fit within your existing sales process and marketing funnels. From guest outreach strategy, interview strategy, and post-interview nurture campaigns."
    },
    {
      question: "What is a \"Podcast for Sales\" vs. a regular B2B podcast?",
      answer: "Our \"Podcast for Sales\" is a B2B client acquisition tool. Unlike typical podcasts, it uses executive interviews for direct outreach and lead qualification, effective even without a large audience."
    },
    {
      question: "What's involved in your system? What do you handle vs. what do we do?",
      answer: "We offer a done-for-you service: strategy, guest identification support, prep, professional recording/editing, and sales leverage guidance. Your main role is approving guests and conducting interviews."
    },
    {
      question: "Who is an ideal guest for a \"Podcast for Sales\"?",
      answer: "Decision-makers at companies fitting your ideal customer profile (e.g., CEOs, CMOs in B2B SaaS). We help you target these executives, making the interview a key sales touchpoint."
    },
    {
      question: "How do you help turn podcast guests into clients?",
      answer: "We structure interviews to build rapport and uncover needs. The high-quality content then serves as a powerful, non-salesy follow-up, creating a warm foundation for sales conversations with promising guests."
    },
    {
      question: "How much of my team's time will this take per week/month?",
      answer: "Minimal. After initial setup (a few hours total), expect ~2-4 hours/month for 2 episodes, or ~4-8 hours/month for 4 episodes, mainly for interview prep and recording. We handle the rest."
    },
    {
      question: "How long until we see results from this podcast lead generation service?",
      answer: "Expect positive signals (e.g., better engagement from target accounts) within 2-3 months post-launch. Converting leads to sales depends on your typical sales cycle."
    },
    {
      question: "We're a B2B SaaS company. How does a podcast help our business development?",
      answer: "It's a powerful way to connect with C-level executives in target accounts, showcase thought leadership, build relationships, and create authentic content that's more effective than cold outreach."
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