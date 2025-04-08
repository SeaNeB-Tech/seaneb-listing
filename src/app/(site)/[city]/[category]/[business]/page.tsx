import axios from 'axios'

import { endpoint } from '@/services/apis/endpoint'

import BusinessViewCarousel from '@/views/business/carousel'
import BusinessDetails from '@/views/business/view'

import NotFoundPage from '@/app/not-found'
import { constructMetadata } from '@/lib/utils'
import { BusinessDetailsAPIResponse, TestimonialItem } from '@/types/business'
import { Metadata } from 'next'

interface BusinessDetailsPageProps {
  params: Promise<{ city: string; category: string; business: string }>
}

export interface MetaAPIResponse {
  business_name: string
  icon: string
  website_url?: string
}

export async function generateMetadata({ params }: BusinessDetailsPageProps): Promise<Metadata> {
  // ** read route params
  const { business, city } = await params

  // ** Fetch Data
  const query = `?business_legal_name=${decodeURIComponent(business)}`
  const url = process.env.NEXT_PUBLIC_API_URL + endpoint.businessMeta.uri + query

  const { data }: { data: { data: MetaAPIResponse } } = await axios.get(url)

  return constructMetadata({
    title: data?.data?.business_name,
    description: `Find business details for ${data?.data?.business_name} located in ${decodeURIComponent(city)}.${data?.data?.website_url ? ` Visit their website at ${data?.data?.website_url}` : ''}`,
    keywords: `business, ${data?.data?.business_name}, ${decodeURIComponent(city)}`,
    image: data?.data?.icon
  })
}

const getTestimonials = async (businessId: string): Promise<TestimonialItem[]> => {
  try {
    const updatedURI = endpoint.testimonials.uri.replace(':id', businessId)

    const url = process.env.NEXT_PUBLIC_API_URL + updatedURI

    const listReviews = await axios.get(url)

    return listReviews?.data?.data?.data || []
  } catch {
    return []
  }
}

const BusinessDetailsPage = async ({ params }: BusinessDetailsPageProps) => {
  const getParams = await params
  const { city, business } = getParams

  // ** API URL
  const query = `?business_legal_name=${decodeURIComponent(business)}&city=${decodeURIComponent(city)}`
  const url = process.env.NEXT_PUBLIC_API_URL + endpoint.viewBusiness.uri + query

  const { data }: { data: { data: BusinessDetailsAPIResponse } } = await axios.get(url)

  if (data?.data) {
    const testimonials = await getTestimonials(data?.data?.u_id)

    return (
      <>
        {!!data?.data?.shop_galleries?.length && data?.data?.country && data?.data?.state && (
          <BusinessViewCarousel businessData={data?.data} />
        )}
        <BusinessDetails businessData={data?.data} testimonials={testimonials} />
      </>
    )
  } else {
    return <NotFoundPage />
  }
}

export default BusinessDetailsPage
