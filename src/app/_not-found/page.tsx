'use client';

import { Suspense } from 'react';
import NotFound from '../not-found';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NotFound />
    </Suspense>
  );
} 