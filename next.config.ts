import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const string = process.env.NEXT_PUBLIC_API_URL
const urlString = string?.slice(string.lastIndexOf('/') + 1) || ''

const cloudString = `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com`

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DO_SPACES_REGION: process.env.NEXT_PUBLIC_DO_SPACES_REGION,
    NEXT_PUBLIC_DO_SPACES_NAME: process.env.NEXT_PUBLIC_DO_SPACES_NAME,
    NEXT_PUBLIC_DO_SPACES_ENDPOINT: process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT,
    NEXT_PUBLIC_DO_SPACES_KEY: process.env.NEXT_PUBLIC_DO_SPACES_KEY,
    NEXT_PUBLIC_DO_SPACES_SECRET: process.env.NEXT_PUBLIC_DO_SPACES_SECRET
  },
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

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
