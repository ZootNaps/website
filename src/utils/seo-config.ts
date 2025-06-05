import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteName: "South Lamar Studios",
  siteUrl: "https://southlamarstudios.com",
  defaultTitle: "B2B Podcast Production & Lead Generation | South Lamar Studios", 
  defaultDescription: "The only B2B podcast agency focused on sales results. We help you book executive guests, conduct strategic interviews, and convert conversations into qualified leads.",
  
  // Schema.org data
  organization: {
    name: "South Lamar Studios",
    url: "https://southlamarstudios.com",
    description: "The only B2B podcast agency focused on sales results. We help you book executive guests, conduct strategic interviews, and convert conversations into qualified leads.",
    foundingDate: "2020",
    logo: "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png"
  },
  
  social: {
    twitter: "@southlamarstudios",
    linkedin: "https://www.linkedin.com/company/southlamarstudios"
  },

  keywords: [
    "b2b podcast production", 
    "podcast lead generation", 
    "business podcast services", 
    "podcast guest outreach", 
    "b2b content marketing", 
    "podcast sales funnel", 
    "executive interview podcast", 
    "podcast audience growth", 
    "revenue-generating podcast",
    "podcast marketing strategy",
    "thought leadership podcast",
    "podcast for sales",
    "b2b podcast agency",
    "podcast production austin",
    "business development podcast",
    "podcast roi measurement",
    "strategic podcast consulting",
    "podcast guest booking",
    "b2b sales podcast",
    "podcast monetization"
  ]
};

// Utility function for consistent metadata generation
interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEOMetadata({
  title,
  description = SEO_CONFIG.defaultDescription,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  
  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: fullTitle,
    description,
    keywords: SEO_CONFIG.keywords,
    authors: [{ name: "Gus Joseph" }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonical || SEO_CONFIG.siteUrl,
      title: fullTitle,
      description,
      siteName: SEO_CONFIG.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: SEO_CONFIG.social.twitter,
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

// Schema.org generation utilities
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.organization.name,
    url: SEO_CONFIG.organization.url,
    logo: SEO_CONFIG.organization.logo,
    description: SEO_CONFIG.organization.description,
    foundingDate: SEO_CONFIG.organization.foundingDate,
    sameAs: [SEO_CONFIG.social.linkedin]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.defaultTitle, // This fixes the title conflict!
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      "@id": `${SEO_CONFIG.siteUrl}/#organization`
    }
  };
} 