import { ShopGallery } from '@/types/business'

export interface CategoryListItem {
  u_id: string
  category: string
  main_category: string
}

export interface PublicCategoryItem {
  main_category_id: string
  main_category_name: string
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

export interface PublicBusinessListingItem {
  branch_id: string
  seaneb_id: string
  business_name: string
  display_name: string
  area_name: string
  area_slug: string
  category_name: string | null
  thumbnail?: string | null
  gallery?: string[] | null
  average_rating: string
  total_reviews: number
  created_at: string
}

export interface PublicPagination {
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface PublicLocalityItem {
  area_name: string
  area_slug: string
  business_count: number
}

export interface PublicBusinessListingResponse {
  success: boolean
  data: {
    city: any
    popular_localities: any[]
    businesses: PublicBusinessListingItem[]
    pagination: PublicPagination
  }
}

export interface PublicBusinessDetail {
  branch_id: string
  seaneb_id: string
  branch_name: string
  branch_logo: string | null
  about_branch: string
  address: string
  landmark: string
  latitude: number
  longitude: number
  contact: {
    country_code: string
    primary_number: string
    whatsapp_country_code: string | null
    whatsapp_number: string | null
    business_email: string | null
    website: string | null
  }
  business: {
    business_name: string
    display_name: string
    category: {
      main_category_name: string
    } | null
  }
  location: {
    area: {
      area_name: string
      area_slug: string
    } | null
    city: {
      city_name: string
      city_slug: string
    } | null
    state: {
      state_name: string
    } | null
    country: {
      country_name: string
    } | null
  }
  timings?: any[]
  working_hours?: any[]
  owner: {
    first_name: string
    last_name: string
    email: string | null
    mobile_number: string
    country_code: string
    profile_picture?: string
    full_name?: string
  } | null
  gallery: any[]

  review_summary: {
    average_rating: number
    total_reviews: number
    rating_distribution: any
  }
  reviews: any[]
}

export interface PublicBusinessDetailResponse {
  success: boolean
  data: PublicBusinessDetail
}
