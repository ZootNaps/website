import { getBlogPosts } from '@/lib/contentful/client';
import ClientBlogPage from './client';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast for Sales Insights & B2B Lead Generation Strategies | South Lamar Studios",
  description: "Expert strategies and insights on our 'Podcast for Sales' system, sales-first podcasting, and using executive interviews to generate qualified leads and drive revenue.",
  keywords: [
    "podcast for sales",
    "sales-first podcasting",
    "b2b lead generation",
    "podcast production tips",
    "executive interviews",
    "sales process integration",
    "qualified lead generation"
  ],
  openGraph: {
    title: "Podcast for Sales Insights & B2B Lead Generation Strategies | South Lamar Studios",
    description: "Expert strategies and insights on our 'Podcast for Sales' system, sales-first podcasting, and using executive interviews to generate qualified leads and drive revenue.",
    type: "website",
  },
};

// Construct Blog schema data
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "South Lamar Studios Blog",
  "description": metadata.description,
  "url": metadata.openGraph?.url,
  "publisher": {
    "@type": "Organization",
    "name": "South Lamar Studios",
    "logo": {
      "@type": "ImageObject",
      "url": "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": metadata.openGraph?.url
  },
  "blogPost": []
};

// Make page dynamic to fetch fresh data on each request
export const revalidate = 3600; // Revalidate at most once per hour

export default async function BlogPage() {
  // Fetch blog posts from Contentful
  const allBlogPosts = await getBlogPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...allBlogPosts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  // Extract unique categories from all posts
  const allCategories = ['All', ...new Set(sortedPosts.map(post => post.category).filter(Boolean) as string[])];
  
  // Update schema with actual posts
  const blogSchemaWithPosts = {
    ...blogSchema,
    blogPost: sortedPosts.map(post => ({
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://southlamarstudios.com/blog/${post.slug}`
      },
      "headline": post.title,
      "image": post.featuredImage?.url ? `https:${post.featuredImage.url}` : "",
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "author": {
        "@type": "Organization",
        "name": "South Lamar Studios"
      },
      "publisher": {
        "@type": "Organization",
        "name": "South Lamar Studios",
        "logo": {
          "@type": "ImageObject",
          "url": "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png"
        }
      },
      "description": post.metaDescription || post.excerpt
    }))
  };

  return (
    <ClientBlogPage 
      initialPosts={sortedPosts} 
      initialCategories={allCategories}
      schemaData={JSON.stringify(blogSchemaWithPosts)}
    />
  );
} 