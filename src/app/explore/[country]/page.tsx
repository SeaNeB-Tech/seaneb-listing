import { fetchBrowseStates } from '@/services/apis'
import ExploreBreadcrumb from '@/views/explore/explore-breadcrumb'
import LocationCard from '@/views/explore/location-card'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import NotFoundPage from '@/app/not-found'
import { Metadata } from 'next'
import { capitalize } from 'lodash'

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const displayCountry = capitalize(country)
  
  return {
    title: `Explore States in ${displayCountry} | Seaneb`,
    description: `Browse all states and locations in ${displayCountry} on Seaneb.`
  }
}

export default async function ExploreCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params
  
  const res = await fetchBrowseStates(country)
  
  if (!res || !res.success || !res.data) {
    return <NotFoundPage />
  }

  const { breadcrumb, items, country: countryData } = res.data

  return (
    <div className="bg-[#fafafb] min-h-screen pb-20">
      <ExploreBreadcrumb breadcrumb={breadcrumb} title={`Explore ${countryData.country_name}`} />
      
      <ScreenWrapper className="pt-10">
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {items.map((state) => (
            <LocationCard
              key={state.slug}
              level="state"
              name={state.state_name}
              slug={state.slug}
              businessCount={state.business_count}
              code={state.state_slug}
            />
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="flex justify-center items-center h-[30vh]">
            <p className="text-gray-500 text-lg">No states found for this country.</p>
          </div>
        )}
      </ScreenWrapper>
    </div>
  )
}
