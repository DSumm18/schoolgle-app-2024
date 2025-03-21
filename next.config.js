/** @type {import('next').NextConfig} */
const nextConfig = {
  // We'll remove the export option to enable API routes
  // output: 'export',
  // Enabling image optimization
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig