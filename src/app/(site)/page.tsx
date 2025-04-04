import HeroSection from '@/views/home/hero-section'
import MajorCities from '@/views/home/major-cities'
import PopularCategories from '@/views/home/popular-category'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularCategories />
      <MajorCities />
    </>
  )
}
