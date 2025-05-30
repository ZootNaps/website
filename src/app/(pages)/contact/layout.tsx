import type { Metadata } from "next";
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Schedule Your Podcast for Sales Consultation | South Lamar Studios",
  description: "Schedule a free 'Podcast for Sales' strategy consultation. Learn how our proprietary system fits within your existing sales processes to generate qualified leads and drive revenue.",
  openGraph: {
    title: "Contact Us | South Lamar Studios",
    description: "Schedule a free consultation with South Lamar Studios.",
    url: "https://southlamarstudios.com/contact",
  }
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 