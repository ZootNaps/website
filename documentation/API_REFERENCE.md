# API Reference

This document outlines the API endpoints available in the South Lamar Studios website.

## API Overview

The website implements several API routes using Next.js API Routes functionality. These endpoints provide functionality for contact form submission and sitemap generation.

## Authentication

Most API endpoints do not require authentication as they are designed for public use. For any protected endpoints, the authentication method will be specified.

## Base URL

For local development: `http://localhost:3000/api`
For production: `https://southlamarstudios.com/api`

## API Endpoints

### Contact Form

#### Submit Contact Form

Send a message through the contact form.

**URL**: `/api/contact`

**Method**: `POST`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services."
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully."
  }
  ```

**Error Response**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "success": false,
    "message": "Please fill in all required fields."
  }
  ```

- **Code**: 500 Internal Server Error
- **Content**:
  ```json
  {
    "success": false,
    "message": "Failed to send message. Please try again later."
  }
  ```

**Implementation Notes**:

The contact form API uses Nodemailer to send emails. The request is validated for required fields before processing.

### Sitemap

#### Server Sitemap XML

Generates a dynamic XML sitemap for search engines.

**URL**: `/api/server-sitemap.xml`

**Method**: `GET`

**Success Response**:

- **Code**: 200 OK
- **Content-Type**: `application/xml`
- **Content**: XML formatted sitemap following the [sitemap protocol](https://www.sitemaps.org/protocol.html)

**Implementation Notes**:

The sitemap is dynamically generated based on available routes and content from Contentful. It includes:

- Static pages
- Blog posts from Contentful CMS
- Podcast episodes from Contentful CMS
- Proper priority and changeFrequency values

### Blog RSS Feed

#### Generate Blog RSS Feed

Generates an RSS feed for blog content syndication.

**URL**: `/blog-rss.xml`

**Method**: `GET`

**Success Response**:

- **Code**: 200 OK
- **Content-Type**: `application/xml`
- **Cache-Control**: `s-maxage=3600, stale-while-revalidate`
- **Content**: XML formatted RSS 2.0 feed

**Implementation Notes**:

The RSS feed is dynamically generated from published blog posts in Contentful. Features include:

- RSS 2.0 format compliance
- Proper categories and descriptions
- 1-hour cache control for performance
- Graceful error handling for Contentful connectivity issues

## Internal API Helpers

### Contentful API

The application uses a unified Contentful client module (`src/lib/contentful/client.ts`) with comprehensive helper functions:

#### Get Blog Posts

```typescript
import { getBlogPosts } from '@/lib/contentful/client';

// Usage in a Server Component
const posts = await getBlogPosts();
// Returns: BlogPost[] with complete type safety
```

#### Get Blog Post by Slug

```typescript
import { getBlogPostBySlug } from '@/lib/contentful/client';

// Usage in a Server Component
const post = await getBlogPostBySlug('example-post');
// Returns: BlogPost | null with complete metadata
```

#### Get Podcast Episodes

```typescript
import { getPodcastEpisodes } from '@/lib/contentful/client';

// Usage in a Server Component
const episodes = await getPodcastEpisodes();
// Returns: PodcastEpisode[] with complete type safety
```

#### Get Podcast Episode by Slug

```typescript
import { getPodcastEpisodeBySlug } from '@/lib/contentful/client';

// Usage in a Server Component
const episode = await getPodcastEpisodeBySlug('example-episode');
// Returns: PodcastEpisode | null with complete metadata
```

**Enhanced Features:**
- **Unified Error Handling**: Consistent error responses across all functions
- **Complete TypeScript Support**: Full type definitions for all content types
- **Performance Optimized**: Efficient content fetching with proper caching
- **Production Ready**: Graceful fallbacks for CMS connectivity issues

## Error Handling

All API endpoints follow a consistent error handling pattern:

1. Validate request data
2. Process the request in a try/catch block
3. Return appropriate HTTP status codes and error messages

Error responses follow this structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Optional technical details"
}
```

## Rate Limiting

No explicit rate limiting is implemented in the API endpoints. However, consideration should be given to adding rate limiting for production to prevent abuse, especially for the contact form endpoint.

## CORS Configuration

The API endpoints are configured to accept requests from the same origin. Cross-Origin Resource Sharing (CORS) is not explicitly enabled for external domains.

## Webhook Support

The application does not currently expose webhook endpoints. If integrating with external services that require webhooks, new API routes would need to be implemented.

## API Evolution

When making changes to the API:

1. Maintain backward compatibility where possible
2. Document changes clearly
3. Consider versioning for breaking changes

## Testing the API

### Using cURL

```bash
# Test contact form submission
curl -X POST https://southlamarstudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}'
```

### Using Postman

1. Set the request URL to the desired endpoint
2. Set the appropriate HTTP method
3. Add required headers and body content
4. Send the request and review the response 

## SEO and Metadata Utilities

### SEO Configuration (`src/utils/seo-config.ts`)

Centralized SEO configuration system for consistent metadata generation across the site.

#### Configuration Object

```typescript
export const SEO_CONFIG = {
  siteName: "South Lamar Studios",
  siteUrl: "https://southlamarstudios.com",
  defaultTitle: "B2B Podcast Production & Lead Generation | South Lamar Studios",
  defaultDescription: "The only B2B podcast agency focused on sales results...",
  
  organization: {
    name: "South Lamar Studios",
    url: "https://southlamarstudios.com",
    description: "...",
    foundingDate: "2020",
    logo: "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png"
  },
  
  social: {
    twitter: "@southlamarstudios",
    linkedin: "https://www.linkedin.com/company/southlamarstudios"
  },

  keywords: [
    "b2b podcast production",
    "podcast lead generation",
    // ... comprehensive keyword list
  ]
}
```

#### generateSEOMetadata()

Generates consistent Next.js metadata objects for pages.

**Parameters:**
```typescript
interface SEOProps {
  title?: string;           // Custom page title (will be suffixed with site name)
  description?: string;     // Custom description (defaults to SEO_CONFIG.defaultDescription)
  canonical?: string;       // Canonical URL for the page
  type?: 'website' | 'article';  // OpenGraph type
  publishedTime?: string;   // ISO date string for articles
  modifiedTime?: string;    // ISO date string for articles
}
```

**Usage:**
```typescript
import { generateSEOMetadata } from '@/utils/seo-config';

