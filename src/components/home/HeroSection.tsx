'use client';

import Link from 'next/link';
import Image from 'next/image';
import { scrollToElement } from '@/utils/scrollUtils';

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-20 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-white opacity-90 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-20 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl z-0"></div>
      <div className="absolute left-10 bottom-10 w-40 h-40 bg-primary opacity-5 rounded-full blur-2xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
              {/* Small accent element */}
              <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-secondary opacity-10"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-primary relative z-10">
                Podcasts that <span className="text-secondary">sell.</span>
              </h1>
            </div>
            {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-primary">
              Zero audience required.
            </h2> */}
            {/*Our end-to-end B2B Podcast solution gives you 1 on 1 facetime with decision makers at your most sought-after clients. Connect, impress, and convert with our proven Podcast for Sales system.*/}
            <p className="text-lg md:text-xl text-gray leading-relaxed mb-8 max-w-xl border-l-4 border-secondary/20 pl-4 mt-6">
              An end-to-end podcast system that turns executive interviews into qualified leads and direct sales revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link 
                href="/contact" 
                className="bg-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-10 rounded-lg text-lg text-center transition shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Get Started
              </Link>
              <button 
                onClick={() => {
                  scrollToElement('features');
                }}
                className="text-primary hover:text-secondary font-medium py-3 px-6 rounded-md text-center transition hover:underline"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full">
            {/* Image container with enhanced visual treatment */}
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-xl">
              {/* Replace with the actual image file name */}
              <Image 
                src="/images/hero-image.png"
                alt="B2B podcast sales solution helping businesses connect with and sell to their top customers"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
              {/* Overlay gradient for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-50"></div>
            </div>
            
            {/* Client attribution caption */}
            <div className="mt-3 flex items-center">
              <div className="h-px flex-grow bg-gray-200 mr-3"></div>
              <p className="text-sm text-gray-600 font-medium italic">
                <span className="text-primary font-semibold not-italic">Brian Blum</span> - Co-Host of "Sweat Equity"
              </p>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-bg border-4 border-white rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 