'use client'

import { useState } from 'react'

import { businessListArray } from '@/data/businesses'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import VenueCard from './item'
import ListingFilters from './filters'
import { PaginationComponent } from './pagination'

const ITEMS_PER_PAGE = 8

export interface BusinessFilters {
  search: string
  category: string
  area: string
}

const ListingGrid = ({ selectedArea }: { selectedArea: string }) => {
  const [pageIndex, setPageIndex] = useState(1)

  const [filters, setFilters] = useState<BusinessFilters>({ search: '', category: '', area: selectedArea })

  return (
    <ScreenWrapper className='grid grid-cols-1 gap-8 py-10 xl:grid-cols-12'>
      {/* Businesses */}
      <div className='xl:col-span-9'>
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
          {businessListArray
            ?.slice(pageIndex * ITEMS_PER_PAGE - ITEMS_PER_PAGE, pageIndex * ITEMS_PER_PAGE)
            .map((business, index) => (
              <VenueCard
                key={index}
                selectedArea={selectedArea}
                id={business.category?.slug}
                title={business.title}
                location={business.address}
                rating={business.rating}
                price='Starting from $59 per night'
                imageUrl='/images/pages/home/banner-image-1.jpg'
              />
            ))}
        </div>
        <div className='mt-10'>
          <PaginationComponent
            value={pageIndex}
            onChange={setPageIndex}
            total={businessListArray?.length}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
      </div>
      {/* Filters */}
      <div className='xl:col-span-3'>
        <ListingFilters filters={filters} setFilters={setFilters} />
      </div>
    </ScreenWrapper>
  )
}

export default ListingGrid
