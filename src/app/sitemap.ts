import type { MetadataRoute } from 'next'

import { sitemapRoutes } from '@/constants/sitemap-routes'

const url = process.env.NEXT_PUBLIC_SITEMAP_URL ?? 'https://codenticsoftware.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pageRoutes = Object.values(sitemapRoutes)

  return pageRoutes?.map(i => {
    return {
      url: `${url}${i}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  })
}
