# Blog Implementation Documentation

This document provides comprehensive details about the blog implementation for South Lamar Studios, including Contentful integration, component structure, and SEO optimizations.

## Table of Contents

- [Content Architecture](#content-architecture)
- [Contentful Schema](#contentful-schema)
- [Data Models](#data-models)
- [Component Structure](#component-structure)
- [SEO Implementation](#seo-implementation)
- [Rich Text Rendering](#rich-text-rendering)
- [Routing](#routing)
- [Image Handling](#image-handling)
- [Schema.org Implementation](#schemaorg-implementation)
- [Sitemap Generation](#sitemap-generation)
- [Content Filtering](#content-filtering)
- [Future Enhancements](#future-enhancements)

## Content Architecture

The blog implementation uses Contentful as the headless CMS, with Next.js for server-side rendering. The architecture follows these principles:

- **Content separation**: All blog content is managed in Contentful
- **TypeScript interfaces**: Strong typing for all content models
- **SEO optimization**: Custom metadata for search engines
- **Static generation**: Pages are statically generated at build time for performance
- **Incremental regeneration**: Content is revalidated hourly to keep it fresh

## Contentful Schema

The blog post content model in Contentful includes the following fields:

| Field Name | Field Type | Required | Description |
|------------|------------|----------|-------------|
| title | Short text | Yes | The main title of the blog post |
| slug | Short text | Yes | URL-friendly identifier |
| content | Rich text | Yes | Main content with formatting |
| featuredImage | Media | No | Hero image for the post |
| excerpt | Long text | No | Short summary for listings |
| category | Short text | No | Blog category |
| publishDate | Date & time | No | When the post was published |
| metaTitle | Short text | No | Custom SEO title |
| metaDescription | Long text | No | Custom SEO description |
| focusKeyword | Short text | No | Primary SEO keyword |
| tags | Short text list | No | Content categorization |
| status | Short text dropdown | No | Draft/Review/Published/Archived |

## Data Models

The blog implementation uses two main TypeScript interfaces:

1. **BlogPost interface** (`src/lib/contentful/client.ts`): Defines the shape of blog post data from Contentful
2. **Transformed blog post** (`src/lib/contentful.ts`): Used for frontend rendering

```typescript
// From src/lib/contentful/client.ts
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content
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
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  tags?: string[];
  status?: string;
}
```

## Component Structure

The blog implementation consists of two main page components:

1. **Blog listing page** (`src/app/(pages)/blog/page.tsx`): Displays a grid of blog post cards
2. **Blog post page** (`src/app/(pages)/blog/[slug]/page.tsx`): Displays a single blog post

### Blog Listing Page Features

- Grid layout for blog post cards
- Featured image display
- Excerpt preview
- Tags display
- Publication date
- Schema.org Blog markup

### Blog Post Page Features

- Full blog post content rendering
- Featured image display
- Tags display
- Rich text content rendering
- Social sharing links
- Breadcrumb navigation
- Schema.org BlogPosting markup

## SEO Implementation

The blog implements several SEO features:

1. **Custom metadata**: Each blog post can have custom meta title and description
2. **Open Graph tags**: For social media sharing
3. **Focus keyword**: Primary keyword for the content
4. **Schema.org markup**: Structured data for search engines
5. **Status filtering**: Only published posts appear in sitemaps and static generation

Implementation details:

```typescript
// From src/app/(pages)/blog/[slug]/page.tsx
export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  // ...
  const { title, excerpt, featuredImage, metaTitle, metaDescription, focusKeyword } = post;

  // Use custom meta title/description if available, otherwise fall back to defaults
  const pageTitle = metaTitle || `${title} | South Lamar Studios`;
  const pageDescription = metaDescription || excerpt;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      // ... OpenGraph properties
    },
  };

  // Add keywords if available
  if (focusKeyword) {
    metadata.keywords = [focusKeyword];
  }
  // ...
}
```

## Rich Text Rendering

Rich text content from Contentful is rendered using `@contentful/rich-text-react-renderer` with custom rendering options:

```typescript
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    // Additional node renderers...
  },
};
```

## Routing

The blog uses Next.js App Router with two main routes:

1. `/blog` - Blog listing page
2. `/blog/[slug]` - Individual blog post pages

Static parameters are generated at build time using `generateStaticParams`:

```typescript
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts
      .filter(post => post.slug && post.status === 'Published')
      .map(post => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
```

## Image Handling

Images are managed through Contentful's Media API and rendered using Next.js Image component for optimization:

```tsx
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
```

## Schema.org Implementation

The blog implements Schema.org markup for both the blog listing and individual posts:

### Blog Listing Schema

```typescript
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "South Lamar Studios Blog",
  "description": metadata.description,
  // Additional properties...
};
```

### Blog Post Schema

```typescript
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
  // Additional properties...
};
```

## Sitemap Generation

The sitemap is dynamically generated in `src/app/sitemap.ts` and includes all published blog posts:

```typescript
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
```

## Content Filtering

Content is filtered based on the `status` field:

- Only posts with status `Published` are included in the sitemap
- Only posts with status `Published` are statically generated at build time
- Draft, Review, and Archived posts are excluded from public-facing pages

## Future Enhancements

### Phase 2 - Content Enhancement (Planned)
1. **Author** (Reference to Author content type)
2. **Social Title** (Short text, optional)
3. **Social Description** (Long text, 200 chars, optional)
4. **Social Image** (Media, optional)
5. **Related Posts** (Reference to Blog Post, multiple, optional)
6. **Last Updated** (Date & time, optional)

### Phase 3 - Advanced Features (Planned)
1. **Schema Markup** (JSON Object, optional)
2. **Canonical URL** (Short text, optional)
3. **No Index** (Boolean, default: false, optional)
4. **Reading Time** (Number, optional)
5. **Word Count** (Number, optional)
6. **Table of Contents** (JSON Object, optional)

### Planned Author Content Type
- **Name** (Short text, required)
- **Bio** (Long text, optional)
- **Avatar** (Media, optional)
- **Job Title** (Short text, optional)
- **Company** (Short text, optional)
- **Social Links** (JSON Object, optional) 