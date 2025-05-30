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
  title: "Sales Development System | Get Strategic Meetings with Decision-Makers | South Lamar Studios",
  description: "Our sales development system uses podcasting to secure strategic conversations with executives who normally ignore your calls. Get qualified sales meetings, build relationships, and advance deals through your pipeline. No audience necessary.",
  openGraph: {
    title: "Sales Development System | Get Strategic Meetings with Decision-Makers | South Lamar Studios",
    description: "Our sales development system uses podcasting to secure strategic conversations with executives who normally ignore your calls. Get qualified sales meetings, build relationships, and advance deals through your pipeline. No audience necessary.",
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
