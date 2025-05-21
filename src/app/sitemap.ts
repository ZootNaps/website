import { MetadataRoute } from 'next';

// Placeholder function - replace with your actual data fetching logic for blog posts
async function getBlogPosts(): Promise<{ slug: string; lastModified: Date }[]> {
  // In a real app, you would fetch this from your CMS, local markdown files, etc.
  // Example for fetching from a hypothetical CMS API:
  // try {
  //   const response = await fetch('https://your-cms.com/api/posts?select=slug,updated_at');
  //   if (!response.ok) return [];
  //   const postsFromCMS = await response.json();
  //   return postsFromCMS.data.map((post: any) => ({
  //     slug: post.slug,
  //     lastModified: new Date(post.updated_at),
  //   }));
  // } catch (error) {
  //   console.error('Error fetching blog posts for sitemap:', error);
  //   return [];
  // }

  // For now, returning an empty array as there's no live blog content yet.
  // When you have blog posts, implement the fetching logic above and return real data.
  console.warn("Sitemap: getBlogPosts() is returning empty. Implement data fetching when blog is live.");
  return []; 
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
  
  const blogPostsData = await getBlogPosts();

  const blogRoutes = blogPostsData.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  // For now, return just the static routes
  return [...staticPages, ...blogRoutes];
} 