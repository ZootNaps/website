# Website Project Reference

## Project Overview
This project involves migrating a business website from Squarespace to a custom Next.js site with Tailwind CSS. The site features a clean design with dark teal/slate primary color (#2a3d45), coral/salmon accent color (#e76f51) for buttons, and off-white background (#f8f3ed).

## Business Information
- **Business Name**: South Lamar Studios
- **Founder**: Gus Joseph
- **Core Business**: Video podcasting services for B2B businesses and startups
- **Unique Value Proposition**: A proven process that helps businesses generate leads and close deals through podcasting
- **Service Highlights**:
  - Full-service podcast production
  - Guest identification and qualification
  - Professional interviewing
  - Strategic follow-up processes
  - Comprehensive content creation (podcast, video clips, LinkedIn posts, blog posts, newsletter content)
- **Target Audience**: B2B companies, startups, and founders looking to leverage content marketing for business growth
- **Key Differentiator**: End-to-end solution that focuses on business results rather than just content creation

## Client Requirements & Preferences
- **Migration**: Complete migration from Squarespace to a custom-built solution
- **Modern Stack**: Using Next.js with App Router and latest React
- **Brand Consistency**: Maintain the established brand colors and design aesthetic
- **Responsive Design**: Ensure the site works well on all device sizes
- **SEO Optimized**: Proper metadata and semantic HTML for good search engine visibility
- **Accessibility**: Ensure the website follows accessibility best practices
- **Performance**: Fast page loads and optimized assets
- **Component Structure**: Clean, modular components that are easy to maintain
- **Content Management**: Integration with Contentful for easy content updates
- **Interactive Elements**: Smooth animations and interactive UI components

## Technology Stack
- **Framework**: Next.js 15.3.1 (App Router)
- **React**: v19.0.0
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons
- **Content Management**: Contentful
- **Deployment**: Vercel (assumed)

## Site Structure
The website consists of the following pages:
- Homepage with sections:
  - Hero Section
  - Client Logos Section with metrics
  - Features Section
  - Process Section
  - Pricing Section
  - FAQ Section
  - CTA Section
- Contact page
- Blog page
- Podcast page

## Components
### Layout Components
- `MainLayout`: Wrapper with Header and Footer
- `Header`: Navigation with mobile menu toggle
- `Footer`: Site footer with links and information

### Home Page Sections
- `HeroSection`: Main banner with headline and CTA buttons
- `ClientLogoSection`: Logo carousel with metrics (98% customer satisfaction, 250+ projects, 15+ years experience)
- `FeaturesSection`: Benefits/features cards
- `ProcessSection`: Step-by-step process explanation
- `PricingSection`: Pricing plans with toggle for monthly/annual
- `FaqSection`: Expandable FAQ items
- `CtaSection`: Call-to-action section

## Styling Information
### Brand Colors
```js
// Colors in tailwind.config.js
colors: {
  primary: '#2a3d45', // dark teal
  secondary: '#e76f51', // coral/orange
  light: '#f8f3ed', // light beige
  gray: {
    DEFAULT: '#718096', // body text
    dark: '#4a5568' // darker text
  }
}
```

### CSS Structure
- Using Tailwind CSS v4 with custom configuration
- CSS variables in `:root` for consistent styling
- Custom component styles in `@layer components`
- Animation setup for client logos carousel

## Critical Updates & Changes
1. **Tailwind v4 Configuration**:
   - Updated PostCSS configuration to use `@tailwindcss/postcss` instead of direct `tailwindcss`
   - Updated import syntax in globals.css from directives to `@import "tailwindcss"`
   - Added animation configuration for the logo carousel

2. **Client Directive Usage**:
   - Added `'use client'` directive to components with event handlers (Header, HeroSection, etc.)

3. **Component Architecture**:
   - Using client/server component pattern according to Next.js App Router best practices
   - Interactive components marked as client components

## Common Issues & Solutions

### Tailwind CSS v4 with Next.js 15 Issues
**Issue**: PostCSS plugin configuration errors
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin...
```

**Solution**: 
1. Install the separate PostCSS plugin: `npm install -D @tailwindcss/postcss`
2. Update postcss.config.mjs:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```
3. Update globals.css to use the new import syntax:
```css
@import "tailwindcss";
```

### Animation for Client Logo Section
Added proper animation configuration to make the logo carousel work:
```js
animation: {
  'scroll': 'scroll 25s linear infinite',
},
keyframes: {
  scroll: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' }
  }
}
```

## Development Workflow
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`

This document will be updated as the project evolves with new features, components, and solutions to issues encountered. 