// Basic usage with defaults
export const metadata = generateSEOMetadata();

// Custom page metadata
export const metadata = generateSEOMetadata({
  title: "Contact Us",
  description: "Get in touch with South Lamar Studios for your B2B podcast needs",
  canonical: "https://southlamarstudios.com/contact"
});

// Article metadata
export const metadata = generateSEOMetadata({
  title: post.title,
  description: post.excerpt,
  canonical: `https://southlamarstudios.com/blog/${post.slug}`,
  type: "article",
  publishedTime: post.publishedAt,
  modifiedTime: post.updatedAt
});
```

**Returns:**
Next.js Metadata object with:
- `title` - Formatted with site name template
- `description` - SEO-optimized description
- `keywords` - Comprehensive keyword array
- `openGraph` - Complete OpenGraph metadata
- `twitter` - Twitter Card metadata
- `alternates.canonical` - Canonical URL (if provided)
- `robots` - Search engine directives

#### generateOrganizationSchema()

Generates Schema.org Organization structured data.

**Usage:**
```typescript
import { generateOrganizationSchema } from '@/utils/seo-config';

const orgSchema = generateOrganizationSchema();
```

**Returns:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://southlamarstudios.com/#organization",
  "name": "South Lamar Studios",
  "url": "https://southlamarstudios.com",
  "logo": "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png",
  "description": "...",
  "foundingDate": "2020",
  "sameAs": ["https://www.linkedin.com/company/southlamarstudios"]
}
```

#### generateWebSiteSchema()

Generates Schema.org WebSite structured data.

**Usage:**
```typescript
import { generateWebSiteSchema } from '@/utils/seo-config';

const websiteSchema = generateWebSiteSchema();
```

**Returns:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://southlamarstudios.com/#website",
  "url": "https://southlamarstudios.com",
  "name": "B2B Podcast Production & Lead Generation | South Lamar Studios",
  "description": "...",
  "publisher": {
    "@id": "https://southlamarstudios.com/#organization"
  }
}
```

#### Implementation Example

**In layout.tsx:**
```tsx
import { generateSEOMetadata, generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo-config';

export const metadata = {
  ...generateSEOMetadata(),
  title: {
    default: "B2B Podcast Production & Lead Generation | South Lamar Studios",
    template: "%s | South Lamar Studios",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                generateOrganizationSchema(),
                generateWebSiteSchema()
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
``` 