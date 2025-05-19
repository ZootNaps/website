import { getServerSideSitemap } from 'next-sitemap';
import { MetadataRoute } from 'next';
import type { ISitemapField } from 'next-sitemap';

export async function GET() {
  // In a real application, you would fetch this data from your CMS or database
  // For now, we'll use placeholder data
  
  // Sample podcast episodes for the sitemap
  const podcastEpisodes = [
    { slug: 'building-saas-business', lastModified: new Date('2023-06-10') },
    { slug: 'pivoting-uncertain-times', lastModified: new Date('2023-05-18') },
    { slug: 'art-of-bootstrapping', lastModified: new Date('2023-04-22') },
    { slug: 'building-company-culture', lastModified: new Date('2023-03-15') },
    { slug: 'corporate-to-entrepreneur', lastModified: new Date('2023-02-28') },
  ];
  
  // Sample blog posts for the sitemap
  const blogPosts = [
    { slug: 'understanding-digital-transformation', lastModified: new Date('2023-06-15') },
    { slug: 'improve-business-efficiency', lastModified: new Date('2023-05-22') },
    { slug: 'future-of-remote-work', lastModified: new Date('2023-04-10') },
    { slug: 'customer-centric-business-strategy', lastModified: new Date('2023-03-18') },
    { slug: 'data-analytics-decision-making', lastModified: new Date('2023-02-05') },
    { slug: 'sustainable-business-practices', lastModified: new Date('2023-01-20') },
  ];
  
  const baseUrl = process.env.SITE_URL || 'https://southlamarstudios.com';
  
  // Create entries for podcast episodes
  const podcastFields: ISitemapField[] = podcastEpisodes.map(episode => ({
    loc: `${baseUrl}/podcast/${episode.slug}`,
    lastmod: episode.lastModified.toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));
  
  // Create entries for blog posts
  const blogFields: ISitemapField[] = blogPosts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.lastModified.toISOString(),
    changefreq: 'monthly',
    priority: 0.6,
  }));
  
  // Combine all sitemap fields
  const allFields = [...podcastFields, ...blogFields];
  
  // Return the sitemap XML
  return getServerSideSitemap(allFields);
} 