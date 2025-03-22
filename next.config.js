/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static build without API routes that might depend on next-auth
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Use transpilePackages to handle modules that need special handling
  transpilePackages: ['next-auth'],
}

module.exports = nextConfig