'use client';

import { useState, FormEvent } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { trackEvent } from '@/utils/analytics';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Helper function to attempt submission using fetch with FormData
  const submitWithFormData = async (formElement: HTMLFormElement): Promise<any> => {
    const formDataObject = new FormData(formElement);
    
    // Ensure phone field is included even if empty
    if (!formDataObject.get('phone')) {
      formDataObject.set('phone', formData.phone || '');
    }
    
    // Add origin for CORS handling
    formDataObject.append('origin', window.location.origin);
    
    console.log('Sending payload to Web3Forms:', Object.fromEntries(formDataObject));
    console.log('Sending from origin:', window.location.origin);
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataObject,
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}. Details: ${errorText}`);
    }
    
    return await response.json();
  };
  
  // Helper function to attempt submission using fetch with JSON
  const submitWithJSON = async (): Promise<any> => {
    console.log('Trying alternative JSON approach...');
    
    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      message: formData.message,
      from_name: 'South Lamar Studios Contact Form',
      botcheck: false,
      origin: window.location.origin
    };
    
    console.log('Alternative payload:', payload);
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Alternative response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error in alternative approach! Status: ${response.status}. Details: ${errorText}`);
    }
    
    return await response.json();
  };
  
  // Helper function to attempt submission using XMLHttpRequest
  const submitWithXHR = async (): Promise<any> => {
    console.log('Trying XMLHttpRequest as last resort...');
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.web3forms.com/submit', true);
      
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            resolve(result);
          } catch (e) {
            reject(new Error('Failed to parse response: ' + xhr.responseText));
          }
        } else {
          reject(new Error('XHR failed with status: ' + this.status + ' ' + xhr.responseText));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error occurred with XMLHttpRequest'));
      };
      
      // Prepare data - simple key/value pairs
      const data = new FormData();
      data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '');
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone || '');
      data.append('subject', formData.subject || 'New Contact Form Submission');
      data.append('message', formData.message);
      data.append('from_name', 'South Lamar Studios Contact Form');
      data.append('botcheck', 'false');
      
      // Send the request
      xhr.send(data);
    });
  };
  
  // Handle successful submission
  const handleSuccess = (result: any) => {
    console.log('Submission successful:', result);
    
    // Track successful form submission
    trackEvent(
      'form_submission', 
      'contact', 
      'Contact Form Submission',
    );
    
    // Success
    setFormStatus({
      isSubmitting: false,
      isSuccess: true,
      isError: false,
      message: 'Your message has been sent successfully! We will get back to you shortly.',
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: '',
    });
    
    try {
      // Try three different approaches in sequence if earlier ones fail
      const formElement = e.target as HTMLFormElement;
      
      try {
        // First try: FormData approach
        const result = await submitWithFormData(formElement);
        if (result.success) {
          handleSuccess(result);
          return;
        }
        throw new Error(result.message || 'Failed to send message');
      } catch (formDataError) {
        console.error('FormData approach failed:', formDataError);
        
        try {
          // Second try: JSON approach
          const jsonResult = await submitWithJSON();
          if (jsonResult.success) {
            handleSuccess(jsonResult);
            return;
          }
          throw new Error(jsonResult.message || 'Failed to send message');
        } catch (jsonError) {
          console.error('JSON approach failed:', jsonError);
          
          try {
            // Third try: XHR approach
            const xhrResult = await submitWithXHR();
            if (xhrResult.success) {
              handleSuccess(xhrResult);
              return;
            }
            throw new Error(xhrResult.message || 'Failed to send message');
          } catch (xhrError) {
            console.error('XHR approach failed:', xhrError);
            throw xhrError; // Throw the XHR error to be caught by the outer catch
          }
        }
      }
    } catch (error: any) {
      // Final error handling for all approaches
      console.error('All submission approaches failed:', error);
      
      trackEvent(
        'form_error', 
        'contact', 
        `Form Error: ${error.message || 'Unknown error'}`,
      );
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || 'There was an error sending your message. Please try again.',
      });
    }
  };

  return (
    <MainLayout>
      <section className="pt-28 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to start a project? Reach out to us and one of our experts will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-600">hello@southlamarstudios.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Office</h3>
                    <p className="text-gray-600">1701 Rogge Ln.</p>
                    <p className="text-gray-600">Austin, TX 78723</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 h-64 w-full relative bg-gray-200 rounded-lg">
                {/* Map placeholder - replace with actual map component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Map Location</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              
              {formStatus.isSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p>{formStatus.message}</p>
                  <button
                    className="mt-4 text-blue-600 hover:underline"
                    onClick={() => setFormStatus((prev) => ({ ...prev, isSuccess: false }))}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
                  <input type="hidden" name="from_name" value="South Lamar Studios Contact Form" />
                  <input type="hidden" name="subject" value="New Contact Form Submission" />
                  
                  {/* Honeypot field for spam protection - should remain unchecked */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
                      formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {formStatus.isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      <p className="font-bold">Error: {formStatus.message}</p>
                      <p className="text-sm mt-2">Please try again or contact us directly at hello@southlamarstudios.com</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 