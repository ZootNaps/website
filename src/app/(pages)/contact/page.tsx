'use client';

import MainLayout from '@/components/layout/MainLayout';
import { useEffect, useRef } from 'react';

export default function ContactPage() {
  // Use a ref to get the form element
  const formRef = useRef<HTMLFormElement>(null);
  
  // Use useEffect to reset the form after the component mounts (client-side only)
  useEffect(() => {
    // Reset the form when the component mounts
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);
  
  return (
    <MainLayout>
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to get started? Or want to learn more? Send us a message and our team will get back to you within a few hours.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <form 
                id="form" 
                ref={formRef}
                action="https://api.web3forms.com/submit" 
                method="POST"
              >
                {/* Required: Access key */}
                <input type="hidden" name="access_key" value="d0880bce-6a99-46c4-9618-62faa459fb07" />
                
                {/* Custom from name */}
                <input type="hidden" name="from_name" value="South Lamar Studios Contact Form" />
                
                {/* Pre-defined subject */}
                <input type="hidden" name="subject" value="South Lamar Studios - New Form Submission" />
                
                {/* Redirect URL */}
                <input type="hidden" name="redirect" value="/thank-you" />
                
                {/* Honeypot field to prevent spam */}
                <input type="checkbox" name="botcheck" className="hidden" />
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Enter your message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
                >
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 