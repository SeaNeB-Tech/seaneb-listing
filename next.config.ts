import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL // if you use this somewhere in the frontend
    // Only expose safe, public-facing values here.
    // DO NOT put GOOGLE_API_KEY here if you want it private!
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
