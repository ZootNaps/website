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

### Styling

- Use Tailwind CSS for styling components
- Follow the predefined color scheme in `tailwind.config.js`
- Use the `tailwind-merge` utility for conditional class names
- For complex components, organize classes logically:
  ```tsx
  <div
    className={`
      w-full p-4 rounded-lg 
      bg-primary text-white 
      hover:bg-primary-dark transition-colors
    `}
  >
  ```

## State Management

- Use React's built-in state management (useState, useContext) for component state
- For complex state, consider using the `useReducer` hook
- Keep state as close as possible to where it's used

## Data Fetching

### Contentful Data

Use the Contentful helper functions in `src/lib/contentful.ts`:

```tsx
// In a Server Component
import { getBlogPosts } from '@/lib/contentful';

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
3. Create fetching functions in `src/lib/contentful.ts`
4. Implement components to display the content

### Blog Posts

Blog posts are fetched from Contentful and rendered using the rich text renderer:

```tsx
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getBlogPostBySlug } from '@/lib/contentful';

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