'use client';

import { useState, FormEvent } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { trackEvent } from '@/utils/analytics';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [result, setResult] = useState({
    success: false,
    error: false,
    message: '',
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult({ success: false, error: false, message: '', loading: true });
    
    const formElement = e.target as HTMLFormElement;
    const formDataObj = new FormData(formElement);
    
    // Add the access key
    formDataObj.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '');

    // Convert to object for logging
    const formProps = Object.fromEntries(formDataObj);
    console.log("Sending form data:", formProps);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();
      console.log("Response:", data);
      
      if (data.success) {
        trackEvent('form_submission', 'contact', 'Contact Form Submission');
        setResult({
          success: true,
          error: false,
          message: "Your message has been sent successfully!",
          loading: false
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      setResult({
        success: false,
        error: true,
        message: error.message || "Something went wrong, please try again later.",
        loading: false
      });
    }
  };

  return (
    <MainLayout>
      <section className="pt-28 pb-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get in Touch</h1>
            <p className="text-lg text-gray max-w-2xl mx-auto">
              Have questions or ready to start a project? Reach out to us and one of our experts will get back to you shortly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
              
              {result.success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p>{result.message}</p>
                  <button
                    className="mt-4 text-secondary hover:underline"
                    onClick={() => setResult({ success: false, error: false, message: '', loading: false })}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                  {/* Hidden Fields */}
                  <input type="hidden" name="from_name" value="South Lamar Studios Contact Form" />
                  <input type="hidden" name="subject" value="New Contact Form Submission" />
                  
                  {/* Honeypot field to prevent spam */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-dark mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-dark mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-dark mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={result.loading}
                    className={`w-full bg-secondary text-white py-3 px-8 rounded-md hover:bg-opacity-90 transition ${
                      result.loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {result.loading ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {result.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      <p className="font-bold">Error: {result.message}</p>
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