import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/utils/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script';
import { GoogleTagManager } from '@/utils/gtm';
import { Suspense } from 'react';
import { generateSEOMetadata, generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo-config';

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

export const metadata: Metadata = {
  ...generateSEOMetadata(), // Uses default title and description from config
  title: {
    default: "B2B Podcast Production & Lead Generation | South Lamar Studios",
    template: "%s | South Lamar Studios",
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
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased bg-bg`}>
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
