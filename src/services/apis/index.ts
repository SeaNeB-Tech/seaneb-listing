import { ApiResponse } from '@/types/api-response'
import { callApi } from '@/utils/api-utils'
import { BUSINESS_ITEMS_PER_PAGE, BusinessFilters } from '@/views/listing/grid'
import { endpoint } from './endpoint'
import { BusinessSearchResponse, CategoryListItem } from './types'

interface BusinessListParams {
  filters: BusinessFilters
  city: string
}

// ** Category List
export const fetchCategoryList = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.categoryList })
    .then(res => res?.data)
    .catch((err: ApiResponse) => {
      return err?.data
    })

  return response
}

// ** Business List
export const fetchBusinessList = async (pages: BusinessListParams): Promise<BusinessSearchResponse> => {
  const response = await callApi({
    uriEndPoint: endpoint.searchBusiness,
    query: {
      page: pages.filters.pageIndex,
      area: pages?.filters?.area || undefined,
      city: pages.city,
      search: pages.filters.search,
      business_category: pages.filters.category,
      items_per_page: BUSINESS_ITEMS_PER_PAGE
    }
  })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response?.data
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

// ** Popular Categories
export const fetchPopularCategories = async (): Promise<{ data: any[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.popCategory })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response
}
