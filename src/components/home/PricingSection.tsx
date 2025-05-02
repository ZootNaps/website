'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      description: 'Perfect for small businesses and startups',
      priceMonthly: 99,
      priceAnnual: 79,
      features: [
        'Core service features',
        'Email support',
        'Basic reporting',
        'Up to 5 users',
        '5GB storage',
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Ideal for growing businesses with more needs',
      priceMonthly: 199,
      priceAnnual: 159,
      features: [
        'All Basic features',
        'Priority support',
        'Advanced reporting',
        'Up to 20 users',
        '25GB storage',
        'API access',
        'Custom integrations'
      ],
      popular: true,
      cta: 'Get Started'
    },
    {
      id: 3,
      name: 'Enterprise',
      description: 'For large organizations with complex requirements',
      priceMonthly: 399,
      priceAnnual: 319,
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
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                  isAnnual ? 'bg-white shadow-sm text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual
                {isAnnual && <span className="ml-2 text-xs text-green-600">Save 20%</span>}
              </button>
              <button
                className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                  !isAnnual ? 'bg-white shadow-sm text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-lg border ${
                plan.popular ? 'border-blue-600 shadow-xl' : 'border-gray-200 shadow-sm'
              } transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                    <span className="text-xl text-gray-500 font-medium">/mo</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-gray-500 mt-1">
                      Billed annually (${plan.priceAnnual * 12}/year)
                    </div>
                  )}
                </div>
                
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact"
                  className={`block w-full py-3 px-6 text-center rounded-md font-medium transition ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a custom plan? <Link href="/contact" className="text-blue-600 font-medium">Contact us</Link> for a tailored solution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 