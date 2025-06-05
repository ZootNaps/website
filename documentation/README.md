# South Lamar Studios Website Documentation

This directory contains comprehensive documentation for the South Lamar Studios website. The documentation is organized by topic to provide clear guidance for developers, content managers, and administrators.

## Documentation Overview

### Core Documentation

| Document | Description |
|----------|-------------|
| [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) | Technical overview of the project architecture, structure, and components |
| [PROJECT_REFERENCE.md](./PROJECT_REFERENCE.md) | Business context, B2B podcast production service details, and project goals |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Instructions for setting up the development environment |
| [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) | Guidelines for development workflow and coding standards |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Instructions for deploying the website to production |

### Feature-Specific Documentation

| Document | Description |
|----------|-------------|
| [API_REFERENCE.md](./API_REFERENCE.md) | Documentation for API endpoints and usage |
| [CONTENT_MANAGEMENT.md](./CONTENT_MANAGEMENT.md) | Instructions for managing content in Contentful CMS |
| [ANALYTICS_TRACKING.md](./ANALYTICS_TRACKING.md) | Details on analytics implementation and tracking |
| [SEO_STRATEGY.md](./SEO_STRATEGY.md) | SEO optimization strategies and implementation |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Comprehensive design system with Tailwind CSS v4 and Framer Motion |
| [CONTENT_FORMATTING_PROMPT.md](./CONTENT_FORMATTING_PROMPT.md) | AI-assisted content formatting guidelines for enhanced blog design |

### Operational Documentation

| Document | Description |
|----------|-------------|
| [CONFIGURATION_REFERENCE.md](./CONFIGURATION_REFERENCE.md) | Reference for all configuration options and environment variables |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues and solutions |
| [MAINTENANCE_CHECKLIST.md](./MAINTENANCE_CHECKLIST.md) | Regular maintenance tasks and schedules |

### SEO & Performance Documentation

| Document | Description |
|----------|-------------|
| [SEO_AUDIT_RESULTS.md](../SEO_AUDIT_RESULTS.md) | Comprehensive SEO audit results and implemented improvements |

## How to Use This Documentation

- **New Developers**: Start with the `SETUP_GUIDE.md` and `CODEBASE_OVERVIEW.md` to get familiar with the project structure and setup process.
- **Content Managers**: Refer to `CONTENT_MANAGEMENT.md` for guidance on managing website content.
- **Deployment Managers**: Use `DEPLOYMENT_GUIDE.md` for deploying updates to production.
- **Marketers**: Check `SEO_STRATEGY.md` and `ANALYTICS_TRACKING.md` for information on SEO and analytics.

## Keeping Documentation Updated

This documentation should be updated whenever:

1. New features are added to the website
2. Development workflows change
3. Configuration options are modified
4. Best practices are updated

## Technology Stack Summary

The South Lamar Studios website is built with:

- **Frontend Framework**: Next.js 15.3.1 with App Router
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4 with @theme directive and comprehensive design system
- **Language**: TypeScript 5
- **CMS**: Contentful headless CMS
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics and Google Tag Manager
- **Icons**: Font Awesome 6 (SVG Core) with tree-shaking optimization
- **Animations**: Framer Motion with scroll-triggered animations
- **Image Optimization**: Sharp with Next.js Image component
- **Utilities**: tailwind-merge for conditional classes

## Project Overview

South Lamar Studios is a B2B podcast production service that specializes in turning podcasts into powerful lead generation engines. The website serves as both a lead generation platform and educational resource, showcasing the company's unique "Podcast for Sales" approach.

**Key Business Features:**
- B2B lead generation focus through podcast production
- Prospect-as-guest strategy for relationship building
- Full-service production with sales integration
- 95% client success rate with 3:1 ROI within 90 days
- Professional content creation and distribution

**Technical Highlights:**
- Modern React 19 and Next.js 15.3.1 architecture
- Tailwind CSS v4 with comprehensive design system
- Font Awesome 6 with optimized SVG rendering
- Enhanced animations with Framer Motion
- Server-side rendering for SEO optimization
- Contentful CMS for flexible content management

## Getting Help

If you encounter issues not addressed in this documentation:

1. Check the troubleshooting guide first
2. Review the codebase for relevant comments
3. Consult with the development team

## Documentation Maintenance

This documentation set should be reviewed quarterly to ensure it remains accurate and comprehensive as the website evolves. Recent updates include:

- **Centralized SEO Configuration**: New unified metadata generation system with `src/utils/seo-config.ts`
- **Enhanced Social Media Integration**: Dedicated OpenGraph and Twitter Card images with sitemap integration
- **Dynamic Image Loading**: Mobile-specific loading strategies for improved Core Web Vitals
- **ESLint Removal**: Simplified development workflow with TypeScript-first approach
- **Enhanced Blog System**: New category utilities with automatic styling and filtering
- **RSS Feed Implementation**: Blog RSS feed with proper caching and syndication
- **SEO Audit Completion**: Comprehensive SEO improvements including sitemap enhancements
- **Unified Contentful Client**: Consolidated content management with improved error handling
- **Contact Page Redesign**: Enhanced design system integration with Framer Motion
- **Metadata Optimization**: Expanded keyword targeting and improved SEO alignment
- **Font Awesome 6 Upgrade**: Enhanced icon system with tree-shaking
- **Tailwind CSS v4**: New @theme directive and design system
- **Business Model Clarification**: B2B podcast production for lead generation
- **Animation Enhancements**: Improved Framer Motion implementation
- **Performance Optimizations**: Enhanced loading and interaction patterns
- **404 Page Enhancement**: Improved not found page with better user experience
- **Favicon System Modernization**: Migration from PNG to ICO with multiple format support 