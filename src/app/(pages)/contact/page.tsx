'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function ContactPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d0880bce-6a99-46c4-9618-62faa459fb07",
          name: (form.elements.namedItem('name') as HTMLInputElement).value,
          email: (form.elements.namedItem('email') as HTMLInputElement).value,
          message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
          from_name: "South Lamar Studios Contact Form",
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      if (result.success) {
        console.log(result);
        alert("Message sent successfully!");
        form.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <MainLayout>
      <section className="pt-28 pb-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get in Touch</h1>
            <p className="text-lg text-gray max-w-2xl mx-auto">
              Ready to get started? Or want to learn more? Send us an email and our team will get back to you within a few hours
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required 
                    placeholder="Your name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required 
                    placeholder="email@example.com" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-dark mb-1">
                    Message
                  </label>
                  <textarea 
                    name="message" 
                    id="message"
                    required 
                    rows={6}
                    placeholder="Enter Message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-secondary text-white py-3 px-8 rounded-md hover:bg-opacity-90 transition font-medium"
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 