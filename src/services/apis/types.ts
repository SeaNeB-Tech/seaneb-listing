import { ShopGallery } from '@/types/business'

export interface CategoryListItem {
  u_id: string
  category: string
  main_category: string
}

export interface BusinessSearchResponse {
  data: Daum[]
  payload: Payload
}

export interface Daum {
  u_id: string
  business_name: string
  business_legal_name: string
  business_category: string
  icon: string
  area: string
  city: string
  created_at: string
  shop_galleries: ShopGallery[]
  updated_at: string
  state: string
  country: string
  testimonials: any
  avg_rating: any
}

export interface Payload {
  pagination: Pagination
}

export interface Pagination {
  first_page_url: string
  from: number
  items_per_page: number
  last_page: number
  links: Link[]
  next_page_url: string
  page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Link {
  url: string
  label: any
  active?: boolean
  page?: number
}
