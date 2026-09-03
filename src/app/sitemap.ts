// ** Next.js Imports
import type { MetadataRoute } from 'next'

// ** Third Party Imports
import axios from 'axios'
import dayjs from 'dayjs'

// ** Constants Imports
import { sitemapRoutes } from '@/constants/sitemap-routes'

const url = process.env.NEXT_PUBLIC_SITEMAP_URL ?? 'https://www.seaneb.com'
const browseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/browse`

// !! Cache configuration
const CACHE_DURATION = 3600000 // ?? 1 hour in milliseconds
let cachedData: MetadataRoute.Sitemap | null = null
let cacheTimestamp: number | null = null

const fetchFromBrowse = async (path: string = '', params: any = {}) => {
  try {
    const res = await axios.get(`${browseApiUrl}${path}`, { params, timeout: 10000 })
    return res.data?.data || null
  } catch (err) {
    return null
  }
}

const getDynamicRoutes = async (): Promise<MetadataRoute.Sitemap> => {
  // !! Return cached data if valid
  if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedData
  }

  const routes: MetadataRoute.Sitemap = []

  try {
    const countriesData = await fetchFromBrowse()
    const countries = countriesData?.items || []

    for (const country of countries) {
      if (!country?.slug) continue
      const countrySlug = country.slug

      // Add Country Route
      routes.push({
        url: `${url}/${countrySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9
      })

      const statesData = await fetchFromBrowse(`/${country.country_slug}`)
      const states = statesData?.items || []

      for (const state of states) {
        if (!state?.slug) continue
        
        // Add State Route
        routes.push({
          url: `${url}/${state.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9
        })

        const citiesData = await fetchFromBrowse(`/${country.country_slug}/${state.state_slug}`)
        const cities = citiesData?.items || []

        for (const city of cities) {
          if (!city?.slug) continue

          // Add City Route
          routes.push({
            url: `${url}/${city.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9
          })

          // Fetch Areas and Businesses for the City
          const cityAreasData = await fetchFromBrowse(`/${country.country_slug}/${state.state_slug}/${city.city_slug}`, { limit: 1000 })
          
          const areas = cityAreasData?.items || []
          for (const area of areas) {
            if (!area?.slug) continue
            // Add Area Route
            routes.push({
              url: `${url}/${area.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly',
              priority: 0.8
            })
          }

          const businesses = cityAreasData?.businesses || []
          for (const business of businesses) {
            if (!business?.seaneb_id) continue
            const seanebId = business.seaneb_id
            const lastMod = business.created_at ? dayjs(business.created_at).toDate() : new Date()

            // Add Business Details Route
            routes.push({
              url: `${url}/${seanebId}`,
              lastModified: lastMod,
              changeFrequency: 'weekly',
              priority: 0.9
            })

            // Add Business Reviews Route
            routes.push({
              url: `${url}/${seanebId}/reviews`,
              lastModified: lastMod,
              changeFrequency: 'weekly',
              priority: 0.8
            })
          }
        }
      }
    }

    cachedData = routes
    cacheTimestamp = Date.now()

    return routes
  } catch (err) {
    console.error('Error generating sitemap routes:', err)
    
    // Return empty but don't cache if there was an error
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

  const dynamicData = await getDynamicRoutes()

  // ** Use Map to ensure no duplicates
  const map = new Map<string, any>()

  for (const item of [...pageRoutes, ...dynamicData]) {
    map.set(item.url, item)
  }

  return Array.from(map.values())
}
