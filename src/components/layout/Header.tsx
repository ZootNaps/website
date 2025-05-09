'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  // Initialize scrolled state based on current window scroll position
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(typeof window !== 'undefined' ? window.scrollY > 10 : false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  // Ref to track the last update time for throttling
  const lastUpdateTimeRef = useRef(0);

  // Handle scroll effect
  useEffect(() => {
    // Check scroll position immediately on mount
    setScrolled(window.scrollY > 10);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up scroll event to detect which section is most centered in the viewport
  useEffect(() => {
    if (pathname !== '/') return;

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
  }, [pathname, activeSection]);

  // Handle navigation and smooth scroll to sections
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (pathname !== '/') {
      // If not on homepage, navigate to homepage with hash
      router.push(`/#${id}`);
      return;
    }
    
    // If already on homepage, just scroll
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to handle hash scrolling after navigation
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Small timeout to ensure the page has loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

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
            <div className="flex flex-col leading-tight font-['Plus_Jakarta_Sans']">
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
            className="md:hidden text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className={`${getNavItemStyle('home')} transition py-2`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`${getNavItemStyle('features')} transition py-2`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className={`${getNavItemStyle('process')} transition py-2`}
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className={`${getNavItemStyle('pricing')} transition py-2`}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`${getNavItemStyle('faq')} transition py-2`}
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className={`${getLinkStyle('/blog')} transition py-2`}
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className={`${getLinkStyle('/podcast')} transition py-2`}
            >
              Podcast
            </Link>
            <Link 
              href="/contact" 
              className={`${pathname === '/contact' ? 'bg-primary' : 'bg-secondary'} hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md text-center transition`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 