'use client';

import { useRef, useEffect } from 'react';

const ClientLogoSection = () => {
  const logos = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
    { id: 4, name: 'Company 4' },
    { id: 5, name: 'Company 5' },
    { id: 6, name: 'Company 6' },
    { id: 7, name: 'Company 7' },
    { id: 8, name: 'Company 8' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const duplicateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const duplicateContainer = duplicateRef.current;
    
    if (!scrollContainer || !duplicateContainer) return;
    
    // Clone the logos for infinite loop
    duplicateContainer.innerHTML = scrollContainer.innerHTML;
    
    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      
      requestAnimationFrame(scrollAnimation);
    };
    
    const animationId = requestAnimationFrame(scrollAnimation);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-8">Trusted by Companies Worldwide</h2>
        
        <div className="relative overflow-hidden">
          <div className="flex overflow-x-hidden">
            <div ref={scrollRef} className="flex space-x-12 animate-scroll whitespace-nowrap">
              {logos.map((logo) => (
                <div key={logo.id} className="flex-shrink-0 flex items-center justify-center h-16 w-40 bg-white rounded-lg shadow-sm">
                  {/* Replace with actual logo images */}
                  <span className="text-gray">{logo.name}</span>
                </div>
              ))}
            </div>
            <div ref={duplicateRef} className="flex space-x-12 animate-scroll whitespace-nowrap"></div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-secondary mb-2">98%</div>
            <p className="text-gray">Customer Satisfaction</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-secondary mb-2">250+</div>
            <p className="text-gray">Projects Completed</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-secondary mb-2">15+</div>
            <p className="text-gray">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoSection; 