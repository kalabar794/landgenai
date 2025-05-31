import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Minimal config for debugging
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      }
    ],
  },
}

export default nextConfig