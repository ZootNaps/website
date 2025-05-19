'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function CanonicalUrl({ baseUrl = 'https://southlamarstudios.com' }: { baseUrl?: string }) {
  const pathname = usePathname();
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 