'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faHandshake, faMicrophone, faEnvelopeOpenText, faClipboardQuestion, faHexagonNodes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Feature card data to ensure consistency
const features = [
  {
    icon: faEnvelopeOpenText, // Updated from faRocket
    title: "Unparalleled Response Rates",
    description: "Industry-leading outreach that C Suite Executives are excited to respond to. Get your foot in the door, and get the conversation started."
  },
  {
    icon: faUserCheck,
    title: "Customer Qualification",
    description: "Multiple qualification steps ensure every guest is a qualified decision maker - and that they're ready to buy."
  },
  {
    icon: faClipboardQuestion, // Updated from faLightbulb
    title: "Seamless Discovery",
    description: "Tailored interview questions that uncover your guests' exact pain points - and show how your product can help."
  },
  {
    icon: faHandshake,
    title: "Impactful Conversations",
    description: "Hour long conversations that create lasting business relationships - and position you as a trusted advisor."
  },
  {
    icon: faHexagonNodes, // Updated from faNetworkWired
    title: "Dozens of Touchpoints",
    description: "Our process creates dozens of touchpoints that keep you top of mind for months after the interview."
  },
  {
    icon: faMicrophone,
    title: "World-Class Production Quality",
    description: "High-quality assets that strengthen your brand, and clips that you (and your guests) are proud to share on social."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Built for Sales - Not Marketing.</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Every step of our process is purpose built for sales - creating valuable touchpoints and customer interactions that drive real revenue.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 md:p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300 h-full flex flex-col"
            >
              <div className="flex items-start h-full">
                <div className="mr-4 flex-shrink-0 pt-1">
                  <FontAwesomeIcon icon={feature.icon} className="text-secondary text-3xl" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">{feature.title}</h3>
                  <p className="text-gray leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary max-w-3xl mx-auto">
            B2B Podcasts - Reimagined.
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto mb-6">
            Our sales-first approach prioritizes what salespeople care about - and what most agencies miss. Want to see it in action? 
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
          >
            Book a Demo Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 