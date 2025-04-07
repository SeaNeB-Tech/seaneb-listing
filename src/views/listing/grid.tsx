'use client'

import { useState } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'

import { fetchBusinessList } from '@/services/apis'
import { useQuery } from '@tanstack/react-query'
import ListingFilters from './filters'
import VenueCard from './item'
import { PaginationComponent } from './pagination'

export const BUSINESS_ITEMS_PER_PAGE = 8

export interface BusinessFilters {
  search: string
  pageIndex: number
  category: string
  area: string
}

const ListingGrid = ({ city, selectedArea }: { city: string; selectedArea: string }) => {
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    category: '',
    pageIndex: 1,
    area: selectedArea
  })

  const { data: apiData, isLoading } = useQuery({
    queryKey: ['businesses', filters, city],
    queryFn: () => fetchBusinessList({ filters, city }),
    enabled: !!city && !!filters?.area,
    staleTime: 30
  })

  return (
    <ScreenWrapper className='relative grid grid-cols-1 gap-8 py-10 xl:grid-cols-12'>
      {/* Businesses */}
      <div className='full transition-all duration-300 ease-in-out xl:col-span-9'>
        {isLoading ? (
          <div className='flex h-full max-h-[50vh] items-center justify-center p-6'>
            <div className='spinner relative size-12'>
              <div className='spinner1 absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2'></div>
            </div>
          </div>
        ) : !apiData?.data || apiData?.data?.length === 0 ? (
          <div className='flex h-full max-h-[50vh] w-full items-center justify-center rounded-lg border border-gray-300 p-6 text-lg font-semibold uppercase'>
            No businesses found in {city} - {selectedArea}
          </div>
        ) : (
          <>
            <div className='flex items-center justify-end'>
              <Select defaultValue='default'>
                <SelectTrigger className='w-[180px]' value={'default'}>
                  <SelectValue placeholder='Select order' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='default'>Default Order</SelectItem>
                    <SelectItem value='high-rated'>Highest Rated</SelectItem>
                    <SelectItem value='most-reviewed'>Most Reviewed</SelectItem>
                    <SelectItem value='newest'>Newest First</SelectItem>
                    <SelectItem value='oldest'>Oldest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2'>
              {apiData?.data?.map((business, index) => (
                <VenueCard
                  key={index}
                  selectedArea={selectedArea}
                  id={business.u_id}
                  title={business.business_name}
                  legalName={business.business_legal_name}
                  location={business.city}
                  rating={business.avg_rating}
                  price='Starting from $59 per night'
                  imageUrl='/images/pages/home/banner-image-1.jpg'
                />
              ))}
            </div>
            <div className='mt-10'>
              <PaginationComponent
                value={filters?.pageIndex}
                onChange={value => setFilters({ ...filters, pageIndex: value })}
                total={apiData?.payload?.pagination?.total || 0}
                pageSize={BUSINESS_ITEMS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>
      {/* Filters */}
      <div className='relative xl:col-span-3'>
        <ListingFilters filters={filters} setFilters={setFilters} />
      </div>
    </ScreenWrapper>
  )
}

export default ListingGrid
