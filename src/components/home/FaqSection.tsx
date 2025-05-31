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
      question: "How does this compare to traditional appointment setting services?",
      answer: "Traditional services get 3% response rates with 5-minute defensive conversations. We achieve 30% response rates with 45-minute strategic discussions. While others charge $5,500-$9,500 for cold calling, we provide premium executive access that positions you as a thought leader, not just another vendor."
    },
    {
      question: "Wait, so this is sales outreach disguised as podcasting?",
      answer: "We're completely transparent about our methodology. This is a sales development system that uses the vehicle of podcast interviews to secure strategic conversations with decision-makers. The podcasting format provides premium positioning that executives prefer over cold calls—it's collaborative rather than disruptive, educational rather than purely transactional."
    },
    {
      question: "What if they realize this is a sales process?",
      answer: "They absolutely know it's business development—we're transparent about that from the start. The key difference is that our approach provides genuine value first. Executives appreciate the strategic conversation format, the professional content creation, and the thought leadership positioning. It's consultative selling at its finest."
    },
    {
      question: "How is this different from hiring SDRs or using sales engagement platforms?",
      answer: "SDRs cost $60K+ annually plus management overhead, and platforms like Outreach or Salesloft require $10K-$20K monthly plus internal resources. We provide a complete done-for-you system with premium positioning. While internal teams struggle with 1-2% email response rates, our approach generates 30% response rates with executive-level strategic conversations."
    },
    {
      question: "Why not just use ABM platforms like Demandbase or Terminus?",
      answer: "ABM platforms cost $8K-$15K monthly and focus on digital touchpoints—ads, emails, web personalization. They're technology-heavy but relationship-light. We provide what those platforms can't: actual 45-minute strategic conversations with decision-makers. We're the human relationship layer that turns digital engagement into real business relationships."
    },
    {
      question: "How do you get executives to say yes to podcast interviews?",
      answer: "Three key factors: (1) We position it as thought leadership, not sales, (2) Executives appreciate being recognized as industry experts, and (3) We provide premium follow-up content packages. Most executives rarely get opportunities to share their strategic insights in a professional format—we make them the star of the conversation."
    },
    {
      question: "What happens after the interview?",
      answer: "Our systematic follow-up process includes: professional content packages, strategic nurturing sequences, and ongoing relationship development. We don't just hand you a contact—we help advance the relationship through your sales process until they're ready to buy. This isn't lead generation; it's relationship acceleration."
    },
    {
      question: "Do we need an existing audience for this to work?",
      answer: "No audience necessary—this is our key differentiator. While others require established podcast audiences, we're targeting prospects directly. The interview itself is the relationship-building vehicle, not audience building. We're doing sales development, not content marketing."
    },
    {
      question: "How quickly can we start seeing results?",
      answer: "Most clients see first strategic conversations within 30 days, with deal advancement typically occurring within 60-90 days. Unlike ABM platforms that require months of setup or cold calling that delivers immediate rejection, our approach provides both quick strategic access and long-term relationship value."
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