// ** Next.js Imports
import type { MetadataRoute } from 'next'

// ** Third Party Imports
import axios from 'axios'
import dayjs from 'dayjs'

// ** Constants Imports
import { sitemapRoutes } from '@/constants/sitemap-routes'

// ** Services Imports
import { endpoint } from '@/services/apis/endpoint'

// ** Types Imports
import { ApiResponse } from '@/types/api-response'
import { BusinessSearchResponse } from '@/services/apis/types'

const url = process.env.NEXT_PUBLIC_SITEMAP_URL ?? 'https://www.seaneb.com'
const apiUrl = process.env.NEXT_PUBLIC_API_URL + endpoint.searchBusiness.uri

interface BusinessDynamicList extends ApiResponse {
  data: BusinessSearchResponse
}

// !! Cache configuration
const CACHE_DURATION = 3600000 // ?? 1 hour in milliseconds
let cachedData: MetadataRoute.Sitemap | null = null
let cacheTimestamp: number | null = null

const getBusinessData = async (): Promise<MetadataRoute.Sitemap> => {
  // !! Return cached data if valid
  if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedData
  }

  const sanitizeSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '') // removes || and other invalid chars
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  try {
    const { data: response }: { data: BusinessDynamicList } = await axios.get(apiUrl, {
      // ?? Add timeout to prevent long hangs
      timeout: 5000
    })

    if (!response?.data?.data?.length) {
      cachedData = []
      cacheTimestamp = Date.now()

      return []
    }

    // ?? Process data in a single pass
    const businessRoutes: MetadataRoute.Sitemap = []
    for (const business of response.data.data) {
      if (business?.city && business?.business_category && business?.business_legal_name) {
        const rawCategory = business.business_category?.split(',')[0]?.trim() || 'general'
        const city = sanitizeSlug(business.city)
        const cat = sanitizeSlug(rawCategory)
        const name = sanitizeSlug(business.business_legal_name)
        const finalUrl = `${url}/${city}/${cat}/${name}`

        businessRoutes.push({
          url: encodeURI(finalUrl).replace(/&/g, '%26'),
          lastModified: business.updated_at ? dayjs(business.updated_at).toDate() : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9
        })
        
        businessRoutes.push({
          url: encodeURI(`${finalUrl}/reviews`).replace(/&/g, '%26'),
          lastModified: business.updated_at ? dayjs(business.updated_at).toDate() : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8
        })
      }
    }

    // !! Sort only if necessary
    if (businessRoutes.length > 1) {
      businessRoutes.sort((a, b) =>
        (a.url.split('/')[3] || '').localeCompare(b.url.split('/')[3] || '', undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      )
    }

    cachedData = businessRoutes
    cacheTimestamp = Date.now()

    return businessRoutes
  } catch {
    cachedData = []
    cacheTimestamp = Date.now()

    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ** Pre-compute page routes
  const pageRoutes: MetadataRoute.Sitemap = Object.values(sitemapRoutes).map(route => ({
    url: `${url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  const businessData = await getBusinessData()

  // ** Use Set to ensure no duplicates
  const map = new Map()

  for (const item of [...pageRoutes, ...businessData]) {
    map.set(item.url, item)
  }

  return Array.from(map.values())
}
