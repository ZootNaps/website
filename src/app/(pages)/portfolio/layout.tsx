import type { Metadata } from "next";
import { ReactNode } from "react";

// This page is intentionally UNLISTED. `robots: { index: false, follow: false }`
// keeps it out of search engines. It is also omitted from the sitemap and is not
// linked anywhere in the site nav/header/footer. Reach it only via the direct URL.
export const metadata: Metadata = {
  title: "Portfolio | Gus Joseph",
  description: "Content work by Gus Joseph — YouTube, podcasts, and client videos.",
  robots: { index: false, follow: false },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
