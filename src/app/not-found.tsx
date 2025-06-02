import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | South Lamar Studios',
  description: 'The page you\'re looking for doesn\'t exist. Visit our homepage to explore our B2B podcast production services.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary mb-8">
            The page you're looking for doesn't exist. It may have been moved, deleted, or you may have mistyped the URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="btn inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 transition-colors rounded-lg"
          >
            Return Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Contact Us
            </Link>
            <span className="hidden sm:inline text-secondary">•</span>
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 