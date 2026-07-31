import { ApiResponse } from '@/types/api-response'
import { callApi } from '@/utils/api-utils'
import { BUSINESS_ITEMS_PER_PAGE, BusinessFilters } from '@/views/listing/grid'
import { endpoint } from './endpoint'
import { BusinessSearchResponse, CategoryListItem, PublicCategoryItem, PublicBusinessListingResponse, PublicBusinessDetailResponse } from './types'
import Axios from 'axios'

interface BusinessListParams {
  filters: BusinessFilters
  city: string
}

// ** Category List
export const fetchCategoryList = async (): Promise<{ data: PublicCategoryItem[] }> => {
  try {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/categories`)
    return response.data || { data: [] }
  } catch (err) {
    console.error('Error fetching categories:', err)
    return { data: [] }
  }
}

// ** Business List
export const fetchBusinessList = async (pages?: BusinessListParams): Promise<PublicBusinessListingResponse | null> => {
  try {
    const formatSlug = (s: string) => encodeURIComponent(decodeURIComponent(s).toLowerCase().replace(/[\s_]+/g, '-'))
    const citySlug = pages?.city ? formatSlug(pages.city) : 'default'
    const category = pages?.filters.category || undefined
    const area = pages?.filters.area || undefined
    
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/${citySlug}`, {
      params: {
        page: pages?.filters.pageIndex || 1,
        area: area,
        search: pages?.filters.search || undefined,
        category: category,
        sort: pages?.filters.sort || 'default',
        limit: BUSINESS_ITEMS_PER_PAGE
      }
    })
    return response.data
  } catch (err) {
    // Suppress console.error to prevent Next.js red error overlay on 404 (City Not Found)
    return null
  }
}

export const fetchPublicBusinessDetail = async (citySlug: string, categorySlug: string, seanebId: string) => {
  try {
    const formatSlug = (s: string) => encodeURIComponent(decodeURIComponent(s).toLowerCase().replace(/[\s_]+/g, '-'))
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/${formatSlug(citySlug)}/${formatSlug(categorySlug)}/${formatSlug(seanebId)}`
    const response = await Axios.get(url)
    return response.data
  } catch (error: any) {
    console.error('Error in fetchPublicBusinessDetail:', error?.message || error)
    return null
  }
}

export const fetchPublicBusinessBySeanebId = async (seanebId: string) => {
  try {
    const formatSlug = (s: string) => encodeURIComponent(decodeURIComponent(s).toLowerCase().replace(/[\s_]+/g, '-'))
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/business/${formatSlug(seanebId)}`
    const response = await Axios.get(url)
    return response.data
  } catch (error: any) {
    if (error?.response?.status !== 404) {
      console.error('Error in fetchPublicBusinessBySeanebId:', error?.message || error)
    }
    return null
  }
}

export const fetchPublicLocalities = async (citySlug: string) => {
  try {
    const formatSlug = (s: string) => encodeURIComponent(decodeURIComponent(s).toLowerCase().replace(/[\s_]+/g, '-'))
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/${formatSlug(citySlug)}/localities`
    const response = await Axios.get(url)
    return response.data
  } catch (error) {
    return { data: [] }
  }
}

// ** Testimonial List
export const fetchBusinessTestimonials = async ({ id }: { id: string }): Promise<BusinessSearchResponse> => {
  const response = await callApi({
    uriEndPoint: endpoint.testimonials,
    pathParams: { id }
  })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response?.data
}

// ** Major Cities
export const fetchMajorCities = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.majorCities })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response
}

// ** Area List
export const fetchAreaList = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.areaList })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response
}

export * from './browse';
export * from './browse-types';
