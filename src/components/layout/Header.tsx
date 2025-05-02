'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to sections on the homepage
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (pathname !== '/') {
      return; // Don't scroll if not on homepage
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            className="text-2xl font-bold text-gray-900"
          >
            YourLogo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Podcast
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
          >
            Contact Us
          </Link>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
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
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              FAQ
            </button>
            <Link 
              href="/blog" 
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Blog
            </Link>
            <Link 
              href="/podcast" 
              className="text-gray-800 hover:text-blue-600 transition py-2"
            >
              Podcast
            </Link>
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-center transition"
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