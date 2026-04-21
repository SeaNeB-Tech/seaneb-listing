import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com'
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_URL?.split('/').pop() ?? ''
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com`
      }
    ]
  },
    async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com/:path*`
      }
    ]
  }
}

export default nextConfig
