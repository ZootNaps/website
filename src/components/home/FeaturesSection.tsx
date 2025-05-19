'use client';

import { FaRocket, FaChartLine, FaLightbulb, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">More Than Just Marketing.</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Our podcasts are purpose built for high-impact sales - marketing is just the cherry on top. </p>
            <p>See why our sales-first approach puts our podcasts in a league of their own.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaRocket className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Pipeline Generation</h3>
              <p className="text-gray">
                Generate quality leads directly from podcast conversations with decision-makers at your target companies.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaChartLine className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Qualification</h3>
              <p className="text-gray">
                Uncover buyer pain points and qualify prospects naturally through in-depth podcast discussions.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaLightbulb className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Discovery</h3>
              <p className="text-gray">
                Gain valuable insights about your prospects' challenges during engaging podcast interviews.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaShieldAlt className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Relationship Building</h3>
              <p className="text-gray">
                Cultivate lasting business relationships through meaningful conversations that position you as a trusted advisor.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaClock className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">Multiple Touchpoints</h3>
              <p className="text-gray">
                Create multiple high-value interactions with prospects through episode recording, promotion, and follow-up.
              </p>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-center">
              <FaUsers className="text-secondary text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary">White-Glove Service</h3>
              <p className="text-gray">
                Enjoy our end-to-end podcast production service that handles everything while you focus on closing deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 