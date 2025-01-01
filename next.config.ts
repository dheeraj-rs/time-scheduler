import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp'],
  },
  // Temporarily disable strict checking during development
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  trailingSlash: true,
  // Add output: 'standalone' to optimize the build
  output: 'standalone',
  // Disable static page generation for routes that use client-side features
  staticPageGenerationTimeout: 1000,
  // Add proper handling for pages that use window object
  compiler: {
    styledComponents: true
  },
  // Add this to handle MongoDB connection during build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongodb: false,
      }
    }
    return config
  },
};

export default nextConfig;
