import { fetchBrowseBusinesses } from '@/services/apis'
import ExploreBreadcrumb from '@/views/explore/explore-breadcrumb'
import ExploreBusinesses from '@/views/explore/explore-businesses'
import NotFoundPage from '@/app/not-found'
import { Metadata } from 'next'
import { capitalize } from 'lodash'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; state: string; city: string; area: string }>
}): Promise<Metadata> {
  const { area, city } = await params
  const displayArea = capitalize(area.replace(/-/g, ' '))
  const displayCity = capitalize(city)
  
  return {
    title: `Businesses in ${displayArea}, ${displayCity} | Seaneb Explore`,
    description: `Browse all businesses in ${displayArea}, ${displayCity} on Seaneb.`
  }
}

export default async function ExploreAreaPage({ params }: { params: Promise<{ country: string; state: string; city: string; area: string }> }) {
  const { country, state, city, area } = await params
  
  // Fetch initial data server-side just for breadcrumbs and title
  const res = await fetchBrowseBusinesses(country, state, city, area)
  
  if (!res || !res.success || !res.data) {
    return <NotFoundPage />
  }

  const { breadcrumb, area: areaData, city: cityData } = res.data

  return (
    <div className="bg-[#fafafb] min-h-screen">
      <ExploreBreadcrumb breadcrumb={breadcrumb} title={`${areaData.area_name}, ${cityData.city_name}`} />
      
      {/* Client component for businesses */}
      <ExploreBusinesses 
        country={country} 
        state={state} 
        city={city} 
        area={area}
        initialData={res.data}
      />
    </div>
  )
}
