import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Add security headers
  const securityHeaders = new Headers(response.headers);
  
  // Content Security Policy
  // Customize based on your needs
  securityHeaders.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://open.spotify.com https://*.spotify.com 'unsafe-inline'; style-src 'self' https://*.spotify.com 'unsafe-inline'; img-src 'self' data: https: https://*.spotify.com; font-src 'self' https://*.spotify.com; connect-src 'self' https://www.google-analytics.com https://*.spotify.com; frame-src 'self' https://open.spotify.com https://*.spotify.com;"
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
  
  // X-Frame-Options to prevent clickjacking, but allow Spotify embeds
  // We don't need to set this header because we're using CSP frame-ancestors instead
  // securityHeaders.set('X-Frame-Options', 'SAMEORIGIN');

  // Return the response with the security headers
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
    headers: securityHeaders,
  });
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets folder
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}; 