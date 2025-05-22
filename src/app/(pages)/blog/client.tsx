'use client';

import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

// Define BlogPost type for client component
type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  publishDate: string;
  featuredImage: {
    url: string;
    title: string;
    description: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    bio: string;
    picture: {
      url: string;
    } | null;
  } | null;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  tags?: string[];
  status?: string;
  isFeatured?: boolean;
  category?: string;
  readingTimeMinutes?: number;
};

// Helper function for formatting dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Calculate reading time function
const calculateReadingTime = (content: any): number => {
  if (!content) return 2; // Default if no content
  // Extract all text from rich text content
  const text = JSON.stringify(content);
  // Count words (approximately)
  const wordCount = text.split(/\s+/).length;
  // Assume average reading speed of 225 words per minute
  const readingTime = Math.ceil(wordCount / 225);
  return readingTime || 1; // Minimum 1 minute
};

export default function ClientBlogPage({ 
  initialPosts, 
  initialCategories, 
  schemaData 
}: { 
  initialPosts: BlogPost[], 
  initialCategories: string[],
  schemaData: string
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  
  // Initialize with data from server component
  useEffect(() => {
    filterPosts(activeCategory);
  }, [activeCategory, initialPosts]);
  
  // Filter posts by category
  const filterPosts = (category: string) => {
    let filtered = [...initialPosts];
    
    // Apply category filter if not "All"
    if (category !== 'All') {
      filtered = filtered.filter(post => post.category === category);
    }
    
    // Split into featured and regular posts
    const featured = filtered.filter(post => post.isFeatured);
    // If no featured posts are available in the current filter, use the first post
    const featuredToUse = featured.length > 0 ? featured : (filtered.length > 0 ? [filtered[0]] : []);
    
    // Regular posts (excluding featured ones)
    const regular = filtered.filter(post => !featuredToUse.includes(post));
    
    setFeaturedPosts(featuredToUse);
    setRegularPosts(regular);
    setFilteredPosts(filtered);
  };

  return (
    <MainLayout>
      <Script 
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaData }}
      />
      
      {/* Blog Header with Gradient Background */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-bg to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Insights & Resources</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, trends, and news from our team of experts.
            </p>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {initialCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors duration-300 shadow-sm ${
                  activeCategory === category 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-primary border-b border-gray-200 pb-2">Featured Content</h2>
            
            <div className="grid grid-cols-1 gap-10">
              {featuredPosts.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-60 md:h-auto relative">
                      {post.featuredImage ? (
                        <Image 
                          src={`https:${post.featuredImage.url}`}
                          alt={post.featuredImage.title || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="bg-bg h-full w-full flex items-center justify-center">
                          <span className="text-gray-400">Featured Image</span>
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6 md:w-1/2 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <time dateTime={post.publishDate}>
                            {formatDate(post.publishDate)}
                          </time>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <FaClock className="w-3 h-3 mr-1" />
                            {post.readingTimeMinutes || calculateReadingTime(post.content)} min read
                          </span>
                        </div>
                        <span className="text-secondary font-medium group-hover:underline">Read more</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Regular Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-primary border-b border-gray-200 pb-2">All Articles</h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="block h-full">
                  <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="h-48 bg-gray-200 relative">
                      {post.featuredImage ? (
                        <Image 
                          src={`https:${post.featuredImage.url}`}
                          alt={post.featuredImage.title || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500">Featured Image</span>
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-white bg-opacity-90 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold mb-3 text-primary hover:text-secondary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <time dateTime={post.publishDate}>
                            {formatDate(post.publishDate)}
                          </time>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="w-3 h-3 mr-1" />
                          <span>{post.readingTimeMinutes || calculateReadingTime(post.content)} min</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found in this category. Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
} 