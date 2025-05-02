'use client';

import { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const processSteps = [
    {
      id: 1,
      title: 'Discovery',
      description: 'We begin by understanding your business, challenges, and goals through in-depth consultations.',
      steps: [
        'Initial consultation to understand your needs',
        'Analysis of your current situation and challenges',
        'Identification of key objectives and success metrics',
        'Preliminary recommendations based on findings'
      ]
    },
    {
      id: 2,
      title: 'Strategy',
      description: 'We develop a customized strategy tailored to your specific business needs and objectives.',
      steps: [
        'Development of comprehensive action plan',
        'Resource allocation and timeline planning',
        'Risk assessment and mitigation strategies',
        'Review and approval of proposed strategy'
      ]
    },
    {
      id: 3,
      title: 'Implementation',
      description: 'Our team of experts implements the strategy with careful attention to detail and quality.',
      steps: [
        'Setup and configuration of required systems',
        'Staged deployment to minimize disruption',
        'Regular progress updates and milestone tracking',
        'Quality assurance and testing throughout'
      ]
    },
    {
      id: 4,
      title: 'Optimization',
      description: 'We continuously monitor and optimize the implementation to ensure maximum results.',
      steps: [
        'Performance monitoring against established metrics',
        'Data analysis and insights generation',
        'Iterative improvements based on findings',
        'Regular optimization reports and recommendations'
      ]
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Proven Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We follow a structured approach to ensure successful outcomes for your business.
          </p>
        </div>

        <div className="flex flex-wrap mb-8">
          <div className="w-full">
            <div className="flex flex-col md:flex-row border-b">
              {processSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors ${
                    activeTab === index
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">{processSteps[activeTab].title}</h3>
              <p className="text-gray-600 mb-6">{processSteps[activeTab].description}</p>
              <ul className="space-y-3">
                {processSteps[activeTab].steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                <span className="text-gray-500 font-medium">Process Illustration {activeTab + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 