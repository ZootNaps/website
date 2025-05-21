import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { getBlogPosts } from '@/lib/contentful/client';

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
  const blogPosts = await getBlogPosts();
  
  // Update schema with actual posts
  const blogSchemaWithPosts = {
    ...blogSchema,
    blogPost: blogPosts.map(post => ({
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
      "description": post.excerpt
    }))
  };

  return (
    <MainLayout>
      <Script 
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchemaWithPosts) }}
      />
      <section className="pt-28 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, trends, and news from our team of experts.
            </p>
          </div>
          
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    {post.featuredImage ? (
                      <Image 
                        src={`https:${post.featuredImage.url}`}
                        alt={post.featuredImage.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500">Featured Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className="text-blue-600 font-medium">Blog</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No blog posts found. Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
} 