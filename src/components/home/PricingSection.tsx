'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PricingSection = () => {
  // Format price with comma for thousands
  const formatPrice = (price: number) => {
    return price >= 1000 ? price.toLocaleString() : price;
  };

  const plans = [
    {
      name: 'Sales Core',
      description: 'The complete Podcast for Sales system',
      price: 8999,
      features: [
        'Dedicated customer outreach manager',
        '2 podcast episodes / month',
        'Email support',
        'Basic reporting',
        'Up to 5 users',
        '5GB storage'
      ],
      isPopular: false,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Sales Premium',
      description: 'More episodes, more outreach, and more opportunities to close',
      price: 11999,
      features: [
        'All Sales Core features',
        'Priority support',
        'Advanced reporting',
        'Up to 20 users',
        '25GB storage',
        'API access',
        'Custom integrations'
      ],
      isPopular: true,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Sales + Marketing',
      description: "Maximize your podcast impact with premium content marketing for social, SEO, and more.",
      price: 16999,
      features: [
        'All Sales Premium features',
        '24/7 premium support',
        'Comprehensive reporting',
        'Unlimited users',
        'Unlimited storage',
        'Advanced security',
        'Dedicated account manager',
        'Custom development'
      ],
      isPopular: false,
      isBestValue: true,
      buttonText: 'Contact Sales',
      buttonLink: '/contact'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Packages and Pricing</h2>
          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto">
            Choose the plan that's right for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border ${
                plan.isPopular 
                  ? 'border-secondary shadow-xl' 
                  : plan.isBestValue 
                    ? 'border-primary shadow-xl' 
                    : 'border-gray-200 shadow-sm'
              } transition-all hover:shadow-lg flex flex-col h-full`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-secondary text-white text-xs font-semibold py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.isBestValue && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-semibold py-1 px-4 rounded-full">
                    Best Value
                  </span>
                </div>
              )}
              
              <div className="p-8 flex-grow flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-bold">${formatPrice(plan.price)}<span className="text-xl text-gray-500 font-medium">/mo</span></div>
                  </div>
                  
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
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
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray leading-relaxed">
            Not sure what to choose? <a className="text-secondary font-medium" href="/contact">Contact us</a> for a personalized recommendation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 