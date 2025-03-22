/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static build without API routes that might depend on next-auth
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Add static fallbacks for window.location.origin
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
  },
}

module.exports = nextConfig