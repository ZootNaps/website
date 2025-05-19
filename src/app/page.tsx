import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ClientLogoSection from '@/components/home/ClientLogoSection';
import MetricsSection from '@/components/home/MetricsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProcessSection from '@/components/home/ProcessSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Podcast Production That Generates Leads | South Lamar Studios",
  description: "South Lamar Studios provides end-to-end B2B podcast production services that turn executive interviews into qualified leads and sales revenue. Full-service podcast production, distribution, and audience growth strategies.",
  openGraph: {
    title: "B2B Podcast Production That Generates Leads | South Lamar Studios",
    description: "South Lamar Studios provides end-to-end B2B podcast production services that turn executive interviews into qualified leads and sales revenue. Full-service podcast production, distribution, and audience growth strategies.",
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
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </MainLayout>
  );
}
