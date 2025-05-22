import { getBlogPosts } from '@/lib/contentful/client';
import ClientBlogPage from './client';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Podcast & Content Marketing Insights | South Lamar Studios",
  description: "Expert tips, strategies, and case studies on B2B podcast production, content marketing, and using thought leadership to generate qualified leads and revenue.",
  keywords: [
    "b2b podcast insights", 
    "content marketing strategy", 
    "podcast production tips", 
    "lead generation content", 
    "thought leadership marketing",
    "b2b content strategy",
    "podcast ROI",
    "business podcasting guide"
  ],
  openGraph: {
    title: "B2B Podcast & Content Marketing Insights | South Lamar Studios",
    description: "Expert tips, strategies, and case studies on B2B podcast production, content marketing, and using thought leadership to generate qualified leads and revenue.",
    url: "https://southlamarstudios.com/blog",
    type: "website",
  }
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