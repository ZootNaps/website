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
    default: "South Lamar Studios | Podcast for Sales System & B2B Lead Generation",
    template: "%s | South Lamar Studios"
  },
  description: "Our proprietary 'Podcast for Sales' system fits seamlessly within your existing sales processes. 95% client success rate, 3x ROI in 90 days. No large audience required - focus on qualified leads and revenue.",
  keywords: [
    "podcast for sales",
    "b2b podcast production",
    "sales-first podcasting",
    "business podcast services",
    "podcast lead generation",
    "no audience required",
    "podcast audience growth",
    "sales process integration",
    "podcast marketing strategy",
    "qualified lead generation",
    "b2b sales tool",
    "b2b podcast agency",
    "podcast production austin",
    "executive interviews",
    "soft-sell strategy",
    "b2b content marketing",
    "podcast guest outreach",
    "b2b podcast for sales",
    "podcast monetization",
    "strategic podcast consulting",
    "podcast guest booking",
    "b2b podcast for sales",
    "podcast roi measurement",
    "thought leadership podcast"
  ],
  authors: [{ name: "Gus Joseph" }],
  creator: "South Lamar Studios",
  publisher: "South Lamar Studios",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "South Lamar Studios | Podcast for Sales System & B2B Lead Generation",
    description: "Our proprietary 'Podcast for Sales' system fits seamlessly within your existing sales processes. 95% client success rate, 3x ROI in 90 days.",
    url: "https://southlamarstudios.com",
    siteName: "South Lamar Studios",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/sls-logos/sls-logo-og.png",
        width: 1200,
        height: 630,
        alt: "South Lamar Studios Podcast for Sales System & B2B Lead Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Lamar Studios | Podcast for Sales System & B2B Lead Generation",
    description: "Our proprietary 'Podcast for Sales' system fits seamlessly within your existing sales processes. 95% client success rate, 3x ROI in 90 days.",
    images: ["/images/sls-logos/sls-logo-og.png"],
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
                  "alternateName": "SLS",
                  "url": "https://southlamarstudios.com",
                  "logo": "https://southlamarstudios.com/images/sls-logos/sls-logo.png",
                  "sameAs": [
                    "https://linkedin.com/company/south-lamar-studios"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-512-555-0123",
                    "contactType": "customer service",
                    "availableLanguage": "en"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Austin",
                    "addressRegion": "TX",
                    "addressCountry": "US"
                  },
                  "description": "South Lamar Studios' proprietary 'Podcast for Sales' system helps B2B companies generate qualified leads and drive revenue through strategic executive interviews and sales process integration.",
                  "founder": {
                    "@type": "Person",
                    "name": "Gus Joseph"
                  },
                  "foundingDate": "2023",
                  "numberOfEmployees": "2-10",
                  "knowsAbout": [
                    "Podcast for Sales",
                    "B2B Lead Generation", 
                    "Sales-First Podcasting",
                    "Executive Interviews",
                    "Sales Process Integration"
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
                },
                {
                  "@type": "Service",
                  "name": "Podcast for Sales System",
                  "provider": {
                    "@type": "Organization",
                    "name": "South Lamar Studios"
                  },
                  "description": "Proprietary 'Podcast for Sales' system that integrates seamlessly with existing B2B sales processes to generate qualified leads through strategic executive interviews and relationship building.",
                  "serviceType": "B2B Lead Generation",
                  "areaServed": "United States"
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
