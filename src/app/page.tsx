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
  title: "Podcast for Sales Service: B2B Lead Generation | South Lamar Studios",
  description: "Tired of podcasts that don't drive revenue? South Lamar Studios' B2B podcast for sales service turns your show into a powerful lead generation engine. Get started!",
  openGraph: {
    title: "Podcast for Sales Service: B2B Lead Generation | South Lamar Studios",
    description: "Tired of podcasts that don't drive revenue? South Lamar Studios' B2B podcast for sales service turns your show into a powerful lead generation engine. Get started!",
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
