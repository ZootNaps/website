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
