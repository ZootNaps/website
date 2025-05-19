'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaTimes, FaBars } from 'react-icons/fa';
import { scrollToElement } from '@/utils/scrollUtils';

const Header = () => {
  // Initialize state safely without accessing window during render
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // Ref to track the last update time for throttling
  const lastUpdateTimeRef = useRef(0);

  // Mark component as mounted on client-side
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle scroll effect - only runs client-side
  useEffect(() => {
    if (!isMounted) return;
    
    // Check scroll position immediately on mount
    setScrolled(window.scrollY > 10);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Set up scroll event to detect which section is most centered in the viewport
  useEffect(() => {
    if (!isMounted || pathname !== '/') return;

    const sections = ['home', 'features', 'process', 'pricing', 'faq'];
    
    // Function to find the most centered section in the viewport
    const findCenteredSection = () => {
      // Get the current time to implement throttling
      const now = Date.now();
      // Throttle updates to prevent rapid changes (wait at least 300ms between updates)
      if (now - lastUpdateTimeRef.current < 300) return;
      
      const viewportHeight = window.innerHeight;
      const viewportCenter = window.scrollY + (viewportHeight / 2);
      
      let closestSection = null;
      let closestDistance = Infinity;
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionCenter = sectionTop + (rect.height / 2);
        const distance = Math.abs(viewportCenter - sectionCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = sectionId;
        }
      });
      
      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
        lastUpdateTimeRef.current = now;
      }
    };
    
    // Initial check
    findCenteredSection();
    
    // Set up the scroll event listener
    window.addEventListener('scroll', findCenteredSection);
    
    return () => {
      window.removeEventListener('scroll', findCenteredSection);
    };
  }, [pathname, activeSection, isMounted]);

  // Effect to handle hash scrolling after navigation
  useEffect(() => {
    if (!isMounted) return;
    
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1);
      // Small timeout to ensure the page has loaded
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    }
  }, [pathname, isMounted]);

  // Handle navigation and smooth scroll to sections
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (pathname !== '/') {
      // If not on homepage, navigate to homepage with hash
      router.push(`/#${id}`);
      return;
    }
    
    // If already on homepage, use our custom scroll function with offset
    scrollToElement(id);
  };

  // Helper function to determine nav item style
  const getNavItemStyle = (sectionId: string): string => {
    return activeSection === sectionId && pathname === '/' 
      ? "text-secondary font-bold" 
      : "text-gray-dark hover:text-secondary";
  };

  // Helper function for Blog and Podcast links
  const getLinkStyle = (pagePath: string): string => {
    return pathname === pagePath
      ? "text-secondary font-bold"
      : "text-gray-dark hover:text-secondary";
  };

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled || pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Updated to Stacked Version */}
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <Image 
              src="/images/sls-logos/sls-logo-default.png"
              alt="SLS Logo"
              width={40}
              height={40}
              priority
              quality={90}
              className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] object-contain"
            />
            <div className="flex flex-col leading-tight font-plus-jakarta">
              <span className="text-sm md:text-base font-bold tracking-wider text-primary dark:text-white transition-colors duration-300 hover:text-secondary">
                SOUTH LAMAR
              </span>
              <span className="text-xs md:text-sm font-medium tracking-[0.08em] text-gray-dark dark:text-gray-300">
                STUDIOS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`${getNavItemStyle('home')} transition`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`${getNavItemStyle('features')} transition`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className={`${getNavItemStyle('process')} transition`}
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className={`${getNavItemStyle('pricing')} transition`}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`${getNavItemStyle('faq')} transition`}
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className={`${getLinkStyle('/blog')} transition`}
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className={`${getLinkStyle('/podcast')} transition`}
            >
              Podcast
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className={`hidden md:inline-block ${pathname === '/contact' ? 'bg-primary' : 'bg-secondary'} hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition`}
          >
            Contact Us
          </Link>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-primary focus:outline-none relative h-10 w-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative flex items-center justify-center w-6 h-6 overflow-hidden">
              <FaBars 
                size={20} 
                className={`absolute transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
                  mobileMenuOpen 
                    ? 'opacity-0 rotate-90 scale-0' 
                    : 'opacity-100 rotate-0 scale-100'
                }`} 
              />
              <FaTimes 
                size={20} 
                className={`absolute text-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
                  mobileMenuOpen 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-90 scale-0'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed top-[56px] left-0 w-full h-auto max-h-[calc(100vh-56px)] overflow-y-auto bg-white shadow-lg z-40 transition-all duration-500 ease-[cubic-bezier(0.34,1.16,0.64,1)] transform ${
          mobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('home')}
              className={`${getNavItemStyle('home')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`${getNavItemStyle('features')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className={`${getNavItemStyle('process')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className={`${getNavItemStyle('pricing')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`${getNavItemStyle('faq')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className={`${getLinkStyle('/blog')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className={`${getLinkStyle('/podcast')} text-center transition-all duration-300 py-2 text-base border-b border-gray-100`}
            >
              Podcast
            </Link>
          </div>
          <div className="mt-6 mb-2">
            <Link 
              href="/contact" 
              className={`${pathname === '/contact' ? 'bg-primary' : 'bg-secondary'} w-full hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md text-center transition-all duration-300 block`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 