'use client';

import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Get Started</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">Let's get your new favorite sales tool on the air. Send us your questions, or schedule a free strategy call now.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-white text-primary hover:bg-opacity-90 font-medium py-3 px-8 rounded-md text-center transition"
            >
              Get Started
            </Link>
            <Link 
              href="/blog"
              className="border border-white text-white hover:bg-primary-dark font-medium py-3 px-8 rounded-md text-center transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 