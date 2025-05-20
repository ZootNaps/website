import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <MainLayout>
      <div className="pt-28 pb-20 flex items-center justify-center flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <svg 
              className="w-20 h-20 text-secondary mx-auto mb-6" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd"
              />
            </svg>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your message has been received. We'll get back to you as soon as possible.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Back to Home
              </Link>
              
              <Link 
                href="/contact" 
                className="border border-primary text-primary hover:bg-gray-50 font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Send Another Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 