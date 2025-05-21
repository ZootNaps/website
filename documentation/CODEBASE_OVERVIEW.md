# Codebase Overview

## 1. Project Description

This is a Next.js application styled with Tailwind CSS. It appears to be a company website or portfolio, featuring sections for a blog, podcast, contact form, and a thank-you page. The project utilizes the Next.js App Router for routing.

## 2. Technologies Used

*   **Next.js:** React framework for server-side rendering, static site generation, and routing. (v15.3.1, Turbopack enabled for dev)
*   **React:** JavaScript library for building user interfaces. (v19.0.0)
*   **Tailwind CSS:** Utility-first CSS framework for styling. (v4)
*   **TypeScript:** Superset of JavaScript for static typing. (v5)
*   **Contentful:** Headless CMS for managing content (`contentful`, `contentful-management` packages).
*   **MDX:** `next-mdx-remote` is used for rendering Markdown content, likely for blog posts.
*   **Nodemailer:** For sending emails, likely used by the contact form.
*   **Vercel Analytics & Speed Insights:** For performance monitoring and analytics.
*   **Tailwind Merge:** Utility for merging Tailwind CSS classes.
*   **Sharp:** For image optimization.
*   **Next-Sitemap:** For sitemap generation.

## 3. Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── .git/                       # Git version control
├── .next/                      # Next.js build output
├── claude-knowledge/           # Unknown purpose, possibly related to AI/Claude integration
├── node_modules/               # Project dependencies
├── public/                     # Static assets (images, fonts, etc.)
│   └── ...
├── scripts/                    # Utility scripts
│   └── ...
├── src/                        # Application source code
│   ├── app/                    # Next.js App Router directory
│   │   ├── (pages)/            # Grouped page routes
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── podcast/
│   │   │   └── thank-you/
│   │   ├── api/                # API route handlers
│   │   ├── _not-found/         # Custom components for 404 page (conventionally should be not-found/ or a top-level not-found.tsx)
│   │   ├── styleguide/         # Likely for UI components or design system documentation
│   │   ├── globals.css         # Global CSS styles
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Homepage component (src/app/page.tsx)
│   │   ├── not-found.tsx       # Root not-found component
│   │   └── sitemap.ts          # Sitemap generation
│   ├── components/             # Reusable UI components
│   │   └── ...
│   ├── lib/                    # Library code, potentially for Contentful integration or other services
│   │   └── ...
│   ├── utils/                  # Utility functions
│   │   └── ...
│   └── middleware.ts           # Next.js middleware
├── .gitignore                  # Files and directories to ignore by Git
├── .DS_Store                   # macOS specific file
├── CONTENTFUL-SETUP.md         # Documentation for setting up Contentful
├── DOMAIN-TRANSITION-CHECKLIST.md # Checklist for domain transition
├── OLD SITE CSS.txt            # CSS from a previous version of the site
├── PROJECT-REFERENCE.md        # General project reference documentation
├── README.md                   # Project README
├── contact.html                # Standalone HTML contact page (possibly legacy or for a specific purpose)
├── next-env.d.ts               # Next.js environment type definitions
├── next-sitemap.config.js      # Configuration for sitemap generation
├── next.config.ts              # Next.js configuration file
├── package-lock.json           # Exact dependency versions
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── thank-you.html              # Standalone HTML thank-you page (possibly legacy)
└── tsconfig.json               # TypeScript configuration
```

## 4. Key Files and Directories

*   **`src/app/`**: Contains all routes, layouts, and the main application logic.
    *   **`src/app/layout.tsx`**: The root layout component, wraps all pages.
    *   **`src/app/page.tsx`**: The homepage of the application.
    *   **`src/app/(pages)/`**: Contains the primary page routes like `blog`, `podcast`, `contact`.
    *   **`src/app/api/`**: Defines server-side API endpoints.
*   **`src/components/`**: Houses reusable UI components used throughout the application.
*   **`src/lib/`**: Likely contains modules for interacting with external services (e.g., Contentful API client).
*   **`src/utils/`**: General utility functions.
*   **`public/`**: Stores static assets like images, fonts, and `favicon.ico`.
*   **`tailwind.config.js`**: Configuration file for Tailwind CSS, defining theme, plugins, and content paths.
*   **`next.config.ts`**: Next.js configuration file, for things like redirects, environment variables, and build settings.
*   **`package.json`**: Lists project dependencies and scripts (e.g., `dev`, `build`, `start`).
*   **`middleware.ts`**: For running code before a request is completed. Useful for redirects, authentication, etc.

## 5. Routing

Routing is handled by the Next.js App Router.
*   The main pages are grouped under `src/app/(pages)/`.
*   Dynamic routes are likely used within the `blog/` and `podcast/` sections (e.g., `blog/[slug]/page.tsx`).
*   API routes are defined in `src/app/api/`.
*   A global `not-found.tsx` handles 404 errors.

## 6. Styling

Styling is primarily done using Tailwind CSS.
*   Global styles are defined in `src/app/globals.css`.
*   Tailwind configuration is in `tailwind.config.js`.
*   Component-specific styles are likely co-located with the components or applied directly via Tailwind utility classes.

## 7. State Management

The method of state management is not immediately obvious from the file structure. It could be:
*   React Context API for global or shared state.
*   Third-party libraries like Zustand or Jotai.
*   Local component state (`useState`, `useReducer`) for simpler cases.
    *Further investigation of components will be needed to confirm.*

## 8. Data Fetching

Data fetching is likely handled using:
*   Server Components in Next.js for fetching data on the server.
*   Route Handlers in `src/app/api/` for custom backend logic or proxying requests (e.g., handling contact form submissions with Nodemailer).
*   Client-side fetching using `fetch` or libraries like SWR/React Query if needed for specific components.
*   Contentful API for fetching blog posts, podcast episodes, etc. (via modules in `src/lib/`).
*   MDX content is processed via `next-mdx-remote`.

## 9. Build Process and Scripts

The `package.json` defines the following key scripts:

*   **`dev`**: `next dev --turbopack` - Starts the Next.js development server with Turbopack enabled for faster compilation.
*   **`build`**: `next build` - Builds the application for production.
*   **`postbuild`**: `next-sitemap` - Generates a sitemap after the build is complete. This is automatically run after the `build` script.
*   **`start`**: `next start` - Starts the Next.js production server.
*   **`lint`**: `next lint` - Runs ESLint to check for code quality and potential errors.

## 10. Next.js Configuration (`next.config.ts`)

Key configurations include:

*   **Image Optimization:**
    *   Allowed domain: `images.ctfassets.net` (for Contentful images).
    *   Supported formats: `image/avif`, `image/webp` for optimized image delivery.
*   **`reactStrictMode`**: Enabled to help identify potential issues in React components during development.
*   **`poweredByHeader`**: Set to `false` to disable the `X-Powered-By: Next.js` header for security reasons.

## 11. Tailwind CSS Configuration (`tailwind.config.js`)

Key configurations include:

*   **Content Sources**: Properly configured to scan `.js`, `.ts`, `.jsx`, `.tsx`, and `.mdx` files within `src/pages`, `src/components`, and `src/app`.
    *   *Note: The presence of `src/pages` in content sources should be verified if the project has fully migrated to the App Router.*
*   **Theme Customizations**:
    *   **Colors**: A well-defined custom color palette is implemented:
        *   `primary`: Dark teal (#2a3d45)
        *   `secondary`: Coral/orange (#e76f51)
        *   `bg`: Light beige (#f8f3ed)
        *   `gray`: For body text (#718096)
    *   **Fonts**: Custom font families are defined:
        *   `sans` & `display`: Uses `var(--font-inter)` (likely Inter, loaded via `next/font`).
        *   `plus-jakarta`: Uses `var(--font-plus-jakarta-sans)`.
        *   `outfit`: Uses `Outfit`.
    *   **Font Sizes**: A range of custom responsive font sizes (e.g., `display-lg`, `heading`, `body`) are defined with specific line heights, letter spacing, and font weights.
    *   **Spacing**: Custom spacing unit `section: '5rem'`.
    *   **Border Radius**: Custom `btn` border radius (`0.375rem`).
    *   **Animations**: A custom `scroll` animation is defined.
*   **Plugins**: No external Tailwind CSS plugins are currently listed.

## 12. Root Layout (`src/app/layout.tsx`)

The main layout component sets up the HTML shell for the entire application.

*   **Fonts:**
    *   Imports `Inter` and `Plus_Jakarta_Sans` using `next/font`.
    *   Exposes these fonts as CSS variables (`--font-inter`, `--font-plus-jakarta-sans`) for use in Tailwind CSS configuration.
*   **Global Styles:** Imports `globals.css`.
*   **Metadata:**
    *   Provides comprehensive default metadata: `title` (with a template for page-specific titles), `description`, `keywords`, `authors`, `creator`, `publisher`.
    *   Includes detailed `openGraph` and `twitter` metadata for social media sharing.
    *   Sets `robots` meta tag for search engine crawlability.
*   **Structured Data (Schema.org):**
    *   Embeds JSON-LD structured data for `Organization` and `Service` types, enhancing SEO.
    *   *Note: Contains a placeholder phone number `+1-512-555-1234` in the structured data that should be reviewed and updated if necessary.*
*   **Analytics Integration:**
    *   Includes a `GoogleAnalytics` component (conditionally rendered based on `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable).
    *   Integrates Vercel `SpeedInsights` and `Analytics`.
