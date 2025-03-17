/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // This setting is only temporary to get your deployment working.
    // Remove this once you've addressed all TypeScript errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Optimizations
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  poweredByHeader: false,
}

module.exports = nextConfig