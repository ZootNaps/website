import { FaRocket, FaChartLine, FaLightbulb, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <FaRocket className="text-blue-600 text-4xl mb-4" />,
      title: 'Accelerated Growth',
      description: 'Our solutions help you achieve faster business growth through optimized processes and strategies.'
    },
    {
      id: 2,
      icon: <FaChartLine className="text-blue-600 text-4xl mb-4" />,
      title: 'Increased Revenue',
      description: 'Boost your bottom line with our proven methods for maximizing revenue opportunities.'
    },
    {
      id: 3,
      icon: <FaLightbulb className="text-blue-600 text-4xl mb-4" />,
      title: 'Innovative Solutions',
      description: 'Stay ahead of the competition with cutting-edge solutions tailored to your business needs.'
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
      title: 'Risk Mitigation',
      description: 'Protect your business with our comprehensive risk assessment and management strategies.'
    },
    {
      id: 5,
      icon: <FaClock className="text-blue-600 text-4xl mb-4" />,
      title: 'Time Efficiency',
      description: 'Save valuable time with streamlined processes and automated workflows.'
    },
    {
      id: 6,
      icon: <FaUsers className="text-blue-600 text-4xl mb-4" />,
      title: 'Expert Support',
      description: 'Gain access to our team of industry experts committed to your success.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive solutions that deliver real results for your business. Here's how we can help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 