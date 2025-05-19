'use client';

import { FaRocket, FaChartLine, FaLightbulb, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Built for Sales - Not Marketing.</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Every step of our process is purpose-built for sales - creating valuable touchpoints and customer interactions that drive real revenue.</p>
            {/* <p>See why our sales-first approach puts our podcasts in a league of their own.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaRocket className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Unparalleled Response Rates</h3>
              <p className="text-gray">
                Industry-leading outreach that C  Suite Executives are excited to respond to. Get your foot in the door, and get the conversation started.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaChartLine className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Customer Qualification</h3>
              <p className="text-gray">
                Multiple qualification steps ensure every guest is a qualified decision maker - and that they're ready to buy.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaLightbulb className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Seamless Discovery</h3>
              <p className="text-gray">
                Tailored interview questions that uncover your guests' exact pain points - and show how your product can help.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaShieldAlt className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">High-Impact Customer Interactions</h3>
              <p className="text-gray">
                Hour-long conversations that create lasting business relationships - and position you as a trusted advisor.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaUsers className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Dozens of Touchpoints</h3>
              <p className="text-gray">
                Our process creates dozens of touchpoints that keep you top-of-mind long after the interview.
              </p>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaClock className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">World-Class Production Quality</h3>
              <p className="text-gray">
                High-quality assets that strengthen your brand, and clips that you (and your guests) are proud to share on social. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 