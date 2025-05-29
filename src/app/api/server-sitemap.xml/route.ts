import { getServerSideSitemap } from 'next-sitemap';
import { MetadataRoute } from 'next';
import type { ISitemapField } from 'next-sitemap';
import { getBlogPosts, getPodcastEpisodes } from '@/lib/contentful/client';

export async function GET() {
  try {
    // Fetch real data from Contentful
    const [blogPosts, podcastEpisodes] = await Promise.all([
      getBlogPosts(),
      getPodcastEpisodes()
    ]);
    
    const baseUrl = process.env.SITE_URL || 'https://southlamarstudios.com';
    
    // Create entries for podcast episodes
    const podcastFields: ISitemapField[] = podcastEpisodes
      .filter(episode => episode.slug)
      .map(episode => ({
        loc: `${baseUrl}/podcast/${episode.slug}`,
        lastmod: new Date(episode.publishDate).toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      }));
    
    // Create entries for blog posts
    const blogFields: ISitemapField[] = blogPosts
      .filter(post => post.status === 'Published' && post.slug)
      .map(post => ({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: new Date(post.publishDate).toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      }));
    
    // Combine all sitemap fields
    const allFields = [...podcastFields, ...blogFields];
    
    // Return the sitemap XML
    return getServerSideSitemap(allFields);
  } catch (error) {
    console.error('Error generating server sitemap:', error);
    
    // Return empty sitemap on error
    return getServerSideSitemap([]);
  }
} 