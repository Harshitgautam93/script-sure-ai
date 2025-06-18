/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: [],
    unoptimized: false,
  },
  // Optimize for Vercel
  output: 'standalone',
  poweredByHeader: false,
}

module.exports = nextConfig 