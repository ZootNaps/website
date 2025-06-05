# Codebase Overview

## Project Description
This project is a modern B2B website built with Next.js for South Lamar Studios, a podcast production service that specializes in turning podcasts into powerful lead generation engines. The site focuses on helping businesses use podcasting as a sales tool rather than traditional audience-building, featuring a unique "Podcast for Sales" approach that invites ideal prospects as guests.

The website serves as both a lead generation platform and educational resource, showcasing how podcasting can drive direct business results through strategic guest selection and professional production services.

## Technology Stack
- **Frontend Framework**: Next.js 15.3.1 (with App Router)
- **React**: v19.0.0
- **TypeScript**: v5+
- **Styling**: Tailwind CSS v4 with @theme directive and PostCSS
- **CMS**: Contentful for content management
- **Deployment**: Vercel (based on configuration)
- **Image Optimization**: Sharp, Next.js Image component
- **Analytics**: Vercel Analytics and Speed Insights
- **SEO**: Next Sitemap for sitemap generation, RSS feeds, structured data, centralized SEO configuration
- **Email**: Nodemailer for contact form
- **Icons**: Font Awesome 6 (FontAwesome SVG Core) - upgraded from v5
- **Animations**: Framer Motion for enhanced UI interactions and micro-animations
- **Utilities**: tailwind-merge for conditional class names
- **Intersection Observer**: react-intersection-observer for scroll-triggered animations

## Directory Structure

### Root Level
- `src/` - Main application code
- `public/` - Static assets
- `blog/` - Blog-related files
- `.next/` - Next.js build output (generated)
- `documentation/` - Project documentation
- `scripts/` - Utility scripts, including content import
- `claude-knowledge/` - Custom knowledge base (possibly for AI integration)

### Source Directory (`src/`)
- `app/` - Next.js App Router pages and routing
- `components/` - React components organized by feature
- `lib/` - Library code and third-party integrations (Contentful)
- `utils/` - Utility functions
- `middleware.ts` - Request middleware (security headers)

### App Directory (`src/app/`)
- `(pages)/` - Page routes
- `api/` - API endpoints
- `_not-found/` - 404 handling
- `styleguide/` - Design system documentation
- `layout.tsx` - Root layout
- `page.tsx` - Home page
- `globals.css` - Global CSS styles

### Components Directory (`src/components/`)
- `shared/` - Shared components
- `seo/` - SEO-related components
- `home/` - Home page components
- `ui/` - UI components library
- `layout/` - Layout components
- `blog/` - Blog-related components
- `contact/` - Contact form components

### Utils Directory (`src/utils/`)
- `scrollUtils.ts` - Utility functions for scrolling behavior
- `gtm.ts` - Google Tag Manager integration
- `imageUtils.ts` - Image optimization utilities for Contentful images
- `seo-config.ts` - Centralized SEO configuration and metadata generation utilities
- Other utility files

## Key Files

### Configuration Files
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration (simplified for v4)
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `next-sitemap.config.js` - Sitemap generation configuration
- `vercel.json` - Vercel deployment configuration

### Entry Points
- `src/app/layout.tsx` - Root layout component with Font Awesome configuration
- `src/app/page.tsx` - Home page showcasing B2B podcast services
- `src/middleware.ts` - Request middleware for security headers

### Content Management
- `src/lib/contentful/client.ts` - Unified Contentful client and content fetching functions
- **Blog Post Functions**: `getBlogPosts()`, `getBlogPostBySlug()`
- **Podcast Episode Functions**: `getPodcastEpisodes()`, `getPodcastEpisodeBySlug()`
- **Type Definitions**: Complete TypeScript interfaces for all content types
- **Error Handling**: Graceful fallbacks for CMS connectivity issues
- **Enhanced Blog Categories**: Six predefined categories with unique styling and icons
- **Category Management**: `src/utils/categoryUtils.ts` for consistent category styling and sorting

### SEO and Metadata Management
- **Centralized SEO Configuration**: `src/utils/seo-config.ts` provides unified metadata generation
- **Schema.org Integration**: Automated structured data for Organization and WebSite schemas
- **Consistent Metadata**: Template-based title and description generation across all pages
- **Enhanced Social Sharing**: OpenGraph and Twitter Card optimization with dedicated images
- **Favicon System**: Modern favicon.ico with multiple format support

### RSS and Content Syndication
- **Blog RSS Feed**: `/blog-rss.xml` with proper XML structure and caching
- **Sitemap Generation**: Dynamic sitemap including both blog posts and podcast episodes
- **Content Discovery**: Enhanced SEO through proper content syndication

### Icon and Animation Libraries
- `src/lib/fontawesome.ts` - Font Awesome 6 icon library configuration with tree-shaking
- Framer Motion components integrated throughout for professional animations

## Architecture Patterns

