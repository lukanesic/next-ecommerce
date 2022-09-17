/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.restorationhardware.com'],
  },
}

module.exports = nextConfig
