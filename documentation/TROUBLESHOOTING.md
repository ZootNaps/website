# Troubleshooting Guide

This guide provides solutions for common issues that may arise when working with the South Lamar Studios website.

## Development Environment Issues

### Node.js and NPM

**Issue**: Incompatible Node.js version
```
Error: The engine "node" is incompatible with this module
```

**Solution**:
1. Check the required Node.js version in `package.json`
2. Install the correct version using NVM:
   ```bash
   nvm install 18
   nvm use 18
   ```

**Issue**: Package installation failures
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution**:
1. Clear NPM cache:
   ```bash
   npm cache clean --force
   ```
2. Delete `node_modules` folder and reinstall:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

### Next.js Development Server

**Issue**: Development server won't start
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:
1. Find the process using port 3000:
   ```bash
   lsof -i :3000
   ```
2. Kill the process:
   ```bash
   kill -9 <PID>
   ```
3. Or use a different port:
   ```bash
   npm run dev -- -p 3001
   ```

**Issue**: Hot reload not working
```
Changes not reflecting in browser
```

**Solution**:
1. Check if file is being imported correctly
2. Verify that file is not inside `node_modules`
3. Restart the development server:
   ```bash
   npm run dev
   ```

## Build and Deployment Issues

### Build Failures

**Issue**: TypeScript errors preventing build
```
Type error: Property 'X' does not exist on type 'Y'
```

**Solution**:
1. Fix the TypeScript errors in the indicated files
2. Add proper type definitions
3. If needed, use type assertions (`as` keyword) as a temporary solution

**Issue**: Out of memory during build
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed
```

**Solution**:
1. Increase Node.js memory limit:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```
2. Optimize large components or split them into smaller ones

### Vercel Deployment

**Issue**: Build failing on Vercel but works locally
```
Error: Build failed with exit code 1
```

**Solution**:
1. Check Vercel build logs for specific errors
2. Verify environment variables are set correctly in Vercel
3. Ensure Node.js version is compatible (set in Vercel project settings)

**Issue**: Environment variables not available during build
```
TypeError: Cannot read properties of undefined (reading 'CONTENTFUL_SPACE_ID')
```

**Solution**:
1. Add the missing environment variables in Vercel project settings
2. Ensure variables needed at build time are prefixed with `NEXT_PUBLIC_` if used in client components

## Contentful Integration Issues

### Content Fetching

**Issue**: Unable to fetch content from Contentful
```
Error: The access token you sent could not be found or is invalid
```

**Solution**:
1. Verify the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` values
2. Check if the token has proper permissions in Contentful
3. Test the token using Contentful's API Explorer

**Issue**: Missing content fields
```
TypeError: Cannot read properties of undefined (reading 'fields')
```

**Solution**:
1. Check if the content entry exists in Contentful
2. Verify that the content model has all required fields
3. Add null checks in code when accessing nested properties:
   ```typescript
   const title = entry?.fields?.title || 'Default Title';
   ```

### Content Preview

**Issue**: Preview mode not working
```
Unable to see draft content in preview mode
```

**Solution**:
1. Verify `CONTENTFUL_PREVIEW_TOKEN` is set correctly
2. Check that preview URL is properly constructed
3. Ensure the preview route handler is implemented correctly

## Styling and UI Issues

### Tailwind CSS

**Issue**: Tailwind styles not applying
```
CSS classes have no effect
```

**Solution**:
1. Verify that the class names are spelled correctly
2. Check if the class is included in the Tailwind configuration
3. Inspect the generated CSS to see if the class is being included in the build

**Issue**: Custom Tailwind configuration not working
```
Custom colors or styles not applying
```

**Solution**:
1. Check `tailwind.config.js` for syntax errors
2. Verify that the custom styles are properly defined in the `extend` section
3. Restart the development server to apply configuration changes

### Responsive Design

**Issue**: Layout breaks on mobile devices
```
Elements overflow or display incorrectly on small screens
```

**Solution**:
1. Use responsive utility classes (e.g., `sm:`, `md:`, `lg:`)
2. Test with browser dev tools in responsive mode
3. Add appropriate media queries for complex layouts:
   ```css
   @media (max-width: 640px) {
     /* Mobile-specific styles */
   }
   ```

## Performance Issues

### Slow Page Load

**Issue**: Pages load slowly
```
High LCP (Largest Contentful Paint) values
```

**Solution**:
1. Optimize images:
   - Use Next.js Image component with proper sizing
   - Use modern formats (WebP, AVIF)
   - Lazy load below-the-fold images
2. Minimize JavaScript:
   - Use server components where possible
   - Implement code splitting
   - Remove unused dependencies

**Issue**: Layout shifts during loading
```
High CLS (Cumulative Layout Shift) values
```

**Solution**:
1. Add width and height to images
2. Use placeholders for loading content
3. Avoid inserting content above existing content

### Memory Leaks

**Issue**: Browser memory usage grows over time
```
Performance degrades the longer the site is used
```

**Solution**:
1. Check for cleanup in useEffect hooks:
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {
       // Some operation
     }, 1000);
     
     return () => clearInterval(interval); // Cleanup
   }, []);
   ```
