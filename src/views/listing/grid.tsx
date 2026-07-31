'use client'

import { useState } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'

import { fetchBusinessList } from '@/services/apis'
import { useQuery } from '@tanstack/react-query'
import ListingFilters from './filters'
import VenueCard from './item'
import { PaginationComponent } from './pagination'
import { useSearchParams } from 'next/navigation'

import { MapPin } from 'lucide-react'
import { PublicLocalityItem } from '@/services/apis/types'
import { useRouter } from 'next/navigation'

export const BUSINESS_ITEMS_PER_PAGE = 8

export interface BusinessFilters {
  search: string
  pageIndex: number
  category: string
  area: string
  sort?: string
}

const ListingGrid = ({ city, selectedArea, category, areas, country }: { city: string; selectedArea: string; category?: string; areas?: PublicLocalityItem[]; country?: string }) => {
  const search = useSearchParams()
  const router = useRouter()
  const text = search.get('text')

  const [filters, setFilters] = useState<BusinessFilters>({
    search: text || '',
    category: category || '',
    pageIndex: 1,
    area: selectedArea,
    sort: 'default'
  })

  const { data: apiData, isLoading } = useQuery({
    queryKey: ['businesses', filters, city, selectedArea],
    queryFn: () => fetchBusinessList({ filters, city }),
    enabled: !!city
  })

  const activeAreas = areas?.filter(a => a.business_count > 0) || []

  const handleAreaSelect = (areaSlug: string) => {
    if (areaSlug !== selectedArea) {
      const locationSlug = `/${country}/${areaSlug}-${city}`
      const pushURL = locationSlug + (category ? `/${category}` : '')
      router.push(pushURL)
    } else {
      const pushURL = `/${country}/${city}` + (category ? `/${category}` : '')
      router.push(pushURL)
    }
  }

  return (
    <ScreenWrapper className='relative py-10'>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (Areas Filter & Global Filters) */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          {!!activeAreas.length && (!apiData || apiData.data?.businesses?.length > 0 || !!selectedArea || !!filters.search) && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Filter by Area
              </h3>
              
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {activeAreas.map((a) => (
                  <button
                    key={a.area_slug}
                    onClick={() => handleAreaSelect(a.area_slug)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors text-left ${a.area_slug === selectedArea ? 'bg-blue-100 text-blue-800' : 'hover:bg-blue-50 hover:text-blue-700'}`}
                  >
                    <span className="font-medium truncate">{a.area_name}</span>
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${a.area_slug === selectedArea ? 'bg-blue-200 text-blue-900' : 'bg-gray-100 text-gray-600'}`}>
                      {a.business_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <ListingFilters filters={filters} setFilters={setFilters} cityValue={city} />
          </div>
        </div>

        {/* Main Content */}
        <div className='w-full lg:w-3/4'>
          {isLoading ? (
            <div className='flex h-full max-h-[50vh] min-h-[30vh] items-center justify-center p-6'>
              <div className='spinner relative size-12'>
                <div className='spinner1 absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2'></div>
              </div>
            </div>
          ) : !apiData?.data?.businesses?.length || apiData?.data?.businesses?.length === 0 ? (
            <div className='flex h-full max-h-[50vh] min-h-[30vh] w-full items-center justify-center rounded-lg border border-gray-300 p-6 text-lg font-semibold uppercase'>
              No businesses found
            </div>
          ) : (
            <>
              {/* Top Bar (Sort) */}
              <div className="mb-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                <Select value={filters.sort || 'default'} onValueChange={(val) => setFilters({ ...filters, sort: val, pageIndex: 1 })}>
                  <SelectTrigger className='w-full sm:w-[200px] rounded-full border-gray-300 bg-white'>
                    <SelectValue placeholder='Select order' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='default'>Default Order</SelectItem>
                      <SelectItem value='highest_rated'>Highest Rated</SelectItem>
                      <SelectItem value='most_reviewed'>Most Reviewed</SelectItem>
                      <SelectItem value='newest'>Newest First</SelectItem>
                      <SelectItem value='oldest'>Oldest First</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                {apiData?.data?.businesses?.map((business, index) => (
                  <VenueCard business={business} key={index} selectedArea={selectedArea} citySlug={city} />
                ))}
              </div>
              {apiData?.data?.pagination?.total > BUSINESS_ITEMS_PER_PAGE && (
                <div className='mt-10'>
                  <PaginationComponent
                    value={filters?.pageIndex}
                    onChange={value => setFilters({ ...filters, pageIndex: value })}
                    total={apiData?.data?.pagination?.total || 0}
                    pageSize={BUSINESS_ITEMS_PER_PAGE}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default ListingGrid
