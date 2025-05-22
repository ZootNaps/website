# Deployment Guide

This guide outlines the process for deploying the South Lamar Studios website to production environments.

## Deployment Platforms

The project is configured for deployment on Vercel, which is the recommended hosting platform for Next.js applications.

## Prerequisites

Before deployment, ensure you have:

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Access to the project's GitHub repository
3. Required environment variables documented in the Setup Guide
4. Contentful space properly configured

## Deployment Process with Vercel

### Initial Setup

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Import the GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Environment Variables

Add the following environment variables in the Vercel project settings:

```
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
CONTENTFUL_PREVIEW_TOKEN=your_contentful_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GTM_ID=your_gtm_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### Domain Configuration

1. In the Vercel dashboard, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow Vercel's instructions to verify domain ownership and configure DNS settings

### Deployment Options

#### Automatic Deployments

By default, Vercel will:
- Deploy automatically when changes are pushed to the main branch
- Generate preview deployments for pull requests
- Run the build command specified in your project settings

To configure deployment settings:
1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Git"
3. Customize production branch, build commands, and other options

#### Manual Deployments

To deploy manually:

1. Build your project locally:
   ```bash
   npm run build
   ```

2. Use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. Follow the prompts to deploy your project

### Post-Deployment Steps

After successful deployment:

1. Verify that the site is working correctly at your domain
2. Check that all environment variables are correctly applied
3. Verify Contentful content is displaying properly
4. Test contact forms and other interactive elements
5. Confirm that the sitemap has been generated

## Environment-Specific Configurations

### Production

Production builds automatically optimize for performance:
- Code is minified
- Images are optimized
- Static assets are cached
- Server components are properly rendered

### Preview Deployments

Preview deployments from pull requests:
- Use the same build process as production
- Have a unique URL for testing changes
- Can use different environment variables if configured

## Monitoring and Logging

### Vercel Analytics

Vercel provides built-in analytics that can be accessed from the Vercel dashboard:
1. Go to your project in the Vercel dashboard
2. Navigate to "Analytics"
3. View Web Vitals, usage statistics, and other metrics

### External Monitoring

Consider setting up additional monitoring:
- Set up status page monitoring with Uptime Robot or similar
- Configure error tracking with Sentry
- Implement logging with a solution like LogTail

## Rollback Procedures

If issues occur after deployment:

### Using Vercel Dashboard

1. Go to your project in the Vercel dashboard
2. Navigate to "Deployments"
3. Find a previous working deployment
4. Click the three dots menu (⋮) and select "Promote to Production"

### Using Vercel CLI

```bash
# List deployments
vercel ls

# Rollback to a specific deployment
vercel alias set <deployment-url> <your-domain.com>
```

## Performance Optimization

For optimal performance in production:

1. Verify Image Optimization:
   - Ensure images use the Next.js Image component
   - Check that image formats (AVIF, WebP) are working

2. Implement Caching:
   - Verify caching headers are correctly set
   - Use appropriate cache durations for different assets

3. Minimize JavaScript:
   - Use server components where possible
   - Avoid unnecessary client-side JavaScript
   - Implement code splitting and lazy loading

## Security Considerations

1. Verify security headers are correctly applied:
   - Check CSP (Content Security Policy)
   - Confirm HSTS is enabled
   - Test XSS protection measures

2. Protect sensitive environment variables:
   - Ensure no secrets are exposed in client-side code
   - Use appropriate access controls for the Vercel project

## Troubleshooting Deployment Issues

### Build Failures

If the build fails:
1. Check the build logs in Vercel
2. Verify all dependencies are correctly installed
3. Ensure environment variables are properly set
4. Test the build locally before deploying

### Runtime Errors

For errors after deployment:
1. Check browser console for client-side errors
2. Review Vercel logs for server-side issues
3. Verify Contentful API is accessible
4. Test environment variables are correctly applied

## Continuous Integration/Deployment

To enhance the CI/CD pipeline:
1. Add pre-commit hooks for linting and type checking
2. Implement automated tests
3. Use GitHub Actions for additional checks before deployment
4. Configure deployment notifications via Slack or email 