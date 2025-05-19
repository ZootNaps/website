import Link from 'next/link';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">South Lamar Studios</h3>
            <p className="mb-4 text-white opacity-80 max-w-xs">
              Empowering brands through innovative podcast production and strategic audio content solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white opacity-80 hover:opacity-100 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white opacity-80 hover:opacity-100 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-white opacity-80 hover:opacity-100 transition">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white opacity-80 hover:opacity-100 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-white opacity-80">
              <p className="mb-2">1701 Rogge Ln.</p>
              <p className="mb-2">Austin, TX 78723</p>
              <p className="mb-2">
                <a href="mailto:hello@southlamarstudios.com" className="hover:opacity-100 transition">
                  hello@southlamarstudios.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <hr className="border-white border-opacity-20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white opacity-80 text-sm">
            © {currentYear} South Lamar Studios LLC. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-white opacity-80 hover:opacity-100 text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white opacity-80 hover:opacity-100 text-sm transition">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-white opacity-80 hover:opacity-100 text-sm transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 