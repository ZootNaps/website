import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  async redirects() {
    return [
      // Redirect old service pages to home
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/',
        permanent: true,
      },
      // Redirect old podcast pages
      {
        source: '/founderfacing-podcast',
        destination: '/',
        permanent: true,
      },
      // Redirect styleguide
      {
        source: '/styleguide',
        destination: '/',
        permanent: true,
      },
      // Redirect old preview paths
      {
        source: '/_preview/:path*',
        destination: '/',
        permanent: true,
      },
      // Redirect any other old patterns that might exist
      {
        source: '/tmp/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
