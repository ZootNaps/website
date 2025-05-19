import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/utils/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  description: "An end-to-end podcast system that turns executive interviews into qualified leads and direct sales revenue.",
  keywords: ["b2b podcast", "podcast production", "sales podcast", "executive interviews", "content marketing"],
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
    description: "An end-to-end podcast system that turns executive interviews into qualified leads and direct sales revenue.",
    siteName: "South Lamar Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "South Lamar Studios | B2B Podcast Production",
    description: "An end-to-end podcast system that turns executive interviews into qualified leads and direct sales revenue.",
    creator: "@southlamarstudios",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
