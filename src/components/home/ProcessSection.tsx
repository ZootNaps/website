'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<string>('discovery');
  
  const tabs = [
    { id: 'discovery', name: 'Discovery' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'implementation', name: 'Implementation' },
    { id: 'optimization', name: 'Optimization' }
  ];
  
  const tabContent = {
    discovery: {
      title: 'Discovery',
      description: 'We begin by understanding your business, challenges, and goals through in-depth consultations.',
      points: [
        'Initial consultation to understand your needs',
        'Analysis of your current situation and challenges',
        'Identification of key objectives and success metrics',
        'Preliminary recommendations based on findings'
      ]
    },
    strategy: {
      title: 'Strategy',
      description: 'We develop a customized plan of action to address your specific challenges and achieve your goals.',
      points: [
        'Detailed strategic planning sessions',
        'Prioritization of initiatives and objectives',
        'Resource allocation and timeline planning',
        'Risk assessment and mitigation strategies'
      ]
    },
    implementation: {
      title: 'Implementation',
      description: 'We execute the agreed-upon strategy with precision and attention to detail.',
      points: [
        'Systematic execution of the strategic plan',
        'Regular progress updates and stakeholder communication',
        'Agile approach to adapt to changing requirements',
        'Continuous quality assurance and testing'
      ]
    },
    optimization: {
      title: 'Optimization',
      description: 'We continuously monitor and refine our approach to maximize results and ROI.',
      points: [
        'Ongoing performance analysis and reporting',
        'Identification of improvement opportunities',
        'Refinement of strategies based on results',
        'Long-term support and maintenance'
      ]
    }
  };

  return (
    <section id="process" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Proven Process</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            We follow a structured approach to ensure successful outcomes for your business.
          </p>
        </div>
        
        <div className="flex flex-wrap mb-8">
          <div className="w-full">
            <div className="flex flex-col md:flex-row border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors
                    ${activeTab === tab.id ? 'border-b-2 border-secondary text-secondary' : 'text-gray-dark hover:text-secondary'}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">{tabContent[activeTab as keyof typeof tabContent].title}</h3>
              <p className="text-gray mb-6">{tabContent[activeTab as keyof typeof tabContent].description}</p>
              <ul className="space-y-3">
                {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-secondary mt-1 mr-3 flex-shrink-0" size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-light rounded-lg h-80 flex items-center justify-center">
                <span className="text-gray-dark font-medium">Process Illustration {activeTab === 'discovery' ? '1' : activeTab === 'strategy' ? '2' : activeTab === 'implementation' ? '3' : '4'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 