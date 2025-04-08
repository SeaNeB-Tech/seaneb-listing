export interface BusinessDetailsAPIResponse {
  u_id: string
  business_legal_name: string
  business_name: string
  pan_number: string
  gst_number: string
  address_line_1: any
  address_line_2: any
  area: string
  zip_code: any
  city: string
  state: string
  country: string
  business_category: string
  business_license_number: any
  document_link: string
  seaneb_id: string
  country_code: any
  contact_no: string
  whatsapp_no: string
  facebook_url: string
  instagram_url: string
  x_url: string
  website_url: string
  google_map_id: string
  latitude: string
  longitude: string
  icon: string
  activity_status: boolean
  otp: any
  otp_exp_time: any
  email: any
  created_at: string
  updated_at: string
  shop_galleries: ShopGallery[]
  testimonials: any
  users_businesses: UsersBusiness[]
  avg_rating: number
}

export interface UsersBusiness {
  u_id: string
  created_at: string
  updated_at: string
  users_u_id: string
  business_u_id: string
  user: User
}

export interface User {
  u_id: string
  first_name: string
  last_name: string
  full_name: string
  seaneb_id: string
  country_code: string
  mobile_no: string
  email: any
  dob: string
  gender: string
  image: string
  otp: string
  otp_exp_time: string
  player_id: any[]
  contact_id: any
  created_at: string
  updated_at: string
}

export interface ShopGallery {
  u_id: string
  link: string
  created_at: string
  updated_at: string
  business_u_id: string
}

export interface TestimonialItem {
  u_id: string
  media_url: string
  thumbnail: string
  type: string
  feedback: string
  rating: string
  created_at: string
  updated_at: string
  users_u_id: string
  business_u_id: string
  user: TestimonialUser
  business: TestimonialBusiness
}

export interface TestimonialUser {
  u_id: string
  first_name: string
  last_name: string
  image: string
}

export interface TestimonialBusiness {
  u_id: string
  business_name: string
  seaneb_id: string
  icon: string
}