*   **Body Element:** Applies font variables and `antialiased` class for better font rendering.

## 13. Homepage (`src/app/page.tsx`)

The homepage is the main landing page of the application.

*   **Structure:** Composed of several modular React components, each representing a distinct section of the page. These components are imported from the `src/components/home/` directory.
    *   `HeroSection`
    *   `ClientLogoSection`
    *   `MetricsSection`
    *   `FeaturesSection`
    *   `ProcessSection`
    *   `PricingSection`
    *   `FaqSection`
    *   `CtaSection`
*   **Layout:** Uses a `MainLayout` component (likely from `src/components/layout/`) to provide a consistent page structure (e.g., header, footer).
*   **Metadata:** Defines page-specific `title`, `description`, and `openGraph` metadata, which overrides or complements the defaults set in `layout.tsx`.

## 14. Common Layout Components (`src/components/layout/`)

This directory contains reusable components for structuring page layouts.

### `MainLayout.tsx`

*   **Purpose**: Provides the primary layout structure for most pages, including a header, main content area, and footer.
*   **Type**: Client Component (`'use client';`).
*   **Structure**:
    *   Renders a `Header` component at the top.
    *   Renders the page-specific content (`children`) within a `<main>` tag.
    *   Renders a `Footer` component at the bottom.
*   **Styling**:
    *   Uses Flexbox (`flex flex-col min-h-screen`) to ensure the layout takes up at least the full viewport height.
    *   The `<main>` element has `flex-grow` to take up available space and `pt-20` (top padding), suggesting the `Header` might be fixed or have a height of `h-20` (Tailwind's `20` spacing unit is `5rem`).

## 15. Contentful Integration (`src/lib/contentful/client.ts`)

This file handles the communication with the Contentful CMS.

*   **Clients**: 
    *   Initializes two Contentful clients using `createClient` from the `contentful` package:
        *   `contentfulClient`: For the Contentful Delivery API (live content).
        *   `contentfulPreviewClient`: For the Contentful Preview API (draft/preview content).
    *   Configuration relies on environment variables: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, and `CONTENTFUL_PREVIEW_ACCESS_TOKEN`.
    *   A utility function `getClient(preview = false)` selects the appropriate client.
*   **Type Definitions (TypeScript)**: Defines comprehensive interfaces for Contentful content models:
    *   `BlogPost`: Includes fields for title, slug, excerpt, rich text content, publish date, featured image (with URL, title, description, dimensions), and author details (name, bio, picture).
    *   `PodcastEpisode`: A detailed interface covering title, slug, description, summary, key topics, publish date, duration, guest details, episode number, Spotify embed URL, full rich text transcript, pull quotes (quote, attribution), resources mentioned (title, URL, description), transcript sections (title, content, id), and cover art (with URL, title, description, dimensions).
    *   Helper interfaces: `PullQuote`, `Resource`, `TranscriptSection`.
*   **Data Fetching Functions**:
    *   `async getBlogPosts(): Promise<BlogPost[]>`: Fetches and maps all entries of type `blogPost`, ordered by `publishDate` (descending).
    *   `async getBlogPostBySlug(slug: string): Promise<BlogPost | null>`: Fetches and maps a single `blogPost` by its `slug` field.
    *   `async getPodcastEpisodes(): Promise<PodcastEpisode[]>`: Fetches and maps all entries of type `podcastEpisode`, ordered by `publishDate` (descending).
    *   `async getPodcastEpisodeBySlug(slug: string): Promise<PodcastEpisode | null>`: Fetches and maps a single `podcastEpisode` by its `slug` field.
*   **Data Transformation**: The fetching functions transform the raw data from Contentful (e.g., `item.fields`, `fields.featuredImage.fields.file.url`) into the strongly-typed structures defined by the interfaces. This includes handling linked assets and references.
*   **Error Handling**: Basic `try...catch` blocks are implemented to log errors to the console during API calls and return empty arrays or `null` to prevent crashes.
*   **Potential Issue**: A comment `// This is a temporary file that disables Contentful integration until it's properly set up` at the top of the file appears to be outdated, as the file implements a full Contentful client. This comment should be reviewed and likely removed.

## 16. Utility Modules (`src/utils/`)

This directory contains general-purpose helper functions and utility components.

### `analytics.tsx`

*   **Purpose**: Provides integration with Google Analytics (GA4).
*   **Type**: Client Component (`'use client';`) due to usage of navigation hooks.
*   **Features**:
    *   Defines global TypeScript types for `window.gtag` and `window.dataLayer`.
    *   **`GoogleAnalytics` Component**:
        *   Accepts a `GA_MEASUREMENT_ID` prop. Renders nothing if the ID is absent.
        *   Loads the `gtag.js` script asynchronously (`strategy="afterInteractive"`).
        *   Initializes `dataLayer` and sends an initial `page_view` upon script load.
        *   Uses a nested `GoogleAnalyticsInner` component (wrapped in `React.Suspense`) to handle page view tracking on route changes.
    *   **`GoogleAnalyticsInner` Component**:
        *   Uses `usePathname()` and `useSearchParams()` hooks to detect URL changes.
        *   Sends `page_view` events to GA4 via `window.gtag('config', ...)` whenever the path or search parameters change, correctly including the full path with query string.
    *   **`trackEvent` Function**:
        *   Exports a helper function `trackEvent(action: string, category: string, label: string, value?: number)` for sending custom events to GA4.
        *   Safely checks for `window.gtag` existence before dispatching events.

### `scrollUtils.ts`

*   **Purpose**: Provides utility functions for smooth scrolling with an offset.
*   **Functions**:
    *   **`scrollToElement(elementId: string, offset: number = 50)`**:
        *   Scrolls the window smoothly to the HTML element specified by `elementId`.
        *   Applies an `offset` (defaulting to 50 pixels) from the top of the element. This is useful for ensuring the target element is not obscured by a fixed header.
        *   Calculates the target position considering the element's position relative to the viewport and the current scroll position.
        *   Uses `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })`.

## 17. Middleware (`src/middleware.ts`)

This file implements Next.js middleware to enhance security by adding various HTTP headers to responses.

*   **Functionality**: The primary role of this middleware is to set security-related HTTP headers for incoming requests.
*   **Security Headers Added**:
    *   **`Content-Security-Policy` (CSP)**: A detailed CSP is configured to control resource loading. It restricts sources for scripts, styles, images, fonts, connect-src (API calls), and frame-src (for embeds like Spotify).
        *   *Note: The CSP includes `'unsafe-inline'` for both `script-src` and `style-src`. This should be reviewed for potential security implications and alternatives like using nonces or hashes should be considered if feasible, especially for scripts.*
    *   **`X-XSS-Protection`**: Set to `1; mode=block` for older browser XSS protection.
    *   **`X-Content-Type-Options`**: Set to `nosniff` to prevent MIME-sniffing.
    *   **`Referrer-Policy`**: Set to `strict-origin-when-cross-origin` for privacy.
    *   **`Permissions-Policy`**: Configured to restrict features like camera, microphone, and interest-cohort, while allowing geolocation from `'self'`.
    *   **`Strict-Transport-Security` (HSTS)**: A strong HSTS policy is enforced (`max-age=63072000; includeSubDomains; preload`) to ensure connections are made over HTTPS.
    *   It correctly notes that `X-Frame-Options` is not needed due to the use of `frame-ancestors` in the CSP.
*   **Matcher Configuration (`config.matcher`)**:
    *   The middleware is applied to all paths except for API routes (`/api/`), Next.js internal static/image paths (`/_next/`), `favicon.ico`, and paths starting with `/images/` (likely public assets).
    *   It also avoids running on prefetch requests, which is an optimization.

## 18. Noteworthy Observations & Potential Areas for Review

*   **`