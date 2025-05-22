# Analytics Tracking

This document outlines the analytics tracking implementation for the South Lamar Studios website.

## Analytics Overview

The website utilizes multiple analytics solutions to track user behavior, monitor performance, and gather insights to inform business decisions:

1. **Vercel Analytics** - Built-in analytics from the hosting platform
2. **Vercel Speed Insights** - Performance monitoring
3. **Google Tag Manager (GTM)** - Tag management solution
4. **Google Analytics (GA4)** - User behavior tracking

## Configuration

### Environment Variables

The analytics implementation relies on the following environment variables:

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

These values should be set in the production environment and optionally in development for testing.

## Implementation Details

### Vercel Analytics

Vercel Analytics is implemented via the `@vercel/analytics` package:

```tsx
// In src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

This provides:
- Page views tracking
- User session data
- Geographic information
- Referral sources

### Vercel Speed Insights

Speed Insights is implemented via the `@vercel/speed-insights` package:

```tsx
// In src/app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

This monitors:
- Core Web Vitals
- Page load times
- Performance metrics by page
- Performance by device/browser

### Google Tag Manager

GTM is implemented through a custom component:

```tsx
// In src/components/analytics/GoogleTagManager.tsx
'use client';

export function GoogleTagManager({ GTM_ID }: { GTM_ID?: string }) {
  if (!GTM_ID) return null;
  
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
```

And included in the layout:

```tsx
// In src/app/layout.tsx
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager GTM_ID={process.env.NEXT_PUBLIC_GTM_ID} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Google Analytics

Google Analytics is implemented either directly or through GTM:

```tsx
// In src/components/analytics/GoogleAnalytics.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// Define types for GA
declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
  }
}

// Helper function for tracking events
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Component to handle page view tracking on route changes
function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname && window.gtag) {
      let url = pathname;
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
      
      window.gtag('config', window.GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
  
  return null;
}

// Main GA component
export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.GA_MEASUREMENT_ID = '${GA_MEASUREMENT_ID}';
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* Suspense for safer client rendering with Next.js */}
      <GoogleAnalyticsInner />
    </>
  );
}
```

## Event Tracking

### Custom Event Tracking

The website tracks various custom events:

1. **Form Submissions**
   - Contact form submissions
   - Newsletter signups

2. **Content Interactions**
   - Blog post views
   - Video plays
   - Link clicks

3. **Conversion Events**
   - Service page visits
   - CTA button clicks
   - Quote requests

### Implementation Example

```tsx
// In a component with a button
import { trackEvent } from '@/components/analytics/GoogleAnalytics';

export function ContactButton() {
  const handleClick = () => {
    // Track the click event
    trackEvent(
      'click',
      'contact',
      'header_contact_button'
    );
    
    // Proceed with action
    window.location.href = '/contact';
  };
  
  return (
    <button onClick={handleClick}>
      Contact Us
    </button>
  );
}
```

## Data Collection and Privacy

### Cookie Consent

If the website collects user data through cookies, a cookie consent banner should be implemented to comply with privacy regulations such as GDPR and CCPA.

### Data Retention

- Vercel Analytics: Data is retained according to Vercel's data retention policy
- Google Analytics: Default retention period is 26 months, but can be configured

### Privacy Policy

The website should include a privacy policy that clearly states:
- What data is collected
- How it is used
- Who it is shared with
- How users can opt out

## Reporting and Analysis

### Vercel Analytics Dashboard

Access the Vercel Analytics dashboard via:
1. Log in to Vercel
2. Select the project
3. Navigate to the Analytics tab

Key metrics to monitor:
- Visitor counts
- Page views
- Traffic sources
- Geographic distribution

### Google Analytics Reporting

Key reports to monitor in GA4:
- Acquisition reports (traffic sources)
- Behavior flow (user journey)
- Conversion reports (goal completions)
- Real-time data (current activity)

## Integration with Business Goals

The analytics implementation should be aligned with business objectives:

1. **Lead Generation Tracking**
   - Track form submissions to measure lead generation
   - Set up goals for key conversion actions

2. **Content Performance**
   - Analyze which blog posts generate the most engagement
   - Track time on page for content quality assessment

3. **User Experience Improvement**
   - Monitor bounce rates to identify user experience issues
   - Track navigation paths to optimize site structure

## Maintenance and Optimization

Regular maintenance tasks:

1. **Monthly Review**
   - Review key metrics and trends
   - Identify top-performing content and pages
   - Spot potential issues or opportunities

2. **Quarterly Audit**
   - Verify tracking code is functioning correctly
   - Update event tracking based on new features
   - Review and refine goals and conversions

3. **Annual Strategy Review**
   - Align analytics with updated business goals
   - Consider additional tracking needs
   - Evaluate analytics tools and potential upgrades

## Troubleshooting

Common issues and solutions:

1. **Missing Data**
   - Verify environment variables are correctly set
   - Check browser console for script errors
   - Test with the Google Tag Assistant extension

2. **Duplicate Events**
   - Check for multiple event listeners
   - Verify GTM triggers aren't duplicating events

3. **Inflated Metrics**
   - Filter internal traffic using IP filtering
   - Exclude development and staging environments 