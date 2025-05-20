'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

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
      question: "Is this a good fit for my particular business?",
      answer: "This system is designed to help you close high value deals with strategically valuable customers. If your company prioritizes sales volume over deal size, this system is not a good fit. While our Podcast for Sales system can work for most businesses in most industries, our services are best suited for businesses that have a HIGH ACV (Average Contract Value), or busineses with high CLV (Customer Lifetime Value). "
    },
    {
      question: 'How long before I see results?',
      answer: 'Implementation typically takes 2-4 weeks, during which generally takes '
    },
    {
      question: 'How long does implementation typically take?',
      answer: 'Implementation timelines vary based on the complexity of your project and specific requirements. A simple implementation may take 2-4 weeks, while more complex projects can take 2-3 months. During our initial consultation, we will provide you with a detailed timeline specific to your needs.'
    },
    {
      question: 'Do you offer ongoing support after implementation?',
      answer: 'Yes, we provide comprehensive ongoing support for all our implementations. Our support options include regular check-ins, technical assistance, updates, and optimization recommendations. We offer various support packages to meet different needs and budgets.'
    },
    {
      question: 'How do you measure success?',
      answer: 'We measure success based on the specific goals and KPIs established at the start of your project. These may include ROI, efficiency improvements, cost savings, revenue growth, or other metrics relevant to your business objectives. We provide regular reporting on these metrics to track progress.'
    },
    {
      question: 'Can you integrate with our existing systems?',
      answer: 'Yes, our solutions are designed to integrate seamlessly with most existing systems and platforms. We conduct a thorough assessment of your current technology stack during the discovery phase to ensure compatibility and develop integration strategies as needed.'
    },
    {
      question: 'What makes your company different from competitors?',
      answer: 'Our approach combines deep industry expertise with personalized attention to each client\'s unique needs. We pride ourselves on transparent communication, measurable results, and long-term partnerships rather than one-off transactions. Our proven methodology and track record of success across various industries set us apart.'
    },
    {
      question: 'Do you offer customized solutions?',
      answer: 'Absolutely. We recognize that every business has unique challenges and objectives. Our solutions are fully customized based on your specific requirements, industry context, business size, and goals. We do not believe in one-size-fits-all approaches.'
    },
    {
      question: 'How do we get started working with you?',
      answer: 'Getting started is simple. You can contact us through our website, email, or phone to schedule an initial consultation. During this complimentary session, we will discuss your needs, answer your questions, and explain how our services can benefit your business. From there, we will provide a proposal tailored to your requirements.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Frequently Asked Questions</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Find answers to common questions about our services and how we can help your business.
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
                className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none active:bg-gray-50 transition-colors duration-200"
                aria-expanded={activeIndex === index}
              >
                <span className="font-bold">{item.question}</span>
                <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                  <FaChevronDown className={activeIndex === index ? "text-secondary" : "text-gray-dark"} />
                </div>
              </button>
              
              <div 
                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.82,0.2,1)]"
                style={{ 
                  maxHeight: activeIndex === index ? `${heights[index]}px` : '0',
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <div 
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray mb-4">
            Still have questions? We are here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 active:scale-98 hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 