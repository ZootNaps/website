'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary"
          >
            YourLogo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-dark hover:text-secondary transition"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-dark hover:text-secondary transition"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-dark hover:text-secondary transition"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-dark hover:text-secondary transition"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-dark hover:text-secondary transition"
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className="text-gray-dark hover:text-secondary transition"
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className="text-gray-dark hover:text-secondary transition"
            >
              Podcast
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="hidden md:inline-block bg-secondary hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition"
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
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className="text-gray-dark hover:text-secondary transition py-2"
            >
              Podcast
            </Link>
            <Link 
              href="/contact" 
              className="bg-secondary hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md text-center transition"
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