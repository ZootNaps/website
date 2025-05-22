import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/contentful/client';

// Function to get blog posts for the sitemap
async function getBlogPostsForSitemap(): Promise<{ slug: string; lastModified: Date }[]> {
  try {
    const posts = await getBlogPosts();
    
    // Only include published posts in the sitemap
    return posts
      .filter(post => post.status === 'Published')
      .map(post => ({
        slug: post.slug,
        lastModified: new Date(post.publishDate),
      }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://southlamarstudios.com';
  
  // Define your static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
  
  const blogPostsData = await getBlogPostsForSitemap();

  const blogRoutes = blogPostsData.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [...staticPages, ...blogRoutes];
} 