# Development Guide

This guide outlines the development workflow, standards, and best practices for the South Lamar Studios website.

## Development Environment

1. Follow the steps in the `SETUP_GUIDE.md` to set up your local development environment
2. Use the Next.js development server with Turbopack for fast refresh:
   ```bash
   npm run dev
   ```

## Project Structure

The project follows the Next.js App Router structure:

- `src/app/` - Page routes and layouts
- `src/components/` - Reusable UI components
- `src/lib/` - Utilities and external service integrations
- `src/utils/` - Helper functions

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Ensure proper typing for all components and functions
- Avoid using `any` type where possible
- Use interfaces for complex data structures

### Component Structure

1. Organize components by feature or page
2. Create reusable UI components in the `components/ui` directory
3. Follow this component structure:
   ```tsx
   'use client'; // For client components only

   import { useState } from 'react';
   
   interface ComponentProps {
     // Define prop types
   }
   
   export function Component({ prop1, prop2 }: ComponentProps) {
     // Component logic
     
     return (
       // JSX
     );
   }
   ```

### Icons and UI Elements

The project uses Font Awesome 6 for icons with enhanced tree-shaking and optimized SVG rendering:

```tsx
// Importing the icon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Icons are pre-configured in src/lib/fontawesome.ts - no need to import individual icons
// Available solid icons: faCheck, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, 
// faClock, faEnvelope, faMapMarkerAlt, faBars, faTimes, faUserCheck, faHandshake, 
// faMicrophone, faEnvelopeOpenText, faClipboardQuestion, faHexagonNodes

// Available brand icons: faTwitter, faFacebook, faLinkedin, faInstagram, 
// faYoutube, faSpotify, faApple

// Using in a component
<FontAwesomeIcon icon="check" className="text-green-500 mr-2" />
<FontAwesomeIcon icon="user-check" className="w-8 h-8 text-secondary" />
<FontAwesomeIcon icon={['fab', 'twitter']} className="text-blue-500" />
```

**Font Awesome 6 Configuration:**
- Icons are centrally configured in `src/lib/fontawesome.ts`
- Tree-shaking is enabled to include only used icons
- SVG rendering provides better performance than web fonts
- CSS auto-addition is disabled for manual control

**Adding New Icons:**
1. Import the icon in `src/lib/fontawesome.ts`
2. Add it to the library.add() call
3. Use the icon name string in components

### Content Management and Categories

The project uses an enhanced blog category system with automatic styling:

```tsx
// Using category utilities
import { getCategoryStyle, getAllCategories, isValidCategory } from '@/utils/categoryUtils';

// Get styling for a category
const categoryStyle = getCategoryStyle('Playbook');
// Returns: { color, textColor, bgColor, borderColor, description, icon }

// Use in components
<span className={`px-3 py-1 rounded-full ${categoryStyle.color} ${categoryStyle.textColor}`}>
  {categoryStyle.icon} {category}
</span>

// Available categories with automatic styling:
// - Playbook 📋 (emerald)
// - Deep Dive 🔍 (blue) 
// - Strategy 🎯 (purple)
// - Case Study 📊 (orange)
// - Industry Insights 📈 (indigo)
// - How To 🛠️ (green)
```

**Category System Features:**
- **Automatic Styling**: Each category has predefined colors, icons, and descriptions
- **Type Safety**: TypeScript support for all category operations
- **Priority Sorting**: Categories are sorted by importance for consistent display
- **Responsive Design**: Styling adapts to mobile and desktop layouts
- **Filter Functionality**: Enhanced filtering on blog pages

### Styling

- Use Tailwind CSS v4 for styling components
- Follow the design system defined in `@theme` directive in `globals.css`
- Use the comprehensive color palette (primary, secondary, tertiary with full shade ranges)
- Use the `tailwind-merge` utility for conditional class names
- Leverage CSS custom properties for consistent theming:
  ```tsx
  <div
    className={`
      w-full p-4 rounded-lg 
      bg-primary text-white 
      hover:bg-primary-dark transition-colors
      shadow-soft hover:shadow-medium
    `}
  >
  ```

**Tailwind CSS v4 Features:**
- `@theme` directive for design token definition
- Enhanced color palette with full shade ranges (50-900)
- Built-in design system utilities (`.btn`, `.card`, `.section`)
- Comprehensive shadow system (`.shadow-soft`, `.shadow-medium`, `.shadow-strong`)
- Animation utilities (`.animate-scroll`, `.animate-float`, `.animate-pulse-soft`)

### Animation and Interactions

The project uses Framer Motion for enhanced animations and interactions with performance optimization:

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Basic motion component with hover and tap animations
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn-primary"
>
  Click me
</motion.div>

// Scroll-triggered animations with useInView hook
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

<motion.div
  ref={ref}
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  <motion.div variants={itemVariants}>
    Animated content
  </motion.div>
</motion.div>