### Routing
The project uses Next.js App Router with directory-based routing:
- Pages are defined in the `src/app/` directory
- API routes are in `src/app/api/`
- Dynamic routes likely follow Next.js conventions with folder names like `[slug]`

### State Management
- The project likely uses React's built-in state management with hooks
- No additional state management library is evident from the package.json

### Data Fetching
- Content is fetched from Contentful CMS
- Server components likely use async/await patterns for data fetching
- The `contentful.ts` file defines helper functions for fetching blog posts

### Component Organization
Components are organized by feature/section with shared components separated.

## Build Process
- Development: `npm run dev` - runs Next.js dev server with Turbopack
- Build: `npm run build` - builds the Next.js application
- Post-build: `next-sitemap` - generates sitemap and RSS feeds
- Start: `npm run start` - starts the production server
- **RSS Generation**: Automatic RSS feed creation during build process
- **Sitemap Updates**: Dynamic content inclusion from Contentful
- Lint: `npm run lint` - runs Next.js linting

## Dependencies

### Core Dependencies
- `next` - Next.js framework (v15.3.1)
- `react` & `react-dom` - React library (v19.0.0)
- `contentful` - Contentful CMS client (v11.5.23)
- `contentful-management` - Contentful management API (v11.52.2)
- `@contentful/rich-text-react-renderer` - Renders Contentful rich text (v16.0.1)
- `@contentful/rich-text-types` - Rich text type definitions (v17.0.0)
- `next-mdx-remote` - Processes MDX content (v5.0.0)
- `tailwindcss` - Utility-first CSS framework (v4) - **UPGRADED**
- `tailwind-merge` - Utility for merging Tailwind classes (v3.2.0)
- `nodemailer` - Email sending (v7.0.3)
- `next-sitemap` - Sitemap generation (v4.2.3)
- `@vercel/analytics` & `@vercel/speed-insights` - Vercel analytics
- `framer-motion` - Animation library for React (v12.15.0) - **ENHANCED USAGE**
- `react-intersection-observer` - Intersection Observer API wrapper (v9.16.0)
- **Font Awesome 6 (UPGRADED)**:
  - `@fortawesome/fontawesome-svg-core` (v6.7.2)
  - `@fortawesome/free-solid-svg-icons` (v6.7.2)
  - `@fortawesome/free-brands-svg-icons` (v6.7.2) 
  - `@fortawesome/free-regular-svg-icons` (v6.7.2)
  - `@fortawesome/react-fontawesome` (v0.2.2)
- `@heroicons/react` - Heroicons React components (v2.2.0)
- `sharp` - Image processing (v0.34.1)
- `dotenv` - Environment variable loading (v16.5.0)

### Dev Dependencies
- `typescript` - TypeScript language (v5)
- `@types/*` - TypeScript type definitions
  - `@types/node` (v20.17.50)
  - `@types/nodemailer` (v6.4.17)
  - `@types/react` (v19.1.5)
  - `@types/react-dom` (v19.1.5)
- `autoprefixer` - CSS prefixing (v10.4.21)
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin (v4.1.5) - **NEW FOR V4**

## Security Implementations
- Content Security Policy (CSP) headers
- XSS Protection headers
- MIME type sniffing prevention
- Strict Transport Security (HSTS)
- Referrer Policy
- Permissions Policy
- Removal of X-Powered-By header

## Performance Optimizations
- Next.js Image component with Sharp for image optimization
- Vercel Speed Insights for performance monitoring
- Tailwind CSS v4 with @theme directive for efficient styling and design system
- Support for modern image formats (AVIF, WebP)
- Custom image optimization utilities for Contentful images
- Dynamic image quality and format selection
- Responsive image loading with appropriate sizing
- **Enhanced Animation Performance**: Framer Motion with useInView for scroll-triggered animations
- **Optimized Icon Loading**: Font Awesome 6 with tree-shaking and SVG optimization
- **Animated Counters**: Custom hooks for smooth number animations without layout shift
- **RSS Feed Caching**: 1-hour cache control for RSS endpoints
- **Sitemap Optimization**: Proper priority and change frequency settings
- **Dynamic Image Loading**: Mobile-specific loading strategies for hero images
- **Centralized SEO Management**: Reduced redundancy in metadata generation

## Code Organization Principles
- Feature-based organization for components (home/, blog/, contact/, etc.)
- Separation of concerns (UI components, data fetching, animations)
- TypeScript for type safety across all components
- Server components for data fetching and SEO
- Client components only when interactivity is required
- Middleware for security headers
- **Design System Architecture**: Comprehensive @theme directive implementation
- **Animation Patterns**: Consistent Framer Motion usage with reusable variants
- **Icon Management**: Centralized Font Awesome configuration with selective imports
- **Content Management**: Unified Contentful integration with proper error boundaries
- **SEO Strategy**: Structured data implementation and RSS feed generation
- **Centralized Configuration**: Unified SEO, metadata, and schema management
- **Performance-First**: Mobile-responsive image loading and lazy loading strategies