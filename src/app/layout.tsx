import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/utils/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script';
import { GoogleTagManager } from '@/utils/gtm';
import { Suspense } from 'react';

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
  title: {
    default: "South Lamar Studios | B2B Podcast Production & Lead Generation",
    template: "%s | South Lamar Studios",
  },
  description: "Transform your B2B podcast into a powerful sales engine. South Lamar Studios specializes in podcast production, guest outreach, and lead generation strategies that drive revenue for businesses. No large audience required.",
  keywords: [
    "b2b podcast production", 
    "podcast lead generation", 
    "business podcast services", 
    "podcast guest outreach", 
    "b2b content marketing", 
    "podcast sales funnel", 
    "executive interview podcast", 
    "podcast audience growth", 
    "revenue-generating podcast",
    "podcast marketing strategy",
    "thought leadership podcast",
    "podcast for sales",
    "b2b podcast agency",
    "podcast production austin",
    "business development podcast",
    "podcast roi measurement",
    "strategic podcast consulting",
    "podcast guest booking",
    "b2b sales podcast",
    "podcast monetization"
  ],
  authors: [{ name: "Gus Joseph" }],
  creator: "South Lamar Studios",
  publisher: "South Lamar Studios",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://southlamarstudios.com",
    title: "South Lamar Studios | B2B Podcast Production & Lead Generation",
    description: "Transform your B2B podcast into a powerful sales engine. Expert podcast production, guest outreach, and lead generation strategies that drive revenue for businesses.",
    siteName: "South Lamar Studios",
    images: [
      {
        url: "https://southlamarstudios.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "South Lamar Studios B2B Podcast Production & Lead Generation",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Lamar Studios | B2B Podcast Production & Lead Generation",
    description: "Transform your B2B podcast into a powerful sales engine. Expert podcast production, guest outreach, and lead generation strategies that drive revenue for businesses.",
    creator: "@southlamarstudios",
    images: ["https://southlamarstudios.com/images/twitter-image.jpg"],
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
                {
                  "@type": "Organization",
                  "name": "South Lamar Studios",
                  "url": "https://www.southlamarstudios.com",
                  "logo": "https://www.southlamarstudios.com/images/sls-logos/sls-logo-default.png",
                  "description": "South Lamar Studios\' B2B podcast for sales service turns your show into a powerful lead generation engine, helping you connect with executives and drive revenue.",
                  "sameAs": [
                    "https://www.linkedin.com/company/southlamarstudios"
                    // Add other official social profiles here from existing if accurate:
                    // e.g., "https://twitter.com/southlamarstudios",
                    // "https://www.facebook.com/southlamarstudios"
                  ]
                },
                {
                  "@type": "WebSite",
                  "url": "https://www.southlamarstudios.com",
                  "name": "South Lamar Studios",
                  "description": "Official website for South Lamar Studios. We provide B2B podcast for sales services designed to generate leads and drive revenue.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "South Lamar Studios",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.southlamarstudios.com/images/sls-logos/sls-logo-default.png"
                    }
                  }
                }
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
