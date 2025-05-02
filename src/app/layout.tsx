import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Your Business Name | Service Description",
    template: "%s | Your Business Name",
  },
  description: "Comprehensive description of your business services and value proposition for better SEO ranking.",
  keywords: ["keyword1", "keyword2", "your industry", "your service"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name or Company",
  publisher: "Your Company Name",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Your Business Name | Service Description",
    description: "Comprehensive description of your business services and value proposition.",
    siteName: "Your Business Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Business Name | Service Description",
    description: "Comprehensive description of your business services and value proposition.",
    creator: "@yourtwitter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
