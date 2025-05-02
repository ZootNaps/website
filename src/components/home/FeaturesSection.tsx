'use client';

import { FaRocket, FaChartLine, FaLightbulb, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Our Services</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            We provide comprehensive solutions that deliver real results for your business. Here's how we can help you succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaRocket className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Accelerated Growth</h3>
              <p className="text-gray">
                Our solutions help you achieve faster business growth through optimized processes and strategies.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaChartLine className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Increased Revenue</h3>
              <p className="text-gray">
                Boost your bottom line with our proven methods for maximizing revenue opportunities.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaLightbulb className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Innovative Solutions</h3>
              <p className="text-gray">
                Stay ahead of the competition with cutting-edge solutions tailored to your business needs.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaShieldAlt className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Risk Mitigation</h3>
              <p className="text-gray">
                Protect your business with our comprehensive risk assessment and management strategies.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaClock className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Time Efficiency</h3>
              <p className="text-gray">
                Save valuable time with streamlined processes and automated workflows.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaUsers className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Expert Support</h3>
              <p className="text-gray">
                Gain access to our team of industry experts committed to your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 