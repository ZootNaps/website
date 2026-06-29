import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script';
import { GoogleTagManager } from '@/utils/gtm';
import { Suspense } from 'react';
import { generateSEOMetadata, generateOrganizationSchema, generateWebSiteSchema, SEO_CONFIG } from '@/utils/seo-config';

// Import FontAwesome styles and config
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../lib/fontawesome';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

// Editorial serif — used ONLY on the unlisted /portfolio page. preload:false keeps
// it off every other page's critical path; the browser fetches it only when an
// element actually references font-serif.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: false,
});

export const metadata: Metadata = {
  ...generateSEOMetadata(),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://southlamarstudios.com/blog-rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                generateOrganizationSchema(),
                generateWebSiteSchema()
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans antialiased bg-bg`}>
        {/* Google Tag Manager (noscript part is inside this component too) */}
        <Suspense fallback={null}>
          <GoogleTagManager GTM_ID={process.env.NEXT_PUBLIC_GTM_ID} />
        </Suspense>

        {/* Google Analytics - will only load if NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {/* <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} /> */}
        {/* The above GoogleAnalytics component is now commented out because GA4 is being loaded via Google Tag Manager. */}
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
