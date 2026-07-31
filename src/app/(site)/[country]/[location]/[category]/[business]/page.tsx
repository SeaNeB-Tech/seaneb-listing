import { fetchBrowseStates } from '@/services/apis'
import NotFoundPage from '@/app/not-found'
import { Metadata } from 'next'
import ExploreAreaPage, { generateMetadata as generateExploreAreaMetadata } from '@/app/explore/[country]/[state]/[city]/[area]/page'

interface BusinessDetailsPageProps {
  params: Promise<{ country: string; location: string; category: string; business: string }>
}

export async function generateMetadata({ params }: BusinessDetailsPageProps): Promise<Metadata> {
  const { country, location, category, business } = await params
  
  let decodedLocation = decodeURIComponent(location || '')

  // Check if it's a state (meaning this route is actually /[country]/[state]/[city]/[area])
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some((s: any) => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return generateExploreAreaMetadata({ params: Promise.resolve({ country, state: decodedLocation, city: category, area: business }) })
  }

  // If not a state, this route is invalid since business details have moved to 3-segment URLs
  return { title: 'Not Found' }
}

const BusinessOrAreaPage = async ({ params }: BusinessDetailsPageProps) => {
  const getParams = await params
  const { country, location, category, business } = getParams

  let decodedLocation = decodeURIComponent(location || '')

  if (!decodedLocation) {
    return <NotFoundPage />
  }

  // Check if it's a state (meaning category is city and business is area)
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some((s: any) => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return <ExploreAreaPage params={Promise.resolve({ country, state: decodedLocation, city: category, area: business })} />
  }

  // Business pages have been moved to /[country]/[location]/[business]
  return <NotFoundPage />
}

export default BusinessOrAreaPage
