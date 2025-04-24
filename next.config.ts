import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
  }
}

export default nextConfig
