# Codebase Overview

## Project Description
This project is a modern website built with Next.js that appears to be for South Lamar Studios, based on the identified URLs. The site includes a blog, contact functionality, and possibly other business-related content.

## Technology Stack
- **Frontend Framework**: Next.js 15.3.1 (with App Router)
- **React**: v19.0.0
- **TypeScript**: v5+
- **Styling**: Tailwind CSS v4 with PostCSS
- **CMS**: Contentful for content management
- **Deployment**: Vercel (based on configuration)
- **Image Optimization**: Sharp, Next.js Image component
- **Analytics**: Vercel Analytics and Speed Insights
- **SEO**: Next Sitemap for sitemap generation
- **Email**: Nodemailer for contact form

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

## Key Files

### Configuration Files
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `next-sitemap.config.js` - Sitemap generation configuration
- `vercel.json` - Vercel deployment configuration

### Entry Points
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Home page
- `src/middleware.ts` - Request middleware for security headers

### Content Management
- `src/lib/contentful.ts` - Contentful client and content fetching functions
- `src/lib/contentful/` - Contentful models and utilities

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
- Post-build: `next-sitemap` - generates sitemap
- Start: `npm run start` - starts the production server
- Lint: `npm run lint` - runs Next.js linting

## Dependencies

### Core Dependencies
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `contentful` - Contentful CMS client
- `contentful-management` - Contentful management API
- `@contentful/rich-text-react-renderer` - Renders Contentful rich text
- `next-mdx-remote` - Processes MDX content
- `tailwindcss` - Utility-first CSS framework
- `nodemailer` - Email sending
- `next-sitemap` - Sitemap generation
- `@vercel/analytics` & `@vercel/speed-insights` - Vercel analytics

### Dev Dependencies
- `typescript` - TypeScript language
- `@types/*` - TypeScript type definitions
- `autoprefixer` - CSS prefixing
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin

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
- Tailwind CSS for efficient styling
- Support for modern image formats (AVIF, WebP)

## Code Organization Principles
- Feature-based organization for components
- Separation of concerns (UI components, data fetching, etc.)
- TypeScript for type safety
- Server components for data fetching
- Middleware for security headers