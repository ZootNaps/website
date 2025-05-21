import type { Metadata } from "next";
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Contact Us | South Lamar Studios",
  description: "Get in touch with South Lamar Studios to discuss your B2B podcasting needs. Schedule a free consultation today to learn how our podcast for sales service can generate leads and revenue.",
  openGraph: {
    title: "Contact Us | South Lamar Studios",
    description: "Schedule a free consultation with South Lamar Studios.",
    url: "https://southlamarstudios.com/contact",
  }
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 