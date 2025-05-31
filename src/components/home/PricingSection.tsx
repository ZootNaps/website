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
      description: 'Essential sales development system for consistent qualified meetings',
      price: 8999,
      features: [
        'Dedicated sales development manager',
        '2 strategic sales conversations per month',
        'Prospect research & qualification',
        'Custom conversation frameworks',
        'Professional recording & content creation',
        'Basic thank you content packages',
        'Email support & onboarding',
        'Monthly pipeline reports'
      ],
      isPopular: false,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact',
      roi: 'Break-even with 1 deal every 2-3 months'
    },
    {
      name: 'Sales Premium',
      description: 'Advanced system with enhanced prospecting and premium relationship building',
      price: 11999,
      features: [
        'All Sales Core features',
        '4 strategic sales conversations per month',
        'Advanced prospecting with higher success rates',
        'Premium relationship coordination',
        'Enhanced thank you content packages',
        'Tailored follow-up email campaigns',
        'Priority support & dedicated success manager',
        'Advanced pipeline analytics & CRM integration',
        'LinkedIn content creation from conversations'
      ],
      isPopular: true,
      isBestValue: false,
      buttonText: 'Get Started',
      buttonLink: '/contact',
      roi: 'Average 3x ROI - pays for itself with 1 deal per month'
    },
    {
      name: 'Sales + Scale',
      description: "Enterprise-level system with maximum volume and custom sales integration",
      price: 16999,
      features: [
        'All Sales Premium features',
        '6+ strategic sales conversations per month',
        'Enterprise prospect research & targeting',
        'Custom sales process integration',
        'Premium content packages + social assets',
        'Multi-touch follow-up campaign sequences',
        '24/7 priority support',
        'Custom reporting & sales attribution',
        'Dedicated account manager',
        'Team training & onboarding'
      ],
      isPopular: false,
      isBestValue: true,
      buttonText: 'Contact Sales',
      buttonLink: '/contact',
      roi: 'Designed for 6-figure monthly pipeline impact'
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">Invest in Pipeline Growth</h2>
          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto mb-6">
            Choose your sales development package. Average 3x ROI within 90 days with 95% client success rate.
          </p>
          
          {/* Competitive Cost Comparison */}
          <div className="bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Compare Your Investment Options:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded border">
                <div className="font-semibold text-red-600">Hiring SDRs</div>
                <div className="text-gray-600">$60K-$80K annually</div>
                <div className="text-xs text-gray-500">+ benefits & management</div>
              </div>
              <div className="text-center p-3 bg-white rounded border">
                <div className="font-semibold text-orange-600">Sales Platforms</div>
                <div className="text-gray-600">$10K-$20K/month</div>
                <div className="text-xs text-gray-500">+ internal resources</div>
              </div>
              <div className="text-center p-3 bg-white rounded border">
                <div className="font-semibold text-yellow-600">ABM Platforms</div>
                <div className="text-gray-600">$8K-$15K/month</div>
                <div className="text-xs text-gray-500">+ setup & management</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-secondary/20 to-primary/20 rounded border border-secondary">
                <div className="font-semibold text-primary">Our System</div>
                <div className="text-gray-800 font-bold">$8K-$12K/month</div>
                <div className="text-xs text-secondary font-medium">Complete done-for-you</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4 italic">
              Get premium executive access for less than the cost of one SDR
            </p>
          </div>
          
          {/* ROI Calculation Example */}
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 rounded-lg border border-secondary/20 mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">ROI Reality Check</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">$10K</div>
                <div className="text-sm text-gray-600">Monthly Investment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4-6</div>
                <div className="text-sm text-gray-600">Strategic Conversations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$150K+</div>
                <div className="text-sm text-gray-600">Pipeline Value (1 deal)</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-700 mt-4">
              <span className="font-semibold">Break-even with just 1 strategic conversation conversion.</span> Most clients see 3x ROI within first quarter.
            </p>
          </div>
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
                  
                  {/* ROI Information */}
                  <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-4 mb-6">
                    <div className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                      Expected ROI
                    </div>
                    <div className="text-sm font-medium text-gray">
                      {plan.roi}
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-primary">
                      ${formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-500 text-lg">/month</span>
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

        {/* Enhanced Bottom Section with Sales Development Comparison */}
        <motion.div 
          className="mt-16 bg-linear-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            Traditional Sales Development vs. Our System
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-6">
              <h4 className="font-bold text-gray-600 mb-4">Traditional SDR Approach</h4>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>• 2-5% response rates on cold outreach</li>
                <li>• $75K+ annual salary + benefits per SDR</li>
                <li>• 3-6 months ramp-up time</li>
                <li>• Constant interruption-based approach</li>
                <li>• High turnover and training costs</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-secondary/20">
              <h4 className="font-bold text-secondary mb-4">Our Executive Access System</h4>
              <ul className="text-left space-y-2 text-sm text-gray">
                <li>• 40-60% meeting acceptance rates</li>
                <li>• Starting at $8,999/month - all inclusive</li>
                <li>• Immediate deployment with our team</li>
                <li>• Value-first, relationship-building approach</li>
                <li>• No hiring, training, or turnover concerns</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Calculate Your ROI
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 