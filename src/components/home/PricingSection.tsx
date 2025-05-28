'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">Packages and Pricing</h2>
          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto">
            Choose the plan that's right for you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl border-2 ${
                plan.isPopular 
                  ? 'border-secondary shadow-xl bg-white' 
                  : plan.isBestValue 
                    ? 'border-primary shadow-xl bg-white' 
                    : 'border-gray-200 shadow-sm hover:border-gray-300 bg-white'
              } transition-all duration-300 flex flex-col h-full hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-secondary text-white text-xs font-semibold py-2 px-6 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.isBestValue && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-semibold py-2 px-6 rounded-full shadow-lg">
                    Best Value
                  </span>
                </div>
              )}
              
              <div className="p-8 flex-grow flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h3>
                  <p className="text-gray leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-primary">
                      ${formatPrice(plan.price)}
                      <span className="text-xl text-gray-500 font-medium">/mo</span>
                    </div>
                  </div>
                  
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FontAwesomeIcon icon={faCheck} className="text-secondary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={plan.buttonLink}
                      className={`block w-full py-4 px-6 text-center rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-hidden focus:ring-2 ${
                        plan.isPopular
                          ? 'bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary/50'
                          : plan.isBestValue
                            ? 'bg-primary hover:bg-primary-dark text-white focus:ring-primary/50'
                            : 'bg-gray-100 hover:bg-gray-200 text-primary border-2 border-gray-200 hover:border-primary/30 focus:ring-gray/50'
                      }`}
                    >
                      {plan.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray leading-relaxed">
            Not sure what to choose? <Link href="/contact" className="text-secondary font-semibold hover:text-secondary-dark transition-colors duration-300">Contact us</Link> for a personalized recommendation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 