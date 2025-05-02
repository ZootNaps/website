import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ClientLogoSection from '@/components/home/ClientLogoSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProcessSection from '@/components/home/ProcessSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Your Business Name",
  description: "Transform your business with our comprehensive solutions tailored to your needs. Discover how we help businesses overcome challenges and achieve growth.",
};

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ClientLogoSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </MainLayout>
  );
}
