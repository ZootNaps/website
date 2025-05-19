'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <Link
        href="/"
        className="bg-secondary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md text-center transition"
      >
        Return Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <NotFoundContent />
      </Suspense>
    </MainLayout>
  );
} 