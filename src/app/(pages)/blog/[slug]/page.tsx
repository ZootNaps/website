import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { Metadata } from 'next';

// Define the page props interface similar to the podcast page
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts (builds all blog posts at build time)
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts
      .filter(post => post.slug) // Only include posts with a valid slug
      .map(post => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    const { title, excerpt, featuredImage } = post;

    return {
      title: `${title} | South Lamar Studios`,
      description: excerpt,
      openGraph: {
        title: `${title} | South Lamar Studios`,
        description: excerpt,
        url: `https://southlamarstudios.com/blog/${slug}`,
        type: 'article',
        images: featuredImage ? [{
          url: `https:${featuredImage.url}`,
          width: featuredImage.width,
          height: featuredImage.height,
          alt: featuredImage.title,
        }] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'View our latest blog content',
    };
  }
}

// Set revalidation time
export const revalidate = 3600; // Revalidate at most once per hour

// Rich text renderer options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="text-gray-700">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">{children}</blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      notFound();
    }

    // Create JSON-LD schema for the blog post
    const blogPostSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://southlamarstudios.com/blog/${post.slug}`,
      },
      "headline": post.title,
      "image": post.featuredImage ? `https:${post.featuredImage.url}` : "",
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "author": {
        "@type": "Organization",
        "name": "South Lamar Studios",
      },
      "publisher": {
        "@type": "Organization",
        "name": "South Lamar Studios",
        "logo": {
          "@type": "ImageObject",
          "url": "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png",
        },
      },
      "description": post.excerpt,
    };

    return (
      <MainLayout>
        <Script
          id="blog-post-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
        <article className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="text-sm mb-6 text-gray-500">
              <ul className="flex flex-wrap">
                <li>
                  <Link href="/" className="hover:text-blue-600">Home</Link>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">Blog</Link>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-700 font-medium truncate max-w-xs">
                  {post.title}
                </li>
              </ul>
            </nav>

            {/* Blog post header */}
            <header className="mb-8 max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex justify-center items-center space-x-4 text-gray-500 mb-4">
                <span>Blog</span>
                <span>•</span>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </header>

            {/* Featured image */}
            {post.featuredImage && (
              <div className="mb-10 relative h-[400px] max-w-4xl mx-auto">
                <Image
                  src={`https:${post.featuredImage.url}`}
                  alt={post.featuredImage.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            )}

            {/* Blog post content */}
            <div className="max-w-3xl mx-auto">
              {/* Excerpt as introduction */}
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                {post.excerpt}
              </p>

              {/* Rich text content */}
              <div className="prose prose-lg max-w-none mb-10">
                {documentToReactComponents(post.content, richTextOptions)}
              </div>

              {/* Share buttons */}
              <div className="border-t border-gray-200 pt-6 mt-10">
                <h3 className="font-bold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a href={`https://twitter.com/intent/tweet?url=https://southlamarstudios.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-500 hover:text-blue-400">
                    Twitter
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://southlamarstudios.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-500 hover:text-blue-700">
                    LinkedIn
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://southlamarstudios.com/blog/${post.slug}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-500 hover:text-blue-900">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </MainLayout>
    );
  } catch (error) {
    console.error('Error rendering blog post page:', error);
    notFound();
    return null;
  }
} 