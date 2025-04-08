import type { NextConfig } from 'next'

const string = process.env.NEXT_PUBLIC_API_URL
const urlString = string?.slice(string.lastIndexOf('/') + 1) || ''

const cloudString = `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com`

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: urlString
      },
      {
        protocol: 'https',
        hostname: cloudString
      }
    ]
  }
}

export default nextConfig
