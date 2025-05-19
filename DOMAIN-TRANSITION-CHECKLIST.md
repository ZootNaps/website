# Domain Transition Checklist for South Lamar Studios

This document outlines the steps needed to successfully transition your website from Squarespace to your new Next.js site hosted on Vercel.

## Before Redirecting Domain

### DNS and Domain Setup
- [ ] Configure DNS records in your domain registrar to point to Vercel
- [ ] Set up domain in Vercel dashboard
- [ ] Ensure SSL/HTTPS is properly configured (Vercel handles this automatically)
- [ ] Test the site on Vercel's default domain before transferring your primary domain

### Contact Form Setup
- [ ] Sign up for a free account at [Web3Forms](https://web3forms.com/)
- [ ] Get your access key from the Web3Forms dashboard
- [ ] Add your Web3Forms access key to your environment variables:
  ```
  NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
  ```
- [ ] Test the contact form submission to verify emails are delivered to gus@southlamarstudios.com

### Analytics & Tracking
- [ ] Set up Google Analytics 4 property
- [ ] Add your Google Analytics Measurement ID to `.env`:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- [ ] Set up Google Search Console for your new domain
- [ ] Verify ownership of new domain in Google Search Console
- [ ] Submit new sitemap to Google Search Console
- [ ] Set up any other conversion tracking (Meta Pixel, LinkedIn, etc.)

### SEO Preparation
- [ ] Verify all pages have proper metadata (titles, descriptions)
- [ ] Ensure the sitemap is configured with your actual domain (already updated)
- [ ] Create URL mapping of old to new URLs for redirects
- [ ] Prepare 301 redirects for any changed URL structures

## During Transition

### Redirects and URL Structure
- [ ] Implement 301 redirects from old URLs to new URLs
- [ ] Set up redirects in Vercel (create a `vercel.json` file if needed)
- [ ] Verify redirects are working as expected

### Testing
- [ ] Verify all pages load correctly on the new domain
- [ ] Test contact form submissions
- [ ] Confirm emails are being received
- [ ] Check analytics is tracking correctly
- [ ] Verify all forms and interactive elements work properly
- [ ] Test site on multiple devices and browsers

## After Domain Transition

### Monitoring & Verification
- [ ] Monitor site uptime and performance
- [ ] Check for 404 errors in Google Search Console
- [ ] Verify traffic is being properly tracked in Google Analytics
- [ ] Monitor form submissions

### SEO Follow-up
- [ ] Verify Google is indexing the new site
- [ ] Check for any crawl errors in Google Search Console
- [ ] Update any external links to point to new domain where possible
- [ ] Monitor search rankings for key terms

### Backup Plan
- [ ] Have a rollback plan in case of critical issues
- [ ] Keep Squarespace site active for a short period as a backup

## Technical Implementation Details

### Contact Form
- Using Web3Forms for contact form submissions (free service)
- No email credentials or server-side code needed
- Form submissions are sent to gus@southlamarstudios.com
- Form submissions are tracked in Google Analytics
- Spam protection built-in via Web3Forms

### Security Headers
- Security headers are implemented via middleware
- CSP, XSS protection, and other security headers are configured
- Rate limiting is implemented for the contact form

### Analytics
- Google Analytics is implemented via the GoogleAnalytics component
- Event tracking is set up for form submissions

## Additional Recommendations

1. Configure proper caching for static assets
2. Implement a site monitoring solution
3. Set up automated backups
4. Consider implementing a CDN for global performance (Vercel provides this)
5. Review and update business listings (Google Business, Yelp, etc.) to point to new site

## Resources

- [Vercel Domain Configuration](https://vercel.com/docs/concepts/projects/domains)
- [Google Search Console](https://search.google.com/search-console/about)
- [Google Analytics](https://analytics.google.com/)
- [Next.js Documentation](https://nextjs.org/docs) 