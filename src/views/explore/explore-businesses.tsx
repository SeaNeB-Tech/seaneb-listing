'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Search, MapPin } from 'lucide-react'

import { fetchBrowseAreas, fetchBrowseBusinesses, BrowseQueryParams, BrowseArea, BrowseBusiness, fetchCategoryList } from '@/services/apis'
import VenueCard from '@/views/listing/item'
import { PaginationComponent } from '@/views/listing/pagination'

import { Input } from '@/components/ui/input'
import { AsyncSelect } from '@/components/ui/async-select'
import { PlacesApiResponse } from '@/types/google-places'
import { capitalizeFirstLetterOfEachWord, sleep, toUrlName } from '@/utils'
import { debounce } from 'lodash'

export const EXPLORE_ITEMS_PER_PAGE = 12

interface ExploreBusinessesProps {
  country: string
  state: string
  city: string
  area?: string
  initialData?: any // Can pass initial SSR data if needed
}

const ExploreBusinesses = ({ country, state, city, area }: ExploreBusinessesProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [searchInput, setSearchInput] = useState(search)
  const [sort, setSort] = useState(searchParams.get('sort') || 'default')
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

  // Fetch logic based on whether we are at city level or area level
  const queryParams: BrowseQueryParams = {
    search: search || undefined,
    sort: sort !== 'default' ? sort : undefined,
    page,
    limit: EXPLORE_ITEMS_PER_PAGE
  }

  const { data, isLoading } = useQuery({
    queryKey: ['explore', country, state, city, area, queryParams],
    queryFn: () => {
      if (area) {
        return fetchBrowseBusinesses(country, state, city, area, queryParams)
      } else {
        return fetchBrowseAreas(country, state, city, queryParams)
      }
    },
    enabled: !!city
  })

  const apiData = data?.data

  const handleSearchSubmit = () => {
    // Prevent push on initial mount if nothing changed
    if (searchInput === search && page === 1 && !searchParams.has('page')) return

    setSearch(searchInput)
    setPage(1)
    
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) {
      params.set('search', searchInput)
    } else {
      params.delete('search')
    }
    params.delete('page') // Remove page=1 from URL for cleaner look
    router.push(`${pathname}?${params.toString()}`)
  }

  // ** Search Delayed Query
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = React.useCallback(debounce(handleSearchSubmit, 500), [searchInput])

  React.useEffect(() => {
    delayedQuery()
    return delayedQuery.cancel
  }, [searchInput, delayedQuery])

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoryList()
  })

  const allCategories = React.useMemo(() => categories?.data?.map(c => c?.main_category_name) || [], [categories])

  const searchLocation = React.useCallback(async (inputValue?: string): Promise<any[]> => {
    try {
      if (!inputValue) return []
      const res = await fetch('/api/search/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue })
      })
      const data: PlacesApiResponse = await res.json()
      return data?.data || []
    } catch (error) {
      console.error('error :', error)
      return []
    }
  }, [])

  const searchCategory = async (inputValue?: string): Promise<string[]> => {
    if (!inputValue) return allCategories
    await sleep(100)
    const filteredCategories = categories?.data.filter(c =>
      c?.main_category_name?.toLowerCase().includes(inputValue?.toLowerCase())
    )
    return filteredCategories?.map(c => c?.main_category_name) || []
  }

  const handleCategoryChange = (e: string) => {
    if (!!e) {
      router.push(`/${country}/${city}/${e}`)
    } else {
      router.push(`/${country}/${state}/${city}`)
    }
  }

  const handleCityChange = (e: string) => {
    if (!!e) {
      router.push(`/${country}/${e}`)
    }
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    setPage(1)
    
    const params = new URLSearchParams(searchParams.toString())
    if (value !== 'default') {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    params.delete('page') // Remove page=1 from URL for cleaner look
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    
    const params = new URLSearchParams(searchParams.toString())
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }
    router.push(`${pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const areas: BrowseArea[] = !area && apiData && 'areas' in apiData ? apiData.areas : []
  const businesses: BrowseBusiness[] = apiData?.businesses || []
  const pagination = apiData?.pagination

  return (
    <ScreenWrapper className='relative py-10'>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar (Areas Filter & Global Filters) */}
        {!area && (
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Filter by Area
              </h3>
              
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {areas.length === 0 && !isLoading && (
                   <p className="text-sm text-gray-500 italic">No areas found.</p>
                )}
                {areas.map((a) => (
                  <button
                    key={a.area_slug}
                    onClick={() => router.push(`/${a.slug}`)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-blue-700 text-left"
                  >
                    <span className="font-medium text-gray-700 truncate">{a.area_name}</span>
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                      {a.business_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h4 className='after:bg-secondary relative w-max text-2xl font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-8 after:origin-bottom-right after:scale-x-100 mb-6'>
                Filters
              </h4>
              <div className='flex flex-col gap-y-4'>


                <AsyncSelect<any>
                  fetcher={searchLocation}
                  renderOption={user => (
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col'>
                        <div className='font-medium'>{user?.display_name}</div>
                      </div>
                    </div>
                  )}
                  getOptionValue={user => user?.city_name || user?.display_name}
                  getDisplayValue={user => (
                    <div className='flex items-center gap-2 text-left'>
                      <div className='flex flex-col leading-tight'>
                        <div className='font-medium'>{user?.display_name}</div>
                      </div>
                    </div>
                  )}
                  notFound={<div className='py-6 text-center text-sm'>Try searching for your city name</div>}
                  label='Location'
                  placeholder={capitalizeFirstLetterOfEachWord(city)}
                  value={city || ''}
                  onChange={handleCityChange}
                  width={'100%'}
                />

                {!!categories?.data?.length && (
                  <AsyncSelect<string>
                    fetcher={searchCategory}
                    renderOption={user => (
                      <div className='flex items-center gap-2'>
                        <div className='flex flex-col'>
                          <div className='font-medium'>{user}</div>
                        </div>
                      </div>
                    )}
                    getOptionValue={user => toUrlName(user)}
                    getDisplayValue={user => (
                      <div className='flex items-center gap-2 text-left'>
                        <div className='flex flex-col leading-tight'>
                          <div className='font-medium capitalize'>{user}</div>
                        </div>
                      </div>
                    )}
                    notFound={<div className='py-6 text-center text-sm'>No such category exists</div>}
                    label='Category'
                    placeholder='Pick a category..'
                    value={''}
                    onChange={handleCategoryChange}
                    width={'100%'}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`w-full ${!area ? 'lg:w-3/4' : ''}`}>
          
          {/* Top Bar (Search & Sort) */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-end gap-4">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-[200px] rounded-full border-gray-300 bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="highest_rated">Highest Rated</SelectItem>
                  <SelectItem value="most_reviewed">Most Reviewed</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Businesses Grid */}
          {isLoading ? (
            <div className='flex h-full max-h-[50vh] min-h-[30vh] items-center justify-center p-6'>
              <div className='spinner relative size-12'>
                <div className='spinner1 absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2'></div>
              </div>
            </div>
          ) : businesses.length === 0 ? (
            <div className='flex h-full max-h-[50vh] min-h-[30vh] w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
               <div className="rounded-full bg-gray-100 p-4 mb-4">
                 <Search className="h-8 w-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No businesses found</h3>
               <p className="text-gray-500 text-center max-w-md">
                 We couldn't find any businesses matching your criteria in this area. Try adjusting your filters or search term.
               </p>
               {(search || sort !== 'default') && (
                 <button 
                   onClick={() => {
                     setSearch('')
                     setSearchInput('')
                     setSort('default')
                     setPage(1)
                     router.push(pathname)
                   }}
                   className="mt-6 font-medium text-blue-600 hover:text-blue-700"
                 >
                   Clear all filters
                 </button>
               )}
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                {businesses.map((business) => (
                  <VenueCard 
                    key={business.branch_id} 
                    business={business as any} // mapping to existing VenueCard props 
                    selectedArea={business.area_slug || ''} 
                    citySlug={city} 
                  />
                ))}
              </div>
              
              {pagination && pagination.total > EXPLORE_ITEMS_PER_PAGE && (
                <div className='mt-12 flex justify-center'>
                  <PaginationComponent
                    value={page}
                    onChange={handlePageChange}
                    total={pagination.total}
                    pageSize={EXPLORE_ITEMS_PER_PAGE}
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

export default ExploreBusinesses
