import { fetchBrowseAreas } from '@/services/apis'
import ExploreBreadcrumb from '@/views/explore/explore-breadcrumb'
import ExploreBusinesses from '@/views/explore/explore-businesses'
import NotFoundPage from '@/app/not-found'
import { Metadata } from 'next'
import { capitalize } from 'lodash'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; state: string; city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const displayCity = capitalize(city)
  
  return {
    title: `Businesses in ${displayCity} | Seaneb Explore`,
    description: `Browse all businesses and areas in ${displayCity} on Seaneb.`
  }
}

export default async function ExploreCityPage({ params }: { params: Promise<{ country: string; state: string; city: string }> }) {
  const { country, state, city } = await params
  
  // We can fetch initial data server-side just for breadcrumbs and title
  const res = await fetchBrowseAreas(country, state, city)
  
  if (!res || !res.success || !res.data) {
    return <NotFoundPage />
  }

  const { breadcrumb, city: cityData } = res.data

  return (
    <div className="bg-[#fafafb] min-h-screen">
      <ExploreBreadcrumb breadcrumb={breadcrumb} title={`Explore ${cityData.city_name}`} />
      
      {/* Client component for businesses and areas sidebar */}
      <ExploreBusinesses 
        country={country} 
        state={state} 
        city={city} 
        initialData={res.data}
      />
    </div>
  )
}
