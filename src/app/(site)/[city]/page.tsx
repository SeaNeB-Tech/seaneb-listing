import { capitalizeFirstLetterOfEachWord } from '@/utils'

import BannerComponent from '@/components/layout/banner'
import CityComponent from '@/views/city'
import axios from 'axios'
import { endpoint } from '@/services/apis/endpoint'
import { redirect } from 'next/navigation'
import NotFoundPage from '@/app/not-found'

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const getParams = await params

  if (getParams?.city === 'not-found') return <NotFoundPage />

  const decodedCity = decodeURIComponent(getParams?.city || '')

  if (!decodedCity) {
    return <NotFoundPage />
  }

  const listOfAreas = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.areaList.uri + `?city=${decodedCity}`)

  const allAreas = listOfAreas?.data?.data || []

  return (
    <>
      <BannerComponent
        data={[{ path: `/${decodedCity}`, title: decodedCity }]}
        title={`${capitalizeFirstLetterOfEachWord(decodedCity)}`}
      />
      <CityComponent city={decodedCity} areas={allAreas} />
    </>
  )
}

export default CityPage