2. Remove event listeners when components unmount
3. Use the React DevTools profiler to identify problematic components

## API Issues

### Contact Form

**Issue**: Contact form submissions fail
```
Error: Failed to send message
```

**Solution**:
1. Check that the API route is implemented correctly
2. Verify email configuration (Nodemailer)
3. Test with minimal data to isolate the issue
4. Check server logs for specific error messages

### Sitemap Generation

**Issue**: Sitemap not generating correctly
```
Error during sitemap generation or missing URLs
```

**Solution**:
1. Verify that `next-sitemap` is running after build
2. Check the `next-sitemap.config.js` file for errors
3. Ensure dynamic routes are properly included in the sitemap
4. Verify that the `SITE_URL` environment variable is set correctly

## Security Issues

### Content Security Policy

**Issue**: Resources blocked by CSP
```
Refused to load X because it violates the following Content Security Policy directive
```

**Solution**:
1. Check browser console for specific CSP violations
2. Update the CSP in `middleware.ts` to include necessary domains
3. Be as restrictive as possible while allowing required resources

### Authentication Issues

**Issue**: User cannot access protected routes
```
Unauthorized access or redirect loops
```

**Solution**:
1. Check authentication logic
2. Verify JWT or session tokens
3. Ensure cookies are properly set and accessible

## Browser Compatibility

**Issue**: Site works in some browsers but not others
```
Layout or functionality issues in specific browsers
```

**Solution**:
1. Use browser-compatible features or add polyfills
2. Test in multiple browsers
3. Use feature detection instead of browser detection:
   ```javascript
   if ('IntersectionObserver' in window) {
     // Use IntersectionObserver
   } else {
     // Fallback behavior
   }
   ```

## Debugging Techniques

### Next.js Debugging

1. Enable verbose build output:
   ```bash
   npm run build -- --debug
   ```

2. Use server-side logging:
   ```typescript
   console.log('Server-side data:', data);
   ```

3. Check `.next/server/pages` for server-side code output

### React Debugging

1. Use React Developer Tools browser extension
2. Implement component logging:
   ```typescript
   console.log('Component rendered with props:', props);
   ```
3. Use React ErrorBoundary components to catch and display errors

### Network Debugging

1. Use browser Network tab to inspect requests
2. Add request/response logging in API routes:
   ```typescript
   console.log('Request body:', req.body);
   console.log('Response:', data);
   ```
3. Use tools like Postman to test API endpoints directly

## Getting Help

If you're unable to resolve an issue using this guide:

1. Search for similar issues in the Next.js GitHub repository
2. Check the Contentful documentation for CMS-related issues
3. Post questions on Stack Overflow with the appropriate tags
4. Consult the project team for specific implementation details 