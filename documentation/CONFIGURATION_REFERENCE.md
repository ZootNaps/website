# Configuration Reference

This document provides a comprehensive reference for all configuration options in the South Lamar Studios website.

## Environment Variables

### Required Environment Variables

These variables are required for the site to function properly:

| Variable | Description | Example |
|----------|-------------|---------|
| `CONTENTFUL_SPACE_ID` | Contentful space identifier | `abc123xyz` |
| `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token | `abcdef123456...` |
| `CONTENTFUL_PREVIEW_TOKEN` | Content Preview API token | `abcdef123456...` |
| `SITE_URL` | Production site URL (for sitemap) | `https://southlamarstudios.com` |

### Optional Environment Variables

These variables enable additional functionality:

| Variable | Description | Example |
|----------|-------------|---------|
| `CONTENTFUL_MANAGEMENT_TOKEN` | Content Management API token (for scripts) | `abcdef123456...` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

## Next.js Configuration

The Next.js configuration is defined in `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.ctfassets.net'], // Allow Contentful images
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
};

export default nextConfig;
```

### Key Configuration Options

| Option | Value | Description |
|--------|-------|-------------|
| `images.domains` | `['images.ctfassets.net']` | Authorized domains for the Next.js Image component |
| `images.formats` | `['image/avif', 'image/webp']` | Modern image formats supported |
| `reactStrictMode` | `true` | Enables React's strict mode for development |
| `poweredByHeader` | `false` | Disables the X-Powered-By header for security |

## Tailwind CSS Configuration

Tailwind CSS v4 is configured in `tailwind.config.js` with a simplified structure:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};
```

### Design System Configuration

The design system is now defined using Tailwind CSS v4's `@theme` directive in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #2a3d45;
  --color-primary-light: #3a4d55;
  --color-primary-dark: #1a2d35;
  --color-primary-50: #f4f6f7;
  --color-primary-100: #e8ecee;
  --color-primary-200: #d1d9dd;
  --color-primary-300: #a8b8bf;
  --color-primary-400: #7a8e97;
  --color-primary-500: #5a6f7a;
  --color-primary-600: #4a5d68;
  --color-primary-700: #3e4f57;
  --color-primary-800: #36434a;
  --color-primary-900: #1a2d35;
  
  --color-secondary: #e76f51;
  --color-secondary-light: #f08f75;
  --color-secondary-dark: #d55f41;
  --color-secondary-50: #fdf5f3;
  --color-secondary-100: #fae9e4;
  --color-secondary-200: #f5d0c5;
  --color-secondary-300: #edb09d;
  --color-secondary-400: #e38968;
  --color-secondary-500: #e76f51;
  --color-secondary-600: #d55f41;
  --color-secondary-700: #b44a32;
  --color-secondary-800: #943d2b;
  --color-secondary-900: #7a3426;
  
  --color-tertiary: #58A4B0;
  --color-tertiary-light: #79B9C3;
  --color-tertiary-dark: #4a8a94;
  --color-tertiary-50: #f0f8fa;
  --color-tertiary-100: #dbf0f3;
  --color-tertiary-200: #bce1e8;
  --color-tertiary-300: #8ccbd6;
  --color-tertiary-400: #58a4b0;
  --color-tertiary-500: #4a8a94;
  --color-tertiary-600: #3f747e;
  --color-tertiary-700: #385f67;
  --color-tertiary-800: #324f56;
  --color-tertiary-900: #2d434a;
  
  --color-bg: #f8f3ed;
  --color-bg-dark: #e8e3dd;
  --color-bg-light: #fcf9f4;
  
  --color-gray: #718096;
  --color-gray-dark: #4a5568;
  --color-gray-light: #a0aec0;
  
  /* Font families */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-plus-jakarta-sans), system-ui, sans-serif;
  
  /* Font sizes */
  --font-size-display-xl: 4rem;
  --font-size-display-lg: 3.5rem;
  --font-size-display: 2.5rem;
  --font-size-display-md: 2rem;
  
  /* Spacing */
  --spacing-section: 5rem;
  --spacing-section-sm: 3rem;
  --spacing-section-lg: 7rem;
  
  /* Border radius */
  --radius-btn: 0.5rem;
  --radius-card: 1rem;
  --radius-card-lg: 1.5rem;
  
  /* Shadows */
  --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
  --shadow-medium: 0 4px 25px -3px rgba(0, 0, 0, 0.1), 0 8px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-strong: 0 10px 40px -3px rgba(0, 0, 0, 0.15), 0 4px 25px -2px rgba(0, 0, 0, 0.08);
  --shadow-glow: 0 0 20px rgba(231, 111, 81, 0.3);
  --shadow-glow-primary: 0 0 20px rgba(42, 61, 69, 0.3);
  
  /* Animations */
  --animate-scroll: scroll 30s linear infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-soft: pulse-soft 2s ease-in-out infinite;
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.6s ease-out;
}
```

