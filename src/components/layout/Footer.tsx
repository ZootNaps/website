'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const companyTagline = "Podcasts that help you sell. Turn executive interviews into strategic partnerships with our 'Podcast for Sales' system.";
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
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 active:scale-95">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          
          {/* Direct Contact Button */}
          <a href="/contact" className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 transition-all duration-300 py-3 px-4 rounded-md mb-5 w-full active:scale-98 text-white">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            <span className="text-sm font-medium">Contact Us</span>
          </a>
          
          {/* Accordion Sections */}
          {/* About Section */}
          <div className="border-b border-white/20">
            <button 
              className="w-full py-3 px-1 flex items-center justify-between active:bg-white/5 transition-colors duration-200 text-white" 
              onClick={() => toggleSection('about')}
              aria-expanded={expandedSection === 'about'}
            >
              <span className="font-semibold text-sm text-white">About</span>
              <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expandedSection === 'about' ? 'rotate-180' : 'rotate-0'} text-white`}>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </div>
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.82,0.2,1)]"
              style={{ 
                maxHeight: expandedSection === 'about' ? `${aboutHeight}px` : '0',
                opacity: expandedSection === 'about' ? 1 : 0,
              }}
            >
              <div ref={aboutContentRef} className="pb-3 px-1 text-xs leading-relaxed">
                <p className="mb-2 text-white">
                  {companyTagline}
                </p>
                <p className="flex items-start gap-2 text-white">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 flex-shrink-0 text-white" />
                  <span className="text-white">1701 Rogge Ln.<br />Austin, TX 78723</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="border-b border-white/20">
            <button 
              className="w-full py-3 px-1 flex items-center justify-between active:bg-white/5 transition-colors duration-200 text-white" 
              onClick={() => toggleSection('links')}
              aria-expanded={expandedSection === 'links'}
            >
              <span className="font-semibold text-sm text-white">Quick Links</span>
              <div className={`transform transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expandedSection === 'links' ? 'rotate-180' : 'rotate-0'} text-white`}>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
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
                <Link href="/" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Home</Link>
                <Link href="/blog" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Learn</Link>
                <Link href="/podcast" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Podcast</Link>
                <Link href="/contact" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Contact</Link>
                <Link href="/privacy-policy" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Privacy</Link>
                <Link href="/terms-of-service" className="text-xs hover:text-secondary py-1 px-1 transition-all duration-300 active:scale-95 text-white">Terms</Link>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-4 text-center">
            <p className="text-2xs text-white">
              © {currentYear} South Lamar Studios
            </p>
          </div>
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h3 className="text-lg font-bold mb-3 text-white">South Lamar Studios</h3>
              <p className="mb-4 max-w-md leading-relaxed text-white">
                {companyTagline}
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="text-white hover:text-secondary transition">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="#" aria-label="Facebook" className="text-white hover:text-secondary transition">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-white hover:text-secondary transition">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
                <a href="#" aria-label="Instagram" className="text-white hover:text-secondary transition">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="#" aria-label="YouTube" className="text-white hover:text-secondary transition">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white hover:text-secondary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white hover:text-secondary transition">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/podcast" className="text-white hover:text-secondary transition">
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white hover:text-secondary transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-white">Contact Us</h3>
              <address className="not-italic">
                <p className="mb-2 text-white">1701 Rogge Ln.</p>
                <p className="mb-2 text-white">Austin, TX 78723</p>
                <p className="mb-2">
                  <a href="mailto:hello@southlamarstudios.com" className="hover:text-secondary transition text-white">
                    hello@southlamarstudios.com
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <hr className="border-white/20 my-6" />
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-white">
              © {currentYear} South Lamar Studios. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="hover:text-secondary text-sm transition text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-secondary text-sm transition text-white">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-secondary text-sm transition text-white">
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