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
import { generateSEOMetadata } from '@/utils/seo-config';

export const metadata: Metadata = generateSEOMetadata({
  title: "B2B Podcasts for Sales & Lead Gen | South Lamar Studios",
  canonical: "https://southlamarstudios.com"
});

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
