'use client'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { BusinessFilters } from './grid'

import { AsyncSelect } from '@/components/ui/async-select'
import { fetchCategoryList } from '@/services/apis'
import { PlacesApiItem, PlacesApiResponse } from '@/types/google-places'
import { capitalizeFirstLetterOfEachWord, sleep, toUrlName } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  filters: BusinessFilters
  cityValue: string
  setFilters: Dispatch<SetStateAction<BusinessFilters>>
}

const ListingFilters = ({ filters, setFilters, cityValue }: Props) => {
  const search = useSearchParams()

  const text = search.get('text')

  const [searchText, setSearchText] = useState(text || '')
  const pathname = usePathname()
  const router = useRouter()

  const refetch = () => {
    setFilters((prev: BusinessFilters) => ({
      ...prev,
      search: searchText
    }))
  }

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoryList()
  })

  const allCategories = useMemo(() => categories?.data?.map(category => category?.main_category_name) || [], [categories])

  // ** Search Delayed Query
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce(refetch, 500), [searchText])

  const searchLocation = useCallback(async (inputValue?: string): Promise<any[]> => {
    try {
      if (!inputValue) return []

      if (!!inputValue) {
        const res = await fetch('/api/search/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: inputValue })
        })

        const data: PlacesApiResponse = await res.json()

        return data?.data || []
      } else {
        return []
      }
    } catch (error) {
      console.error('error :', error)

      return []
    }
  }, [])

  const searchCategory = async (inputValue?: string): Promise<string[]> => {
    if (!inputValue) return allCategories
    await sleep(100)

    const filteredCategories = categories?.data.filter(category =>
      category?.main_category_name?.toLowerCase().includes(inputValue?.toLowerCase())
    )

    return filteredCategories?.map(category => category?.main_category_name) || []
  }

  // && Category Change
  const handleCategoryChange = (e: string) => {
    const splitPaths = pathname?.split('/')
    const country = splitPaths?.at(1) || 'in'
    const location = splitPaths?.at(2)

    if (!!e) {
      const pushURL = toUrlName(`/${country}/${location}/${e}`)
      router.push(pushURL)
    } else {
      const pushURL = toUrlName(`/${country}/${location}`)
      router.push(pushURL)
    }
  }

  // ** City Change
  const handleCityChange = (e: string) => {
    const splitPaths = pathname?.split('/')
    const country = splitPaths?.at(1) || 'in'

    if (!!e) {
      const category = splitPaths?.at(3)
      if (!!category) {
        const pushURL = toUrlName(`/${country}/${e}/${category}`)
        router.push(pushURL)
      } else {
        const pushURL = toUrlName(`/${country}/${e}`)
        router.push(pushURL)
      }
    }
  }

  useEffect(() => {
    delayedQuery()

    return delayedQuery.cancel
  }, [searchText, delayedQuery])

  return (
    <div className='sticky top-24 space-y-8 rounded-sm bg-gray-100 p-6'>
      <h4 className='after:bg-secondary relative w-max text-2xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-8 after:origin-bottom-right after:scale-x-100'>
        Filters
      </h4>
      <div className='flex flex-col gap-y-4'>

        {/* Location */}
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
          placeholder={cityValue ? capitalizeFirstLetterOfEachWord(cityValue) : 'Location..'}
          value={cityValue || ''}
          onChange={handleCityChange}
          width={'100%'}
        />

        {/* Category */}
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
            value={toUrlName(filters.category) || ''}
            onChange={handleCategoryChange}
            width={'100%'}
          />
        )}
      </div>
    </div>
  )
}

export default ListingFilters
