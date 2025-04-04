import { ApiEndpoint } from '@/types/api-utils'

type Endpoints = {
  categoryList: ApiEndpoint
  searchBusiness: ApiEndpoint
  viewBusiness: ApiEndpoint
  testimonials: ApiEndpoint
}

export const endpoint: Endpoints = {
  categoryList: {
    method: 'GET',
    uri: '/api/business-category-list'
  },
  searchBusiness: {
    method: 'GET',
    uri: '/api/search-business'
  },
  viewBusiness: {
    method: 'GET',
    uri: '/api/business-view'
  },
  testimonials: {
    method: 'GET',
    uri: '/api/business-testimonial-list/:id'
  }
}
