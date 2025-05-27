'use client';

import { FaRocket, FaUserCheck, FaLightbulb, FaHandshake, FaNetworkWired, FaMicrophone } from 'react-icons/fa';
import Link from 'next/link';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Built for Sales - Not Marketing.</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Every step of our process is purpose built for sales - creating valuable touchpoints and customer interactions that drive real revenue.</p>
            {/* <p>See why our sales-first approach puts our podcasts in a league of their own.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaRocket className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">Unparalleled Response Rates</h3>
                <p className="text-gray leading-relaxed">
                  Industry-leading outreach that C Suite Executives are excited to respond to. Get your foot in the door, and get the conversation started.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaUserCheck className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">Customer Qualification</h3>
                <p className="text-gray leading-relaxed">
                  Multiple qualification steps ensure every guest is a qualified decision maker - and that they're ready to buy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaLightbulb className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">Seamless Discovery</h3>
                <p className="text-gray leading-relaxed">
                  Tailored interview questions that uncover your guests' exact pain points - and show how your product can help.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaHandshake className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">Impactful Conversations</h3>
                <p className="text-gray leading-relaxed">
                  Hour long conversations that create lasting business relationships - and position you as a trusted advisor.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaNetworkWired className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">Dozens of Touchpoints</h3>
                <p className="text-gray leading-relaxed">
                  Our process creates dozens of touchpoints that keep you top of mind for months after the interview.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 pt-1">
                <FaMicrophone className="text-secondary text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3">World-Class Production Quality</h3>
                <p className="text-gray leading-relaxed">
                  High-quality assets that strengthen your brand, and clips that you (and your guests) are proud to share on social. 
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
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