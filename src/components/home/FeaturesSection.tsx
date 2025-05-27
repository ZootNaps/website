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
    <section id="features" className="py-16 md:py-24 relative bg-gradient-to-b from-white via-bg/30 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ 
             backgroundImage: 'radial-gradient(#2a3d45 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
              Our Approach
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Built for <span className="text-secondary">Sales</span> - Not Marketing.
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Every step of our process is purpose built for sales - creating valuable touchpoints and customer interactions that drive real revenue.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-7 border border-gray-200 rounded-lg hover:shadow-xl transition duration-300 h-full flex flex-col group relative hover:-translate-y-1"
            >
              {/* Accent top border with animation */}
              <div className="absolute inset-x-0 top-0 h-1 bg-secondary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100 rounded-t-lg"></div>
              
              <div className="flex items-start h-full">
                <div className="mr-5 flex-shrink-0 pt-1">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <FontAwesomeIcon icon={feature.icon} className="text-2xl" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary leading-tight mb-3">{feature.title}</h3>
                  <p className="text-gray leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 md:mt-20 text-center relative py-10">
          {/* Decorative divider */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-secondary"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary max-w-3xl mx-auto">
            B2B Podcasts - <span className="text-secondary">Reimagined</span>.
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto mb-8">
            Our sales-first approach prioritizes what salespeople care about - and what most agencies miss. Want to see it in action? 
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transform hover:-translate-y-1"
          >
            Book a Demo Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 