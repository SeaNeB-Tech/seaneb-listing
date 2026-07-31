import MajorCities from '@/views/home/major-cities'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/utils'

export const dynamic = 'force-dynamic'
import { fetchPublicBusinessBySeanebId } from '@/services/apis'
import { PublicBusinessDetail } from '@/services/apis/types'
import { TestimonialItem } from '@/types/business'
import NotFoundPage from '@/app/not-found'
import axios from 'axios'

// Business Detail components
import BusinessViewCarousel from '@/views/business/carousel'
import BusinessDetails from '@/views/business/view'
import { generateJSONLd } from '@/lib/json-ld'

// Known country slugs (2-letter ISO codes)
const KNOWN_COUNTRY_SLUGS = ['in']

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const slug = decodeURIComponent(country || '')

  // If it's a known country slug, show country metadata
  if (KNOWN_COUNTRY_SLUGS.includes(slug.toLowerCase())) {
    const displayCountry = slug.toUpperCase()
    return constructMetadata({
      title: `Explore ${displayCountry}`,
      description: `Explore states and cities in ${displayCountry}. Discover local businesses and services.`,
      keywords: `explore, ${displayCountry}, states, businesses, local services`
    })
  }

  // Otherwise try as a business
  const response = await fetchPublicBusinessBySeanebId(slug)
  const data = response?.data

  if (data) {
    const locationDisplay = [
      data?.location?.area?.area_name,
      data?.location?.city?.city_name,
      data?.location?.state?.state_name
    ].filter(Boolean).join(', ')

    return {
      ...constructMetadata({
        title: data?.business?.display_name || 'Business Details',
        description: `Find business details for ${data?.business?.display_name} located in ${locationDisplay}.${data?.contact?.website ? ` Visit their website at ${data?.contact?.website}` : ''}`,
        keywords: `business, ${data?.business?.display_name}, ${locationDisplay}`,
        image: data?.branch_logo || undefined
      }),
      alternates: {
        canonical: `/${country}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      }
    }
  }

  return constructMetadata({ title: 'Not Found' })
}

const getTestimonials = async (businessId: string): Promise<TestimonialItem[]> => {
  try {
    const updatedURI = `/api/v1/public/testimonials/${businessId}`
    const url = process.env.NEXT_PUBLIC_API_URL + updatedURI
    const listReviews = await axios.get(url)
    return listReviews?.data?.data?.data || []
  } catch {
    return []
  }
}

export default async function CountryOrBusinessPage({
  params
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const slug = decodeURIComponent(country || '')

  // If it's a known country slug, show country page
  if (KNOWN_COUNTRY_SLUGS.includes(slug.toLowerCase())) {
    return (
      <>
        <div className="pt-20">
          <MajorCities initialCountrySlug={slug} />
        </div>
      </>
    )
  }

  // Otherwise try to fetch as a business
  const response = await fetchPublicBusinessBySeanebId(slug)
  const data: PublicBusinessDetail = response?.data

  if (data) {
    const testimonials = await getTestimonials(data?.seaneb_id)
    const locationSlug = data?.location?.city?.city_slug || 'unknown'
    const jsonLd = await generateJSONLd(data as any, locationSlug, 'all', slug)

    return (
      <>
        {data && (
          <BusinessViewCarousel businessData={data} />
        )}
        <BusinessDetails businessData={data as any} testimonials={testimonials} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </>
    )
  }

  return <NotFoundPage />
}
