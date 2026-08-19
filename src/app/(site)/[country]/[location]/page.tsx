import { fetchPublicLocalities, fetchBrowseStates } from '@/services/apis'
import { PublicLocalityItem } from '@/services/apis/types'
import { capitalizeFirstLetterOfEachWord } from '@/utils'

import NotFoundPage from '@/app/not-found'
import BannerComponent from '@/components/layout/banner'
import CityComponent from '@/views/city'
import MajorCities from '@/views/home/major-cities'
import { Metadata } from 'next'
import { capitalize } from 'lodash'
import { constructMetadata, parseLocationSlug } from '@/lib/utils'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; location: string; category?: string }>
}): Promise<Metadata> {
  // ** read route params
  const { country, location } = await params

  let decodedLocation = decodeURIComponent(location || '')
  const { city: decodedCity, area: selectedArea } = parseLocationSlug(decodedLocation)

  let displayLocation = selectedArea
    ? `${selectedArea.split('-').map(word => capitalize(word)).join(' ')}, ${decodedCity.split('-').map(w => capitalize(w)).join(' ')}`
    : decodedCity.split('-').map(w => capitalize(w)).join(' ')

  // Check if the location is actually a state
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some(s => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return constructMetadata({
      title: `Explore ${displayLocation}`,
      description: `Explore cities and local businesses in ${displayLocation}. Discover local services easily.`,
      keywords: `explore, ${displayLocation}, cities in ${displayLocation}, businesses in ${displayLocation}`
    })
  }

  return constructMetadata({
    title: `Businesses In ${displayLocation}`,
    description: `Find businesses in ${displayLocation}. Explore various categories and discover local services.`,
    keywords: `business, location, ${displayLocation}, businesses in ${displayLocation}`
  })
}

const CityOrStatePage = async ({ params }: { params: Promise<{ country: string; location: string }> }) => {
  const { country, location } = await params

  if (location === 'not-found') return <NotFoundPage />

  let decodedLocation = decodeURIComponent(location || '')

  if (!decodedLocation) {
    return <NotFoundPage />
  }

  // Check if it's a state
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some(s => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return (
      <div className="pt-20">
        <MajorCities initialCountrySlug={country} initialStateSlug={decodedLocation} />
      </div>
    )
  }

  const { city: decodedCity, area: selectedArea } = parseLocationSlug(decodedLocation)

  // The UI will display the formatted location string.
  let displayLocation = selectedArea
    ? `${selectedArea.split('-').map(word => capitalize(word)).join(' ')}, ${decodedCity.split('-').map(w => capitalize(w)).join(' ')}`
    : decodedCity.split('-').map(w => capitalize(w)).join(' ')

  let bannerPaths = [
    { path: `/${country}/${decodedLocation}`, title: displayLocation }
  ]

  const { data: listOfAreas } = await fetchPublicLocalities(decodedCity)

  const allAreas: PublicLocalityItem[] = listOfAreas || []

  // Ensure unique areas based on area_slug or name if needed, but assuming API returns unique
  const uniqueAreas = allAreas

  return (
    <>
      <BannerComponent
        data={bannerPaths}
        title={`${capitalizeFirstLetterOfEachWord(displayLocation)}`}
      />
      <CityComponent country={country} city={decodedCity} areas={uniqueAreas} selectedArea={selectedArea as string | null} />
    </>
  )
}

export default CityOrStatePage
