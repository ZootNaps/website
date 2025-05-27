'use client';

import Link from 'next/link';
import Image from 'next/image';
import { scrollToElement } from '@/utils/scrollUtils';

const HeroSection = () => {
  return (
    <section id="home" className="pt-28 pb-20 bg-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-primary">
              Podcasts that sell.
            </h1>
            {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-primary">
              Zero audience required.
            </h2> */}
            {/*Our end-to-end B2B Podcast solution gives you 1 on 1 facetime with decision makers at your most sought-after clients. Connect, impress, and convert with our proven Podcast for Sales system.*/}
            <p className="text-lg md:text-xl text-gray mb-8 max-w-xl">
            An end-to-end podcast system that turns executive interviews into qualified leads and direct sales revenue.
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
                  scrollToElement('features');
                }}
                className="border border-secondary text-secondary hover:bg-bg font-medium py-3 px-8 rounded-md text-center transition"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full">
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
              {/* Replace with the actual image file name */}
              <Image 
                src="/images/hero-image.png"
                alt="B2B podcast sales solution helping businesses connect with and sell to their top customers"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                quality={85}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 