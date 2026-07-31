import { fetchPublicLocalities, fetchBrowseStates, fetchCategoryList } from '@/services/apis'
import { PublicLocalityItem } from '@/services/apis/types'
import { capitalizeFirstLetterOfEachWord, toUrlName } from '@/utils'

import NotFoundPage from '@/app/not-found'
import BannerComponent from '@/components/layout/banner'
import CityComponent from '@/views/city'
import { constructMetadata, parseLocationSlug } from '@/lib/utils'
import { Metadata } from 'next'
import { capitalize } from 'lodash'
import ExploreCityPage, { generateMetadata as generateExploreCityMetadata } from '@/app/explore/[country]/[state]/[city]/page'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; location: string; category: string }>
}): Promise<Metadata> {
  const { country, location, category } = await params

  let decodedLocation = decodeURIComponent(location || '')
  let decodedSlug = decodeURIComponent(category || '')
  
  // Check if it's a state (meaning this route is actually /[country]/[state]/[city])
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some(s => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return generateExploreCityMetadata({ params: Promise.resolve({ country, state: decodedLocation, city: category }) })
  }

  // Normalize slug for comparison (e.g. "home tiffin" -> "home-tiffin")
  const normalizedSlug = toUrlName(decodeURIComponent(decodedSlug))

  // Check if it's a category
  const categoriesRes = await fetchCategoryList()
  const isCategory = categoriesRes?.data?.some(c => toUrlName(c.main_category_name) === normalizedSlug)

  if (isCategory) {
    let displayLocation = decodedLocation
      .split('-')
      .map(word => capitalize(word))
      .join(', ')

    const decodedCategory = capitalize(decodedSlug)

    return constructMetadata({
      title: `Businesses In ${displayLocation}`,
      description: `Find businesses in ${displayLocation} based of ${decodedCategory}. Explore various categories and discover local services.`,
      keywords: `business, location, ${displayLocation}, businesses in ${displayLocation}, ${decodedCategory}`
    })
  }

  return constructMetadata({ title: 'Not Found' })
}

const CategoryOrCityPage = async ({ params }: { params: Promise<{ country: string; location: string; category: string }> }) => {
  const { country, location, category: slug } = await params

  if (location === 'not-found') return <NotFoundPage />

  let decodedLocation = decodeURIComponent(location || '')
  let decodedSlug = decodeURIComponent(slug || '')

  if (!decodedLocation) {
    return <NotFoundPage />
  }

  // Check if it's a state (so slug is actually the city)
  const statesRes = await fetchBrowseStates(country)
  const isState = statesRes?.success && statesRes.data?.items?.some(s => s.state_slug.toLowerCase() === decodedLocation.toLowerCase())

  if (isState) {
    return <ExploreCityPage params={Promise.resolve({ country, state: decodedLocation, city: decodedSlug })} />
  }

  const { city: decodedCity, area: selectedArea } = parseLocationSlug(decodedLocation)

  // Normalize slug for comparison (e.g. "home tiffin" -> "home-tiffin")
  const normalizedSlug = toUrlName(decodeURIComponent(decodedSlug))

  // Check if it's a Category
  const categoriesRes = await fetchCategoryList()
  const matchedCategory = categoriesRes?.data?.find(c => toUrlName(c.main_category_name) === normalizedSlug)
  const isCategory = !!matchedCategory

  if (isCategory) {
    let displayLocation = decodedLocation
      .split('-')
      .map(word => capitalize(word))
      .join(', ')

    let bannerPaths = [
      { path: `/${country}/${decodedLocation}`, title: displayLocation }
    ]

    const { data: listOfAreas } = await fetchPublicLocalities(decodedCity)
    const allAreas: PublicLocalityItem[] = listOfAreas || []

    return (
      <>
        <BannerComponent
          data={bannerPaths}
          title={`${capitalizeFirstLetterOfEachWord(displayLocation)}`}
        />
        <CityComponent country={country} city={decodedCity} areas={allAreas} category={matchedCategory.main_category_name} selectedArea={selectedArea as string | null} />
      </>
    )
  }

  // Business pages have moved to root level (/{seaneb_id})
  return <NotFoundPage />
}

export default CategoryOrCityPage
