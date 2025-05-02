'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PricingSection = () => {
  const [annual, setAnnual] = useState<boolean>(true);
  
  const toggleBilling = () => {
    setAnnual(!annual);
  };
  
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses and startups',
      price: annual ? 79 : 99,
      features: [
        'Core service features',
        'Email support',
        'Basic reporting',
        'Up to 5 users',
        '5GB storage'
      ],
      isPopular: false,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with more needs',
      price: annual ? 159 : 199,
      features: [
        'All Basic features',
        'Priority support',
        'Advanced reporting',
        'Up to 20 users',
        '25GB storage',
        'API access',
        'Custom integrations'
      ],
      isPopular: true,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex requirements',
      price: annual ? 319 : 399,
      features: [
        'All Professional features',
        '24/7 premium support',
        'Comprehensive reporting',
        'Unlimited users',
        'Unlimited storage',
        'Advanced security',
        'Dedicated account manager',
        'Custom development'
      ],
      isPopular: false,
      buttonText: 'Contact Sales',
      buttonLink: '/contact'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                  annual
                    ? 'bg-white shadow-sm text-secondary'
                    : 'text-gray-dark'
                }`}
                onClick={() => setAnnual(true)}
              >
                Annual
                <span className="ml-2 text-xs text-green-600">Save 20%</span>
              </button>
              <button
                className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                  !annual
                    ? 'bg-white shadow-sm text-secondary'
                    : 'text-gray-dark'
                }`}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border ${
                plan.isPopular ? 'border-secondary shadow-xl' : 'border-gray-200 shadow-sm'
              } transition-all hover:shadow-lg`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-secondary text-white text-xs font-semibold py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold">${plan.price}<span className="text-xl text-gray-500 font-medium">/mo</span></div>
                  <div className="text-sm text-gray-500 mt-1">
                    Billed {annual ? 'annually' : 'monthly'}
                    {annual && ` ($${plan.price * 12}/year)`}
                  </div>
                </div>
                
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={plan.buttonLink}
                  className={`block w-full py-3 px-6 text-center rounded-md font-medium transition ${
                    plan.isPopular
                      ? 'bg-secondary hover:bg-opacity-90 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray">
            Need a custom plan? <a className="text-secondary font-medium" href="/contact">Contact us</a> for a tailored solution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 