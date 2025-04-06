/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Updated experimental configuration for Next.js 14.1.0
  experimental: {
    // allowedDevOrigins was removed as it's not supported in Next.js 14.1.0
  },
  // Configure CORS in the server middleware instead
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NOTTOFU_API_URL || process.env.API_URL || 'http://localhost:8000',
    staticFolder: '/static',
  },
  // Add transpile modules configuration for mermaid
  transpilePackages: ['mermaid'],
}

module.exports = nextConfig 