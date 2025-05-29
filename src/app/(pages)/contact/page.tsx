'use client';

import MainLayout from '@/components/layout/MainLayout';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
      <section className="pt-28 pb-20 relative overflow-hidden bg-linear-to-br from-primary-50 via-bg-light to-primary-100">
        {/* Decorative background elements - subtle and professional */}
        <motion.div 
          className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/3 to-primary/8 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Subtle decorative circles */}
        <motion.div 
          className="absolute right-0 top-20 w-64 h-64 bg-secondary/8 rounded-full blur-3xl z-0"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 w-40 h-40 bg-primary/8 rounded-full blur-2xl z-0"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header section with enhanced styling */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">Get in Touch</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to get started? Or want to learn more? Send us a message and our team will get back to you within a few hours.
            </p>
          </motion.div>
          
          {/* Form container with enhanced design */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-medium border border-white/50 p-8 md:p-12 relative overflow-hidden">
              {/* Subtle gradient border effect */}
              <div className="absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent to-primary/5 rounded-2xl" />
              
              <div className="relative z-10">
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
                  <input type="hidden" name="redirect" value="https://southlamarstudios.com/thank-you" />
                  
                  {/* Honeypot field to prevent spam */}
                  <input type="checkbox" name="botcheck" className="hidden" />
                  
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="Your name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      placeholder="Enter your message"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all duration-300 text-gray-700 bg-white hover:border-gray-300 resize-none"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      type="submit"
                      className="w-full bg-linear-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-secondary/50 text-lg"
                    >
                      Submit Message
                    </button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 