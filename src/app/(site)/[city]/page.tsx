import { capitalizeFirstLetterOfEachWord } from '@/utils'

import NotFoundPage from '@/app/not-found'
import BannerComponent from '@/components/layout/banner'
import { endpoint } from '@/services/apis/endpoint'
import CityComponent from '@/views/city'
import axios from 'axios'
import { Metadata } from 'next'
import { capitalize } from 'lodash'
import { constructMetadata } from '@/lib/utils'

const SEPARATOR_VALUE = '-in-'

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string; category: string }>
}): Promise<Metadata> {
  // ** read route params
  const { city } = await params

  let decodedCity = capitalize(decodeURIComponent(city || ''))

  return constructMetadata({
    title: `Businesses In ${decodedCity}`,
    description: `Find businesses in ${decodedCity}. Explore various categories and discover local services.`,
    keywords: `business, location, ${decodedCity}, businesses in ${decodedCity}`
  })
}

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const getParams = await params

  if (getParams?.city === 'not-found') return <NotFoundPage />

  let decodedCity = decodeURIComponent(getParams?.city || '')

  if (!decodedCity) {
    return <NotFoundPage />
  }

  let selectedArea: string | null = null
  let bannerPaths = [{ path: `/${decodedCity}`, title: decodedCity }]

  if (decodedCity?.includes(SEPARATOR_VALUE)) {
    const separatorLength = SEPARATOR_VALUE?.length

    const findSeparation = decodedCity?.indexOf(SEPARATOR_VALUE)
    const areaName = decodedCity?.slice(0, findSeparation)
    const cityName = decodedCity?.slice(findSeparation + separatorLength)

    selectedArea = areaName
    decodedCity = cityName

    bannerPaths = [
      { path: `/${decodedCity}`, title: decodedCity },
      { path: `/${selectedArea}-in-${decodedCity}`, title: selectedArea }
    ]
  }

  const listOfAreas = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.areaList.uri + `?city=${decodedCity}`)

  const allAreas: string[] = listOfAreas?.data?.data || []

  const uniqueAreas = [...new Set(allAreas?.map(v => capitalizeFirstLetterOfEachWord(v?.toLowerCase())))]

  return (
    <>
      <BannerComponent
        data={bannerPaths}
        title={`${capitalizeFirstLetterOfEachWord(selectedArea ? selectedArea?.replaceAll('-', ' ') : decodedCity?.replaceAll('-', ' '))}`}
      />
      <CityComponent city={decodedCity} areas={uniqueAreas} selectedArea={selectedArea} />
    </>
  )
}

export default CityPage
