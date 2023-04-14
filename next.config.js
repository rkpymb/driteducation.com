/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['aitechnolog.com', 'api.driteducation.com', 'server.supermarks.in'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}


module.exports = nextConfig
