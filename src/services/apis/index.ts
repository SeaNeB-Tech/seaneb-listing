import { ApiResponse } from '@/types/api-response'
import { callApi } from '@/utils/api-utils'
import { BUSINESS_ITEMS_PER_PAGE, BusinessFilters } from '@/views/listing/grid'
import { endpoint } from './endpoint'
import { BusinessSearchResponse, CategoryListItem } from './types'

// ** Category List
export const fetchCategoryList = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.categoryList })
    .then(res => res?.data)
    .catch((err: ApiResponse) => {
      return err?.data
    })

  return response
}

export const fetchMajorCities = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.majorCities })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response
}

interface BusinessListParams {
  filters: BusinessFilters
  city: string
}

// ** Category List
export const fetchBusinessList = async (pages: BusinessListParams): Promise<BusinessSearchResponse> => {
  const response = await callApi({
    uriEndPoint: endpoint.searchBusiness,
    query: {
      page: pages.filters.pageIndex,
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
