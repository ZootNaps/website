'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PricingSection = () => {
  // Format price with comma for thousands, using a specific locale for consistency
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US');
  };

  const plans = [
    {
      name: 'Sales Core',
      description: 'See our Podcast for Sales system in action',
      price: 7999,
      features: [
        { text: '2 complete podcast episodes per month (audio + video)', type: 'highlighted' },
        { text: '40 strategic prospect outreach messages per month', type: 'highlighted' },
        { text: 'Basic guest content package (4 clips)', type: 'highlighted' },
        { text: 'Includes:', type: 'intro' },
        { text: 'Complete strategy workshop (ICP identification, podcast positioning, goal alignment)', type: 'normal' },
        { text: 'Dedicated podcast producer for recording, scheduling, and guest outreach', type: 'normal' },
        { text: 'Custom interview & conversation framework for your podcast', type: 'normal' },
        { text: 'Guest qualification and pre-interview preparation', type: 'normal' },
        { text: 'Professional audio and video post-production', type: 'normal' },
        { text: 'Basic follow-up sequence (pre and post-publication nurturing)', type: 'normal' },
        { text: 'Show notes and full transcriptions', type: 'normal' },
        { text: 'Performance tracking and KPI monitoring', type: 'normal' }
      ],
      isPopular: false,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Sales Premium',
      description: 'More outreach, interviews, and social distribution',
      price: 11999,
      features: [
        { text: '4 complete podcast episodes per month (audio + video)', type: 'highlighted' },
        { text: '80 strategic prospect outreach messages per month', type: 'highlighted' },
        { text: 'Premium guest content package (4 clips + written posts + custom cover art)', type: 'highlighted' },
        { text: 'Content distribution LinkedIn & other social platforms', type: 'highlighted' },
        { text: 'Everything in Sales Core, plus:', type: 'intro' },
        { text: 'Monthly performance reporting with detailed analytics', type: 'normal' },
        { text: 'Enhanced follow-up sequences with additional touchpoints', type: 'normal' },
        { text: 'Priority scheduling and expedited turnaround times', type: 'normal' }
      ],
      isPopular: true,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact'
    },
    {
      name: 'Sales + Content',
      description: 'Turn your podcast into a B2B content engine on all platforms',
      price: 17999,
      features: [
        { text: '120+ strategic prospect outreach messages per month', type: 'highlighted' },
        { text: 'Custom content repurposing: SEO-optimized blog posts, newsletters, and more', type: 'highlighted' },
        { text: 'Dedicated social media manager for content distribution', type: 'highlighted' },
        { text: 'Everything in Sales Premium, plus:', type: 'intro' },
        { text: 'Custom sales process & systems integration', type: 'normal' },
        { text: 'White-glove onboarding and priority support', type: 'normal' }
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
          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto mb-6">
            Choose your sales development package. Average 3x ROI within 90 days with 95% client success rate.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
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
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-primary">
                      ${formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-500 text-lg">/month</span>
                  </div>
                  
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature) => {
                      if (feature.type === 'intro') {
                        return (
                          <li key={feature.text} className="underline text-gray-600 font-medium pt-4 pb-2">
                            {feature.text}
                          </li>
                        );
                      }
                      
                      return (
                        <li key={feature.text} className="flex items-start">
                          <FontAwesomeIcon icon={faCheck} className="text-secondary mt-1 mr-3 flex-shrink-0" />
                          <span className={`text-gray ${feature.type === 'highlighted' ? 'font-bold text-primary' : ''}`}>
                            {feature.text}
                          </span>
                        </li>
                      );
                    })}
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