// Animated counters for metrics
const useAnimatedCounter = (targetValue: number, isInView: boolean, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, isInView, duration]);

  return count;
};
```

**Animation Best Practices:**
- Use `useInView` for scroll-triggered animations to improve performance
- Implement `prefers-reduced-motion` support (handled in globals.css)
- Use consistent animation variants across components
- Leverage `will-change` property for smooth animations
- Implement staggered animations for lists and grids

### CSS Architecture

The project now uses a comprehensive design system with:

1. **@theme Directive**: Tailwind v4's new configuration method
2. **Design Tokens**: Consistent spacing, colors, typography, and shadows
3. **Accessibility**: Enhanced focus states, reduced motion support, and contrast adjustments
4. **Animation System**: Predefined keyframes and utilities
5. **Legacy Compatibility**: Both new format and legacy CSS variables

Key utility classes available:
- `.shadow-soft`, `.shadow-medium`, `.shadow-strong`, `.shadow-glow`
- `.animate-scroll`, `.animate-float`, `.animate-pulse-soft`
- `.text-gradient`, `.text-gradient-primary`, `.text-gradient-vibrant`
- `.section-spacing`, `.section-spacing-sm`, `.section-spacing-lg`
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.card`, `.card-elevated`

**Design System Colors:**
```css
/* Primary colors (deep teal) */
bg-primary, text-primary, border-primary
bg-primary-50 through bg-primary-900

/* Secondary colors (warm orange) */
bg-secondary, text-secondary, border-secondary
bg-secondary-50 through bg-secondary-900

/* Tertiary colors (light blue) */
bg-tertiary, text-tertiary, border-tertiary
bg-tertiary-50 through bg-tertiary-900

/* Background colors */
bg-bg, bg-bg-dark, bg-bg-light
```

## State Management

- Use React's built-in state management (useState, useContext) for component state
- For complex state, consider using the `useReducer` hook
- Keep state as close as possible to where it's used

## Data Fetching

### Contentful Data

Use the Contentful helper functions in `src/lib/contentful/client.ts`:

```tsx
// In a Server Component
import { getBlogPosts } from '@/lib/contentful/client';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    // Render posts
  );
}
```

### API Routes

For custom API functionality, add endpoints in `src/app/api/`:

```tsx
// src/app/api/example/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ data: 'example' });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Process data
  return NextResponse.json({ success: true });
}
```

## Working with Content

### Adding New Content Types

1. Create the content model in Contentful
2. Add TypeScript interfaces in `src/lib/contentful/types.ts`
3. Create fetching functions in `src/lib/contentful/client.ts`
4. Implement components to display the content

### Blog Posts

Blog posts are fetched from Contentful and rendered using the rich text renderer:

```tsx
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getBlogPostBySlug } from '@/lib/contentful/client';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div className="content">
        {documentToReactComponents(post.content)}
      </div>
    </article>
  );
}
```

## Working with Images

### Image Optimization

1. Use the Next.js Image component for all images:
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/path/to/image.jpg"
     alt="Descriptive alt text"
     width={800}
     height={600}
     quality={80}
     priority={isHero}
   />
   ```

2. For Contentful images, use the utility functions in `src/utils/imageUtils.ts`:
   ```tsx
   import { getOptimizedImageUrl, getResponsiveSrcSet } from '@/utils/imageUtils';
   
   <Image
     src={getOptimizedImageUrl(contentfulImageUrl, {
       width: 1200,
       format: 'webp',
       quality: 80
     })}
     alt="Image description"
     sizes="(max-width: 768px) 100vw, 50vw"
     fill
     className="object-cover"
   />
   ```

3. For responsive images, provide appropriate `sizes` attribute and use WebP format:
   ```tsx
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   ```

4. Follow the image guidelines in `documentation/image-guidelines.md` for content images.

## Testing

While no testing framework is currently set up, consider adding:

- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

## Git Workflow

1. Work on feature branches named with the pattern: `feature/feature-name`
2. For bug fixes, use the pattern: `fix/issue-description`
3. Commit messages should be descriptive and follow conventional commit format
4. Create pull requests for review before merging to main
5. Keep commits focused and logical

## Build and Deployment

### Local Build

Test production builds locally:

```bash
npm run build
npm run start
```

### Deployment

The site is deployed on Vercel. The deployment process:

1. Push changes to the main branch
2. Vercel automatically builds and deploys the site
3. After build, the sitemap is generated via the postbuild script

## Performance Optimization

- Use Next.js Image component for optimized images
- Implement lazy loading for below-the-fold content
- Minimize client-side JavaScript
- Use server components where possible
- Monitor Vercel Speed Insights for performance metrics

## Security Best Practices

- Keep dependencies updated
- Don't expose sensitive information in client-side code
- Use the security headers defined in middleware.ts
- Validate all user inputs
- Implement proper CSRF protection for forms

## Troubleshooting

### Common Issues

- **Contentful API errors**: Check API keys and content model structure
- **Build failures**: Verify imports and TypeScript types
- **CSS issues**: Check Tailwind class names and configuration
- **Next.js errors**: Consult the [Next.js documentation](https://nextjs.org/docs)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Developer Documentation](https://www.contentful.com/developers/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vercel Documentation](https://vercel.com/docs)

## Build Process
- Development: `npm run dev` - runs Next.js dev server with Turbopack
- Build: `npm run build` - builds the Next.js application
- Post-build: `next-sitemap` - generates sitemap
- Start: `npm run start` - starts the production server

Note: ESLint has been removed from the project as of recent updates. 