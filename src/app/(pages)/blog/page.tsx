import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

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

// Placeholder blog posts until Contentful is set up
const placeholderPosts = [
  {
    id: 1,
    title: "Understanding the Importance of Digital Transformation",
    slug: "understanding-digital-transformation",
    excerpt: "Digital transformation is reshaping how businesses operate and deliver value to customers. Learn why it's essential for modern businesses.",
    publishDate: "2023-06-15",
    readTime: "5 min read",
    category: "Business Strategy",
  },
  {
    id: 2,
    title: "5 Ways to Improve Your Business Efficiency",
    slug: "improve-business-efficiency",
    excerpt: "Efficiency is key to business success. Discover practical strategies to streamline your operations and boost productivity.",
    publishDate: "2023-05-22",
    readTime: "4 min read",
    category: "Productivity",
  },
  {
    id: 3,
    title: "The Future of Remote Work: Trends and Predictions",
    slug: "future-of-remote-work",
    excerpt: "Remote work has become a permanent fixture in the business landscape. Explore emerging trends and what they mean for your organization.",
    publishDate: "2023-04-10",
    readTime: "6 min read",
    category: "Workplace",
  },
  {
    id: 4,
    title: "Building a Customer-Centric Business Strategy",
    slug: "customer-centric-business-strategy",
    excerpt: "Putting customers at the heart of your business is more important than ever. Learn how to develop a truly customer-centric approach.",
    publishDate: "2023-03-18",
    readTime: "7 min read",
    category: "Customer Experience",
  },
  {
    id: 5,
    title: "Leveraging Data Analytics for Better Decision Making",
    slug: "data-analytics-decision-making",
    excerpt: "Data-driven decisions lead to better outcomes. Discover how to effectively use analytics to guide your business strategy.",
    publishDate: "2023-02-05",
    readTime: "5 min read",
    category: "Data & Analytics",
  },
  {
    id: 6,
    title: "Sustainable Business Practices for the Modern Era",
    slug: "sustainable-business-practices",
    excerpt: "Sustainability is no longer optional. Explore how implementing eco-friendly practices can benefit your business and the planet.",
    publishDate: "2023-01-20",
    readTime: "6 min read",
    category: "Sustainability",
  },
];

export default function BlogPage() {
  return (
    <MainLayout>
      <section className="pt-28 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, trends, and news from our team of experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="h-48 bg-gray-200 relative">
                  {/* Image placeholder - replace with actual blog post image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Featured Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-blue-600 font-medium">{post.category}</span>
                    <span className="text-gray-500">{post.readTime}</span>
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
        </div>
      </section>
    </MainLayout>
  );
} 