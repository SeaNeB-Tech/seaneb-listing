import { endpoint } from '@/services/apis/endpoint'
import HeroSection from '@/views/home/hero-section'
import MajorCities from '@/views/home/major-cities'
import PopularCategories from '@/views/home/popular-category'
import axios from 'axios'
import { LocalBusiness, WithContext } from 'schema-dts'

const jsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SeaNeb',
  description:
    'SeaNeb connects you with local restaurants, stores, shops, and agencies. Browse all categories and grow your business network.',
  url: process.env.NEXT_PUBLIC_SITEMAP_URL,
  areaServed: 'Worldwide'
}

export default async function Home() {
  const listCategories = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.popCategory.uri)
  const listCities = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.majorCities.uri)

  return (
    <>
      <HeroSection />
      <MajorCities listCities={listCities?.data?.data?.data || []} />
      <PopularCategories listCategories={listCategories?.data?.data?.data || []} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
