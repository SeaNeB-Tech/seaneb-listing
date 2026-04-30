import { endpoint } from '@/services/apis/endpoint'
import HeroSection from '@/views/home/hero-section'
import MajorCities from '@/views/home/major-cities'
import axios from 'axios'
import { LocalBusiness, WithContext } from 'schema-dts'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
}

const jsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Seaneb',
  description:
    'Seaneb connects you with local restaurants, stores, shops, and agencies. Browse all categories and grow your business network.',
  url: process.env.NEXT_PUBLIC_SITEMAP_URL,
  areaServed: 'Worldwide'
}

const fetchHomePageData = async () => {
  const listCategories = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + endpoint.popCategory.uri

      return await axios.get(apiUrl)
    } catch {
      return null
    }
  }

  const listCities = async () => {
    try {
      return await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint.majorCities.uri)
    } catch {
      return null
    }
  }

  return await Promise.all([listCategories(), listCities()])
}

export default async function Home() {
  const [, listCities] = await fetchHomePageData()

  return (
    <>
      <HeroSection />
      <MajorCities listCities={listCities?.data?.data?.data || []} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
