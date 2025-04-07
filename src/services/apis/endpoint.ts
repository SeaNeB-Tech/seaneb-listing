import { ApiEndpoint } from '@/types/api-utils'

type Endpoints = {
  categoryList: ApiEndpoint
  majorCities: ApiEndpoint
  searchBusiness: ApiEndpoint
  viewBusiness: ApiEndpoint
  businessMeta: ApiEndpoint
  testimonials: ApiEndpoint
}

export const endpoint: Endpoints = {
  categoryList: {
    method: 'GET',
    uri: '/api/business-category-list'
  },
  majorCities: {
    method: 'GET',
    uri: '/api/major-city'
  },
  searchBusiness: {
    method: 'GET',
    uri: '/api/search-business'
  },
  viewBusiness: {
    method: 'GET',
    uri: '/api/business-view'
  },
  businessMeta: {
    method: 'GET',
    uri: '/api/business-meta'
  },
  testimonials: {
    method: 'GET',
    uri: '/api/business-testimonial-list/:id'
  }
}
