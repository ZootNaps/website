import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { FaClock } from 'react-icons/fa';

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
      .filter(post => post.slug && post.status === 'Published') // Only include published posts with a valid slug
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

    const { title, excerpt, featuredImage, metaTitle, metaDescription, focusKeyword } = post;

    // Use custom meta title/description if available, otherwise fall back to defaults
    const pageTitle = metaTitle || `${title} | South Lamar Studios`;
    const pageDescription = metaDescription || excerpt;

    const metadata: Metadata = {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
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

    // Add keywords if available
    if (focusKeyword) {
      metadata.keywords = [focusKeyword];
    }

    return metadata;
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

// Calculate reading time function
const calculateReadingTime = (content: any): number => {
  // Extract all text from rich text content
  const text = JSON.stringify(content);
  // Count words (approximately)
  const wordCount = text.split(/\s+/).length;
  // Assume average reading speed of 225 words per minute
  const readingTime = Math.ceil(wordCount / 225);
  return readingTime || 1; // Minimum 1 minute
};

// Table of Contents Component
const TableOfContents = ({ content }: { content: any }) => {
  // Extract headings from rich text content
  const headings = content?.content?.filter(
    (item: any) => item.nodeType === 'heading-2'
  );
  
  if (!headings || headings.length < 3) return null;
  
  return (
    <div className="bg-bg border border-bg-dark rounded-lg p-6 mb-10 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-primary">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading: any, index: number) => {
            const text = heading.content[0].value;
            const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
            
            return (
              <li key={index} className="border-l-2 border-gray-200 pl-4 hover:border-secondary transition-colors duration-300">
                <a 
                  href={`#${slug}`}
                  className="text-gray-700 hover:text-secondary block py-1 transition-colors duration-300"
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// Rich text renderer options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-lg max-w-prose">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
      const text = node.content[0]?.value || '';
      const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return (
        <h2 id={slug} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-primary border-b border-gray-200 pb-2">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-4 text-primary">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-lg md:text-xl font-medium mt-8 mb-3 text-primary">
        {children}
      </h4>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-8 mb-6 space-y-3">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-8 mb-6 space-y-3">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="text-gray-700 pl-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-secondary pl-6 py-4 my-8 bg-bg rounded-r-lg italic text-dark-gray">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-10 border-t border-gray-200 w-full" />
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a 
        href={node.data.uri} 
        className="text-secondary hover:text-secondary-dark underline transition-colors duration-300" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-gray-800">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm text-secondary-dark">
        {text}
      </code>
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
      "description": post.metaDescription || post.excerpt,
      "keywords": post.focusKeyword || "",
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
                  <Link href="/" className="hover:text-secondary transition-colors duration-300">Home</Link>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-secondary transition-colors duration-300">Blog</Link>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-700 font-medium truncate max-w-xs">
                  {post.title}
                </li>
              </ul>
            </nav>

            {/* Blog post header */}
            <header className="mb-10 max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-2 text-gray-500 mb-6">
                <span>Blog</span>
                <span>•</span>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span className="flex items-center">
                  <FaClock className="w-3 h-3 mr-1" />
                  {calculateReadingTime(post.content)} min read
                </span>
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-sm bg-bg text-gray-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Featured image */}
            {post.featuredImage && (
              <div className="mb-12 relative h-[450px] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={`https:${post.featuredImage.url}`}
                  alt={post.featuredImage.title || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
                  className="object-cover"
                  priority
                />
                {post.featuredImage.description && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 text-sm italic">
                    {post.featuredImage.description}
                  </div>
                )}
              </div>
            )}

            {/* Blog post content */}
            <div className="max-w-3xl mx-auto">
              {/* Excerpt as introduction */}
              <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed border-l-4 border-secondary pl-6 py-2">
                {post.excerpt}
              </p>

              {/* Table of contents for longer posts */}
              <TableOfContents content={post.content} />

              {/* Rich text content */}
              <div className="prose prose-lg max-w-none mb-12">
                {documentToReactComponents(post.content, richTextOptions)}
              </div>

              {/* Author box */}
              {post.author && (
                <div className="mt-16 p-6 bg-bg rounded-lg border border-bg-dark">
                  <div className="flex items-center mb-4">
                    {post.author.picture ? (
                      <Image 
                        src={`https:${post.author.picture.url}`}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-2xl text-gray-500">{post.author.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-primary">{post.author.name}</h3>
                    </div>
                  </div>
                  {post.author.bio && (
                    <p className="text-gray-700">{post.author.bio}</p>
                  )}
                </div>
              )}
              
              {/* Share buttons */}
              <div className="border-t border-gray-200 pt-6 mt-12">
                <h3 className="font-bold mb-4 text-primary">Share this article</h3>
                <div className="flex flex-wrap gap-4">
                  <a href={`https://twitter.com/intent/tweet?url=https://southlamarstudios.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-600 hover:text-secondary transition-colors duration-300">
                    Twitter
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://southlamarstudios.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-600 hover:text-secondary transition-colors duration-300">
                    LinkedIn
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://southlamarstudios.com/blog/${post.slug}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-600 hover:text-secondary transition-colors duration-300">
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