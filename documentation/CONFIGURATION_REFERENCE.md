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

Tailwind CSS is configured in `tailwind.config.js`:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: '#2a3d45',
        secondary: '#e76f51',
        bg: '#f8f3ed',
        // ... other colors
      },
      fontFamily: {
        // Custom font families
        sans: ['var(--font-inter)'],
        display: ['var(--font-inter)'],
        // ... other fonts
      },
      // ... other theme extensions
    },
  },
  plugins: [
    // Any Tailwind plugins
  ],
};
```

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

### Global CSS Variables

The application defines CSS variables in `src/app/globals.css` for consistent theming:

```css
:root {
  --primary: #303b42;      /* Dark blue/gray for main text and elements */
  --primary-light: #525a66;
  --primary-dark: #1e2428;
  
  --secondary: #e86a44;    /* Orange for accents and call-to-actions */
  --secondary-light: #f08f75;
  --secondary-dark: #d55f41;
  
  --tertiary: #58A4B0;     /* Teal/blue for additional accents and sections */
  --tertiary-light: #79B9C3;
  --tertiary-dark: #47838D;
  
  --bg: #f8f3ed;          /* Light beige for backgrounds */
  --bg-dark: #e8e3dd;
  
  --gray: #6e7074;
  --gray-light: #dcdcdd;
  --gray-dark: #4e5054;
  
  --success: #4caf50;
  --error: #f44336;
  --warning: #ff9800;
  --info: #2196f3;
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