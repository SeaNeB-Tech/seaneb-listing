import { capitalizeFirstLetterOfEachWord } from '@/utils'

import NotFoundPage from '@/app/not-found'
import BannerComponent from '@/components/layout/banner'
import { endpoint } from '@/services/apis/endpoint'
import CityComponent from '@/views/city'
import axios from 'axios'

const SEPARATOR_VALUE = '-in-'

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

  const allAreas = listOfAreas?.data?.data || []

  return (
    <>
      <BannerComponent
        data={bannerPaths}
        title={`${capitalizeFirstLetterOfEachWord(selectedArea ? selectedArea?.replaceAll('-', ' ') : decodedCity)}`}
      />
      <CityComponent city={decodedCity} areas={allAreas} selectedArea={selectedArea} />
    </>
  )
}

export default CityPage
