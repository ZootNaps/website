'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaChevronDown, FaChevronUp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [aboutHeight, setAboutHeight] = useState(0);
  const [linksHeight, setLinksHeight] = useState(0);
  
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const linksContentRef = useRef<HTMLDivElement>(null);
  
  // Measure content heights on mount and window resize
  useEffect(() => {
    const updateHeights = () => {
      if (aboutContentRef.current) {
        setAboutHeight(aboutContentRef.current.scrollHeight);
      }
      if (linksContentRef.current) {
        setLinksHeight(linksContentRef.current.scrollHeight);
      }
    };
    
    updateHeights();
    window.addEventListener('resize', updateHeights);
    
    return () => window.removeEventListener('resize', updateHeights);
  }, []);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <footer className="bg-primary text-white pt-6 pb-4 md:py-10">
      <div className="container mx-auto px-4">
        {/* Mobile Footer with Accordion */}
        <div className="md:hidden">
          {/* Social Icons */}
          <div className="flex justify-center mb-5">
            <div className="flex gap-5">
              <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FaTwitter size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FaFacebook size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FaLinkedin size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Direct Contact Button */}
          <a href="/contact" className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 transition-all duration-300 py-3 px-4 rounded-md mb-5 w-full active:scale-98">
            <FaEnvelope size={16} />
            <span className="text-sm font-medium">Contact Us</span>
          </a>
          
          {/* Accordion Sections */}
          {/* About Section */}
          <div className="border-b border-white/20">
            <button 
              className="w-full py-3 px-1 flex items-center justify-between active:bg-white/5 transition-colors duration-200" 
              onClick={() => toggleSection('about')}
              aria-expanded={expandedSection === 'about'}
            >
              <span className="font-semibold text-sm">About</span>
              <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expandedSection === 'about' ? 'rotate-180' : 'rotate-0'}`}>
                <FaChevronDown size={14} />
              </div>
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.82,0.2,1)]"
              style={{ 
                maxHeight: expandedSection === 'about' ? `${aboutHeight}px` : '0',
                opacity: expandedSection === 'about' ? 1 : 0,
              }}
            >
              <div ref={aboutContentRef} className="pb-3 px-1 text-xs text-white/90 leading-relaxed">
                <p className="mb-2">
                  Empowering brands through innovative podcast production and strategic audio content solutions.
                </p>
                <p className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span>1701 Rogge Ln.<br />Austin, TX 78723</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="border-b border-white/20">
            <button 
              className="w-full py-3 px-1 flex items-center justify-between active:bg-white/5 transition-colors duration-200" 
              onClick={() => toggleSection('links')}
              aria-expanded={expandedSection === 'links'}
            >
              <span className="font-semibold text-sm">Quick Links</span>
              <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expandedSection === 'links' ? 'rotate-180' : 'rotate-0'}`}>
                <FaChevronDown size={14} />
              </div>
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.82,0.2,1)]" 
              style={{ 
                maxHeight: expandedSection === 'links' ? `${linksHeight}px` : '0',
                opacity: expandedSection === 'links' ? 1 : 0
              }}
            >
              <div ref={linksContentRef} className="pb-3 grid grid-cols-2 gap-y-2 gap-x-2 text-center">
                <Link href="/" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Home</Link>
                <Link href="/blog" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Blog</Link>
                <Link href="/podcast" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Podcast</Link>
                <Link href="/contact" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Contact</Link>
                <Link href="/privacy-policy" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Privacy</Link>
                <Link href="/terms-of-service" className="text-xs text-white/90 hover:text-white py-1 px-1 transition-all duration-300 active:scale-95">Terms</Link>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-4 text-center">
            <p className="text-white/80 text-2xs">
              © {currentYear} South Lamar Studios
            </p>
          </div>
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h3 className="text-lg font-bold mb-3">South Lamar Studios</h3>
              <p className="mb-4 text-white/90 max-w-md leading-relaxed">
                Empowering brands through innovative podcast production and strategic audio content solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="text-white/80 hover:text-white transition">
                  <FaTwitter size={18} />
                </a>
                <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition">
                  <FaFacebook size={18} />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-white transition">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition">
                  <FaInstagram size={18} />
                </a>
                <a href="#" aria-label="YouTube" className="text-white/80 hover:text-white transition">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white/90 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/90 hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/podcast" className="text-white/90 hover:text-white transition">
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/90 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-3">Contact Us</h3>
              <address className="not-italic text-white/90">
                <p className="mb-2">1701 Rogge Ln.</p>
                <p className="mb-2">Austin, TX 78723</p>
                <p className="mb-2">
                  <a href="mailto:hello@southlamarstudios.com" className="hover:text-white transition">
                    hello@southlamarstudios.com
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <hr className="border-white/20 my-6" />
          
          <div className="flex justify-between items-center">
            <p className="text-white/90 text-sm">
              © {currentYear} South Lamar Studios. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-white/90 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/90 hover:text-white text-sm transition">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-white/90 hover:text-white text-sm transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 