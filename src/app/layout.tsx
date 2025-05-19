import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/utils/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script';

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
    default: "South Lamar Studios | B2B Podcast Production",
    template: "%s | South Lamar Studios",
  },
  description: "End-to-end B2B podcast production service that transforms executive interviews into qualified leads and sales revenue. Expert production, distribution, and audience growth.",
  keywords: [
    "b2b podcast production", 
    "executive interview podcast", 
    "podcast lead generation", 
    "b2b content marketing", 
    "podcast sales funnel", 
    "business podcast production", 
    "podcast audience growth", 
    "revenue-generating podcast",
    "podcast marketing strategy",
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
    type: "website",
    locale: "en_US",
    url: "https://southlamarstudios.com",
    title: "South Lamar Studios | B2B Podcast Production",
    description: "End-to-end B2B podcast production service that transforms executive interviews into qualified leads and sales revenue. Expert production, distribution, and audience growth.",
    siteName: "South Lamar Studios",
    images: [
      {
        url: "https://southlamarstudios.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "South Lamar Studios B2B Podcast Production",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Lamar Studios | B2B Podcast Production",
    description: "End-to-end B2B podcast production service that transforms executive interviews into qualified leads and sales revenue. Expert production, distribution, and audience growth.",
    creator: "@southlamarstudios",
    images: ["https://southlamarstudios.com/images/twitter-image.jpg"],
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
              "@type": "Organization",
              "name": "South Lamar Studios",
              "url": "https://southlamarstudios.com",
              "logo": "https://southlamarstudios.com/images/logo.png",
              "description": "End-to-end B2B podcast production service that transforms executive interviews into qualified leads and sales revenue.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-512-555-1234",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/southlamarstudios",
                "https://www.linkedin.com/company/south-lamar-studios",
                "https://www.facebook.com/southlamarstudios"
              ],
              "service": {
                "@type": "Service",
                "name": "B2B Podcast Production",
                "description": "End-to-end podcast production service that turns executive interviews into qualified leads and direct sales revenue.",
                "provider": {
                  "@type": "Organization",
                  "name": "South Lamar Studios"
                },
                "serviceType": "Podcast Production"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}>
        {/* Google Analytics - will only load if NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