### Key Configuration Features

| Feature | Description |
|---------|-------------|
| `@theme` directive | Tailwind v4's new way to define design tokens |
| Comprehensive color palette | Primary, secondary, tertiary colors with full shade ranges |
| Design tokens | Font families, spacing, radius, shadows, and animations |
| CSS custom properties | Both new format and legacy variables for compatibility |
| Enhanced animations | Built-in keyframes and animation utilities |

## TypeScript Configuration

TypeScript is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## PostCSS Configuration

PostCSS is configured in `postcss.config.mjs`:

```javascript
// postcss.config.mjs
export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Security Headers

Security headers are configured in `src/middleware.ts`:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Add security headers
  const securityHeaders = new Headers(response.headers);
  
  // Content Security Policy
  securityHeaders.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://*.googletagmanager.com https://tagassistant.google.com https://*.google.com https://open.spotify.com https://*.spotify.com 'unsafe-inline'; style-src 'self' https://*.spotify.com 'unsafe-inline'; img-src 'self' data: https: https://*.spotify.com; font-src 'self' https://*.spotify.com; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.spotify.com; frame-src 'self' https://open.spotify.com https://*.spotify.com https://tagassistant.google.com;"
  );

  // XSS Protection
  securityHeaders.set('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  securityHeaders.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  securityHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  securityHeaders.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  );
  
  // Strict Transport Security
  securityHeaders.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  
  // Return the response with the security headers
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
    headers: securityHeaders,
  });
}

// Matcher configuration
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
```

## Sitemap Configuration

The sitemap is configured in `next-sitemap.config.js`:

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://southlamarstudios.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://southlamarstudios.com'}/api/server-sitemap.xml`,
    ],
  },
  // ... other options
};
```

## Vercel Configuration

Vercel deployment is configured in `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    // Any configured redirects
  ]
}
```

## Contentful Configuration

The Contentful client is configured in `src/lib/contentful.ts`:

```typescript
// src/lib/contentful.ts
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});

