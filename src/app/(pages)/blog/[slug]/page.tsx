import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faTag, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '@/utils/imageUtils';
import { getCategoryStyle } from '@/utils/categoryUtils';

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

// Enhanced Table of Contents Component
const TableOfContents = ({ content }: { content: any }) => {
  // Extract headings from rich text content
  const headings = content?.content?.filter(
    (item: any) => item.nodeType === 'heading-2'
  );
  
  if (!headings || headings.length < 3) return null;
  
  return (
    <div className="card bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-secondary rounded-full"></div>
        <h3 className="text-xl font-bold text-primary">Table of Contents</h3>
      </div>
      <nav>
        <ul className="space-y-3">
          {headings.map((heading: any, index: number) => {
            const text = heading.content[0].value;
            const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
            
            return (
              <li key={index} className="border-l-2 border-gray-100 pl-4 hover:border-secondary transition-all duration-300">
                <a 
                  href={`#${slug}`}
                  className="text-gray hover:text-secondary block py-2 transition-colors duration-300 font-medium hover:pl-2"
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

// Enhanced Rich text renderer options with modern styling
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-8 text-gray-dark leading-relaxed text-lg max-w-none">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
      const text = node.content[0]?.value || '';
      const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return (
        <h2 id={slug} className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-primary border-l-4 border-secondary pl-6 relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-secondary/20 rounded-r"></div>
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-primary">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-xl md:text-2xl font-semibold mt-10 mb-5 text-primary">
        {children}
      </h4>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-none pl-0 mb-8 space-y-4">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-none pl-0 mb-8 space-y-4 counter-reset: list-counter">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="text-gray-dark pl-8 relative before:content-['•'] before:text-secondary before:font-bold before:absolute before:left-0 before:top-0">
        {children}
      </li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-secondary bg-secondary/5 pl-8 py-6 my-10 rounded-r-2xl italic text-gray-dark text-xl font-medium relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-secondary/20 rounded-r"></div>
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-12 border-t-2 border-gray-100 w-full max-w-xs mx-auto" />
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a 
        href={node.data.uri} 
        className="text-secondary hover:text-secondary-dark font-semibold underline decoration-2 underline-offset-2 transition-all duration-300 hover:decoration-secondary-dark" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-primary">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-primary/10 text-primary rounded-lg px-3 py-1 font-mono text-base border border-primary/20">
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
        
        {/* Enhanced background with gradient */}
        <article className="relative overflow-hidden bg-linear-to-b from-white via-primary-50 to-white">
          {/* Decorative elements */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-secondary/20 to-transparent"></div>
          
          {/* Header section with enhanced background */}
          <section className="pt-32 pb-20 relative bg-linear-to-br from-primary-50 via-bg-light to-white">
            <div className="container mx-auto px-4 relative z-10">
              {/* Enhanced Breadcrumbs */}
              <nav className="text-sm mb-8 text-gray-500" aria-label="Breadcrumb">
                <ul className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-secondary transition-colors duration-300 font-medium">
                      Home
                    </Link>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li>
                    <Link href="/blog" className="hover:text-secondary transition-colors duration-300 font-medium">
                      Blog
                    </Link>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li className="text-primary font-semibold truncate max-w-xs">
                    {post.title}
                  </li>
                </ul>
              </nav>

              {/* Enhanced Blog post header */}
              <header className="mb-12 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary leading-tight">
                  {post.title}
                </h1>
                
                {/* Enhanced meta information */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 mb-8">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100">
                    <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 text-secondary" />
                    <time dateTime={post.publishDate} className="font-medium">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-secondary" />
                    <span className="font-medium">
                      {post.readingTimeMinutes || calculateReadingTime(post.content)} min read
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="flex items-center gap-2 text-sm bg-white border border-secondary/20 text-primary px-4 py-2 rounded-full font-medium hover:bg-secondary/5 transition-colors duration-300">
                        <FontAwesomeIcon icon={faTag} className="w-3 h-3 text-secondary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Enhanced Category Badge */}
                {post.category && (
                  <div className="flex justify-center mb-8">
                    {(() => {
                      const categoryStyle = getCategoryStyle(post.category);
                      return (
                        <div className={`flex items-center gap-3 ${categoryStyle.bgColor} ${categoryStyle.borderColor} border px-6 py-3 rounded-xl`}>
                          <span className="text-2xl">{categoryStyle.icon}</span>
                          <div>
                            <div className={`text-sm font-semibold ${categoryStyle.textColor}`}>
                              {post.category}
                            </div>
                            <div className="text-xs text-gray-600">
                              {categoryStyle.description}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </header>
            </div>
          </section>

          {/* Enhanced Featured image section */}
          {post.featuredImage && (
            <section className="mb-16 relative">
              <div className="container mx-auto px-4">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-strong">
                  <Image
                    src={getOptimizedImageUrl(post.featuredImage.url, {
                      width: 1600,
                      format: 'webp',
                      quality: 85
                    })}
                    alt={post.featuredImage.title || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="object-cover"
                    priority
                    quality={85}
                  />
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {post.featuredImage.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent text-white p-6">
                      <p className="text-sm italic max-w-2xl">
                        {post.featuredImage.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Enhanced Content section */}
          <section className="pb-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Enhanced Excerpt */}
                <div className="card bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-16 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h2 className="text-lg font-semibold text-primary mb-3">Article Summary</h2>
                      <p className="text-xl text-gray-dark font-light leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Table of contents */}
                <TableOfContents content={post.content} />

                {/* Enhanced Rich text content */}
                <div className="prose prose-xl max-w-none mb-16 bg-white rounded-2xl p-8 md:p-12 shadow-soft border border-gray-100">
                  {documentToReactComponents(post.content, richTextOptions)}
                </div>

                {/* Enhanced Author box */}
                {post.author && (
                  <div className="card bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-soft">
                    <div className="flex items-center gap-6 mb-4">
                      {post.author.picture ? (
                        <Image 
                          src={`https:${post.author.picture.url}`}
                          alt={post.author.name}
                          width={80}
                          height={80}
                          className="rounded-2xl shadow-medium"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                          <span className="text-3xl font-bold text-secondary">{post.author.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-1">About {post.author.name}</h3>
                        <p className="text-gray font-medium">Author</p>
                      </div>
                    </div>
                    {post.author.bio && (
                      <p className="text-gray-dark leading-relaxed text-lg">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                )}
                
                {/* Enhanced Share section */}
                <div className="card bg-white border border-gray-100 rounded-2xl p-8 shadow-soft">
                  <div className="flex items-center gap-4 mb-6">
                    <FontAwesomeIcon icon={faShare} className="w-5 h-5 text-secondary" />
                    <h3 className="text-xl font-bold text-primary">Share this article</h3>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`https://twitter.com/intent/tweet?url=https://southlamarstudios.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-[#1DA1F2]/20"
                    >
                      <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                      Twitter
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=https://southlamarstudios.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-[#0077B5]/20"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://southlamarstudios.com/blog/${post.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-[#1877F2]/20"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </MainLayout>
    );
  } catch (error) {
    console.error('Error rendering blog post page:', error);
    notFound();
    return null;
  }
} 