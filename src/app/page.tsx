import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ClientLogoSection from '@/components/home/ClientLogoSection';
import MetricsSection from '@/components/home/MetricsSection';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
import ProcessSection from '@/components/home/ProcessSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcasts that Sell: Podcast Driven Lead Gen | South Lamar Studios",
  description: "The only B2B podcast agency focused on sales results. We help you book executive guests, conduct strategic interviews, and convert conversations into qualified leads.",
  openGraph: {
    title: "Podcasts that Sell: Podcast Driven Lead Gen | South Lamar Studios",
    description: "The only B2B podcast agency focused on sales results. We help you book executive guests, conduct strategic interviews, and convert conversations into qualified leads.",
    url: "https://southlamarstudios.com",
    type: "website",
  }
};

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ClientLogoSection />
      <MetricsSection />
      <WhatWeDoSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </MainLayout>
  );
}
