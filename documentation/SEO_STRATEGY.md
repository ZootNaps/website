# SEO Strategy

This document outlines the Search Engine Optimization (SEO) strategy implemented in the South Lamar Studios website.

## SEO Objectives

The primary SEO objectives for the website are:

1. Improve organic search visibility for target keywords
2. Increase organic traffic to the website
3. Enhance user experience to reduce bounce rates
4. Optimize conversion paths for visitors
5. Build domain authority through quality content

## Technical SEO Implementation

### Server-Side Rendering

The website uses Next.js with server-side rendering, which provides:
- Faster initial page loads
- Improved Core Web Vitals
- Complete HTML for search engine crawlers
- Better indexability of content

### Metadata Implementation

Meta tags are implemented in the following ways:

1. **Default metadata** in the root layout (`src/app/layout.tsx`):
   ```tsx
   export const metadata: Metadata = {
     title: {
       default: 'South Lamar Studios',
       template: '%s | South Lamar Studios',
     },
     description: 'Default description...',
     // Other default metadata
   };
   ```

2. **Page-specific metadata** in individual page components:
   ```tsx
   export const metadata: Metadata = {
     title: 'Page Title',
     description: 'Page-specific description...',
     // Other page-specific metadata
   };
   ```

### Structured Data (Schema.org)

JSON-LD structured data is implemented in the root layout for organization information:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'South Lamar Studios',
      url: 'https://southlamarstudios.com',
      logo: 'https://southlamarstudios.com/images/logo.png',
      // Additional organization data
    })
  }}
/>
```

Additional structured data is added for specific content types such as:
- Blog posts
- Services
- Local business information

### Sitemap Generation

The website generates a dynamic XML sitemap using:

1. `next-sitemap` package for static routes
2. Custom dynamic sitemap generation for content from Contentful:
   ```tsx
   // src/app/sitemap.ts or similar
   export async function generateSitemap() {
     const baseUrl = process.env.SITE_URL || 'https://southlamarstudios.com';
     
     // Get all blog posts
     const posts = await getAllBlogPosts();
     
     // Generate sitemap entries
     const entries = [
       {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1.0,
       },
       // Additional static routes
       ...posts.map(post => ({
         url: `${baseUrl}/blog/${post.slug}`,
         lastModified: new Date(post.publishDate),
         changeFrequency: 'monthly',
         priority: 0.8,
       })),
     ];
     
     return entries;
   }
   ```

### robots.txt Configuration

A robots.txt file is configured to:
- Allow search engines to crawl all public pages
- Direct search engines to the sitemap
- Block crawling of administrative or private areas

### URL Structure

The website follows SEO-friendly URL structures:
- Short, descriptive URLs
- Use of hyphens to separate words
- Logical hierarchy that reflects content organization
- Avoidance of URL parameters where possible

## On-Page SEO

### Content Optimization

Each page is optimized with:

1. **Keyword Research**: Identifying target keywords for each page
2. **Content Structure**:
   - Proper heading hierarchy (H1, H2, H3)
   - Keyword placement in headings and early paragraphs
   - Internal linking to related content
   - Adequate content length for topic coverage

3. **Readability Enhancements**:
   - Short paragraphs
   - Bullet points and lists
   - Subheadings for content organization
   - Engaging, conversational tone

### Image Optimization

Images are optimized using:

1. **Next.js Image Component**:
   ```tsx
   import Image from 'next/image';
   
   // Usage
   <Image
     src="/path/to/image.jpg"
     alt="Descriptive alt text"
     width={800}
     height={600}
     priority={isHero} // For important above-the-fold images
   />
   ```

2. **Image Formats**:
   - AVIF and WebP supported for modern browsers
   - JPEG/PNG fallbacks for broader compatibility

3. **Alt Text**: Descriptive alt text for all images

4. **Lazy Loading**: Automatic for images below the fold

### Performance Optimization

Performance factors that impact SEO:

1. **Core Web Vitals**:
   - LCP (Largest Contentful Paint) optimization
   - FID (First Input Delay) minimization
   - CLS (Cumulative Layout Shift) prevention

2. **Code Optimization**:
   - Server components to reduce client-side JavaScript
   - Code splitting for faster initial load
   - Critical CSS inline loading

3. **Caching Strategy**:
   - Browser caching for static assets
   - CDN delivery through Vercel

## Content Strategy

### Blog Content

The blog content strategy focuses on:

1. **Topic Selection**:
   - Industry-relevant topics
   - Keyword-researched content
   - Addressing customer pain points
   - Educational and informative content

2. **Content Calendar**:
   - Regular publishing schedule
   - Seasonal or trending topics
   - Content refreshes for older posts

3. **Content Types**:
   - How-to guides
   - Industry insights
   - Case studies
   - Thought leadership pieces

### Service Pages

Service pages are optimized for:
- Primary service keywords
- Location-based keywords (if relevant)
- Clear value propositions
- Conversion-focused content

## Local SEO (if applicable)

For local business visibility:

1. **Google Business Profile**:
   - Complete business information
   - Regular updates and posts
   - Customer reviews management

2. **Local Structured Data**:
   - LocalBusiness schema implementation
   - Address, phone, and hours information
   - Service area details

3. **Local Keywords**:
   - City and neighborhood targeting
   - Local service terms

## Mobile Optimization

Mobile SEO considerations:

1. **Responsive Design**:
   - Fully responsive layout
   - Touch-friendly navigation
   - Appropriate font sizes and spacing

2. **Mobile Page Speed**:
   - Optimized images
   - Minimal JavaScript
   - Server-side rendering

## Analytics and Monitoring

SEO performance is tracked using:

1. **Vercel Analytics**:
   - User behavior metrics
   - Page performance data
   - Traffic patterns

2. **Google Search Console** (recommended setup):
   - Keyword performance
   - Click-through rates
   - Indexation status
   - Technical issues

3. **Regular Audits**:
   - Monthly performance reviews
   - Quarterly content audits
   - Technical SEO checkups

## Future SEO Enhancements

Potential areas for SEO improvement:

1. **Advanced Schema Markup**:
   - FAQ schema for common questions
   - Event schema for upcoming events
   - Video schema for multimedia content

2. **User Experience Improvements**:
   - Enhanced navigation for topic clusters
   - Improved internal linking strategy
   - Personalized content recommendations

3. **Content Expansion**:
   - Topic clusters around primary keywords
   - Long-form, comprehensive guides
   - Interactive or multimedia content

## SEO Maintenance Checklist

Regular SEO maintenance tasks:

- [ ] Monitor Core Web Vitals in Google Search Console
- [ ] Check for broken links
- [ ] Update outdated content
- [ ] Review keyword performance
- [ ] Analyze user behavior and adjust strategy
- [ ] Verify proper indexation of new content
- [ ] Update structured data as needed 