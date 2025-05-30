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
  title: "Podcast for Sales System | B2B Lead Generation | South Lamar Studios",
  description: "Our proprietary 'Podcast for Sales' system fits within your existing sales processes to generate qualified leads and drive revenue. 95% client success rate, 3x ROI in 90 days.",
  openGraph: {
    title: "Podcast for Sales System | B2B Lead Generation | South Lamar Studios",
    description: "Our proprietary 'Podcast for Sales' system fits within your existing sales processes to generate qualified leads and drive revenue. 95% client success rate, 3x ROI in 90 days.",
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
