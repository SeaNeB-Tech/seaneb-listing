// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL || ''

  return {
    rules: {
      userAgent: '*',
      ...(process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? { allow: '/' } : { disallow: '/' })
    },
    sitemap: `${baseUrl}`
  }
}
