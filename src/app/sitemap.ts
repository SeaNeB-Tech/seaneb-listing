import type { MetadataRoute } from 'next'

import { sitemapRoutes } from '@/constants/sitemap-routes'
import axios from 'axios'
import { endpoint } from '@/services/apis/endpoint'
import { ApiResponse } from '@/types/api-response'
import { BusinessSearchResponse } from '@/services/apis/types'
import dayjs from 'dayjs'
import { toUrlName } from '@/utils'

const url = process.env.NEXT_PUBLIC_SITEMAP_URL ?? 'https://codenticsoftware.com'

interface BusinessDynamicList extends ApiResponse {
  data: BusinessSearchResponse
}

const getBusinessData = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const { data: response }: { data: BusinessDynamicList } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + endpoint.searchBusiness.uri
    )

    if (response?.data?.data?.length) {
      return response?.data?.data
        ?.filter(b => !!b?.city && !!b?.business_category && !!b?.business_legal_name)
        ?.sort((a, b) => a?.city.localeCompare(b?.city, undefined, { numeric: true, sensitivity: 'base' }))
        ?.map(business => ({
          url: `${url}${toUrlName(`/${business.city}/${business?.business_category?.split(',')?.at(0)?.trim()}/${business?.business_legal_name}`)}`,
          lastModified: business?.updated_at ? dayjs(business?.updated_at).toDate() : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9
        }))
    } else {
      return []
    }
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageRoutes = Object.values(sitemapRoutes)

  const getData = await getBusinessData()

  const finalData: MetadataRoute.Sitemap = [
    ...pageRoutes?.map(i => {
      return {
        url: `${url}${i}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
      }
    }),
    ...getData
  ]

  return finalData
}
