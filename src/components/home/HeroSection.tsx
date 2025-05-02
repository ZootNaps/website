'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="home" className="pt-28 pb-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary">
              Transform Your Business With Our Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray mb-8 max-w-xl">
              We help businesses like yours overcome challenges and achieve growth with our custom solutions and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md text-center transition"
              >
                Get Started
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-secondary text-secondary hover:bg-light font-medium py-3 px-8 rounded-md text-center transition"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* Placeholder for hero image - replace with your actual image */}
              <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-medium">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 