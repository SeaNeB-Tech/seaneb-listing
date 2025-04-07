import { endpoint } from '@/services/apis/endpoint'
import HeroSection from '@/views/home/hero-section'
import MajorCities from '@/views/home/major-cities'
import PopularCategories from '@/views/home/popular-category'
import axios from 'axios'

export default async function Home() {
  const listCategories = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.categoryList.uri)
  const listCities = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.majorCities.uri)

  return (
    <>
      <HeroSection listCategories={listCategories?.data?.data?.data || []} />
      <PopularCategories listCategories={listCategories?.data?.data?.data || []} />
      <MajorCities listCities={listCities?.data?.data?.data || []} />
    </>
  )
}
