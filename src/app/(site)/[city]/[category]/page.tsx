import { capitalizeFirstLetterOfEachWord } from '@/utils'

import NotFoundPage from '@/app/not-found'
import BannerComponent from '@/components/layout/banner'
import { endpoint } from '@/services/apis/endpoint'
import CityComponent from '@/views/city'
import axios from 'axios'

const CategoryPage = async ({ params }: { params: Promise<{ city: string; category: string }> }) => {
  const getParams = await params

  if (getParams?.city === 'not-found') return <NotFoundPage />

  const decodedCity = decodeURIComponent(getParams?.city || '')
  const decodedCategory = decodeURIComponent(getParams?.category || '')

  if (!decodedCity || !decodedCategory) {
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
      <CityComponent city={decodedCity} areas={allAreas} category={decodedCategory} />
    </>
  )
}

export default CategoryPage
