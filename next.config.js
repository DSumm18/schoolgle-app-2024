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
  // Skip type checking completely
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint checks
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip linting
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 4,
  },
  // Force cache to be disabled
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Disable webpack telemetry
  webpack: (config, { dev, isServer }) => {
    // Further optimization can be done here
    return config;
  },
}

module.exports = nextConfig