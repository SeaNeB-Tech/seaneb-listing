import { ApiEndpoint } from '@/types/api-utils'

type Endpoints = {
  categoryList: ApiEndpoint
  searchBusiness: ApiEndpoint
  viewBusiness: ApiEndpoint
  businessMeta: ApiEndpoint
  testimonials: ApiEndpoint
  majorCities: ApiEndpoint
  areaList: ApiEndpoint
  popCategory: ApiEndpoint
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
  businessMeta: {
    method: 'GET',
    uri: '/api/business-meta'
  },
  testimonials: {
    method: 'GET',
    uri: '/api/business-testimonial-list/:id'
  },
  majorCities: {
    method: 'GET',
    uri: '/api/major-city'
  },
  areaList: {
    method: 'GET',
    uri: '/api/area-list'
  },
  popCategory: {
    method: 'GET',
    uri: '/api/popular-category'
  }
}