export const getClient = (preview: boolean = false) => {
  return preview ? previewClient : client;
};
```

## Configuration Best Practices

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use `.env.local` for local development
   - Configure environment variables in Vercel for production

2. **Security Headers**
   - Regularly review and update security headers
   - Test CSP configuration for compatibility
   - Use CSP Report-Only mode to test changes

3. **Content Security Policy**
   - Minimize use of `'unsafe-inline'` and `'unsafe-eval'`
   - Keep the CSP as restrictive as possible
   - Add new sources only when necessary

4. **Tailwind Configuration**
   - Keep custom extensions organized by type
   - Document custom utility classes
   - Avoid excessive customization of defaults

5. **Next.js Configuration**
   - Enable performance optimizations
   - Configure image domains explicitly
   - Disable unnecessary features

## Overriding Default Configuration

### Environment-Specific Configuration

Create environment-specific configurations using `.env` files:

- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables
- `.env.local` - Local overrides (not committed to version control)

### Configuration Precedence

Configuration values are applied in this order (later overrides earlier):

1. Default values in code
2. `.env` file
3. `.env.development` or `.env.production` (depending on environment)
4. `.env.local`
5. Environment variables set in the deployment platform

## Troubleshooting Configuration Issues

### Common Problems

1. **Missing Environment Variables**
   - Verify `.env.local` file exists and contains required variables
   - Check variable names for typos
   - Ensure variables are set in the Vercel dashboard for production

2. **Build Errors**
   - Check Next.js configuration for syntax errors
   - Verify TypeScript configuration is valid
   - Ensure all referenced environment variables are defined

3. **Content Security Policy Issues**
   - Check browser console for CSP violation reports
   - Add missing domains to the appropriate CSP directives
   - Test CSP using the CSP Evaluator tool

4. **Image Optimization Issues**
   - Verify image domains are correctly configured in `next.config.ts`
   - Check image formats are supported
   - Ensure image dimensions are properly specified

## CSS Configuration

### Enhanced Design System

The application now features a comprehensive design system with:

1. **Color System**: Full shade ranges (50-900) for primary, secondary, and tertiary colors
2. **Typography Scale**: Display fonts and careful typographic hierarchy
3. **Spacing System**: Consistent spacing tokens for sections and components
4. **Shadow System**: Soft, medium, strong, and glow shadow utilities
5. **Animation System**: Predefined animations with accessibility considerations

### Accessibility Features

The new CSS system includes enhanced accessibility features:

```css
/* Enhanced accessibility and animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
  }
  .btn {
    border: 2px solid currentColor !important;
  }
}

/* Forced colors support */
@media (forced-colors: active) {
  .btn {
    forced-color-adjust: none;
  }
  .card {
    forced-color-adjust: none;
  }
}
```

### Global CSS Variables

The application defines comprehensive CSS variables in `src/app/globals.css` for consistent theming:

```css
:root {
  /* Legacy variables for compatibility */
  --primary: #2a3d45;
  --primary-light: #3a4d55;
  --primary-dark: #1a2d35;
  
  --secondary: #e76f51;
  --secondary-light: #f08f75;
  --secondary-dark: #d55f41;
  
  --tertiary: #58A4B0;
  --tertiary-light: #79B9C3;
  --tertiary-dark: #47838D;
  
  --bg: #f8f3ed;
  --bg-dark: #e8e3dd;
  --bg-light: #fcf9f4;
  
  --text-gray: #4a5568;
  --text-gray-light: #718096;
  --dark-gray: #2d3748;
  
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 5rem;
  
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  
  --focus-ring: 0 0 0 3px rgba(231, 111, 81, 0.3);
  --focus-ring-primary: 0 0 0 3px rgba(42, 61, 69, 0.3);
}
```

## Icons and Assets

### Font Awesome Configuration

The project uses Font Awesome 6 for icons, configured in `src/lib/fontawesome.ts`:

```tsx
import { library } from '@fortawesome/fontawesome-svg-core';
import { config } from '@fortawesome/fontawesome-svg-core';

// Import solid icons
import {
  faCheck,
  faChevronDown,
  // ...other icons
} from '@fortawesome/free-solid-svg-icons';

// Import brand icons
import {
  faTwitter,
  faFacebook,
  // ...other icons
} from '@fortawesome/free-brands-svg-icons';

// Prevent FontAwesome from adding its CSS
config.autoAddCss = false;

// Add icons to the library
library.add(
  // Solid icons
  faCheck,
  faChevronDown,
  // ...other icons
  
  // Brand icons
  faTwitter,
  faFacebook,
  // ...other icons
);

export default library;
```

The CSS for Font Awesome is imported in the root layout:

```tsx
// src/app/layout.tsx
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../lib/fontawesome';
```

### Image Configuration

// ... existing code ... 