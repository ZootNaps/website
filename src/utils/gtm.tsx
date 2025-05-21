'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Declare dataLayer and ensure gtag type matches the one in analytics.tsx
declare global {
  interface Window {
    dataLayer: any[];
    // gtag is also used by GA4. GTM can work alongside it or manage it.
    // We'll keep the existing GA4 gtag signature for now, 
    // as GTM's own gtag interactions are usually via dataLayer.push
    gtag: (
      command: 'config' | 'event' | 'js', 
      targetId: string | Date, // Matches the 'targetId' name from analytics.tsx
      config?: Record<string, any> // Matches the type from analytics.tsx
    ) => void;
  }
}

// Helper to push events to the dataLayer
export const pushToDataLayer = (event: string, data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Ensure event is always present
    window.dataLayer.push({ event, ...data });
  } else {
    console.warn('DataLayer not available. GTM might not be initialized.');
  }
};

export function GoogleTagManager({ GTM_ID }: { GTM_ID?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GTM_ID) { // GTM_ID check is sufficient, dataLayer init is in script
      const pagePath = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
      console.log(`GTM: Page view for ${pagePath}`); // For debugging
      window.dataLayer = window.dataLayer || []; // Ensure dataLayer is initialized
      window.dataLayer.push({
        event: 'page_view', // This is a common event name for page views in GTM
        page_path: pagePath,
        // You might want to add other relevant data for page views here
        // For example, page_title: document.title (though GTM can often capture this automatically)
      });
    }
  }, [pathname, searchParams, GTM_ID]);

  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager Script (goes in <head>) */}
      <Script
        id="gtm-script-head"
        strategy="afterInteractive" // Load GTM after the page is interactive
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      {/* Google Tag Manager <noscript> (goes immediately after <body> tag) */}
      {/* In Next.js, this is best placed inside the <body> of your RootLayout */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    </>
  );
} 