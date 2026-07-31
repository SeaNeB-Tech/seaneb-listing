import { fetchBrowseCities } from '@/services/apis'
import ExploreBreadcrumb from '@/views/explore/explore-breadcrumb'
import LocationCard from '@/views/explore/location-card'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import NotFoundPage from '@/app/not-found'
import { Metadata } from 'next'
import { capitalize } from 'lodash'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const displayState = capitalize(state)
  
  return {
    title: `Explore Cities in ${displayState} | Seaneb`,
    description: `Browse all cities and areas in ${displayState} on Seaneb.`
  }
}

export default async function ExploreStatePage({ params }: { params: Promise<{ country: string; state: string }> }) {
  const { country, state } = await params
  
  const res = await fetchBrowseCities(country, state)
  
  if (!res || !res.success || !res.data) {
    return <NotFoundPage />
  }

  const { breadcrumb, items, state: stateData } = res.data

  return (
    <div className="bg-[#fafafb] min-h-screen pb-20">
      <ExploreBreadcrumb breadcrumb={breadcrumb} title={`Explore ${stateData.state_name}`} />
      
      <ScreenWrapper className="pt-10">
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {items.map((city) => (
            <LocationCard
              key={city.slug}
              level="city"
              name={city.city_name}
              slug={city.slug}
              businessCount={city.business_count}
              code={city.city_slug}
            />
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="flex justify-center items-center h-[30vh]">
            <p className="text-gray-500 text-lg">No cities found for this state.</p>
          </div>
        )}
      </ScreenWrapper>
    </div>
  )
}
