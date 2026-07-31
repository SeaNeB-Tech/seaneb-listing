import type { NextConfig } from 'next'

const s3Host = process.env.NEXT_PUBLIC_S3_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_S3_BASE_URL).hostname
  : 'seaneb-bucket.blr1.cdn.digitaloceanspaces.com'
  
const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL || 'https://seaneb-bucket.blr1.cdn.digitaloceanspaces.com'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
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
        hostname: s3Host
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com'
      }
    ]
  },
    async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: `${s3BaseUrl}/:path*`
      }
    ]
  }
}

export default nextConfig

