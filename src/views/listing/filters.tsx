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
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  filters: BusinessFilters
  cityValue: string
  setFilters: Dispatch<SetStateAction<BusinessFilters>>
}

const ListingFilters = ({ filters, setFilters, cityValue }: Props) => {
  const [searchText, setSearchText] = useState('')
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

  const allCategories = useMemo(() => categories?.data?.map(category => category?.category) || [], [categories])

  // ** Search Delayed Query
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce(refetch, 500), [searchText])

  const searchLocation = useCallback(async (inputValue?: string): Promise<PlacesApiItem[]> => {
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
      console.log('error :', error)

      return []
    }
  }, [])

  const searchCategory = async (inputValue?: string): Promise<string[]> => {
    if (!inputValue) return allCategories
    await sleep(100)

    const filteredCategories = categories?.data.filter(category =>
      category?.category?.toLowerCase().includes(inputValue?.toLowerCase())
    )

    return filteredCategories?.map(category => category?.category) || []
  }

  // && Category Change
  const handleCategoryChange = (e: string) => {
    const splitPaths = pathname?.split('/')
    if (!!e) {
      const pushURL = toUrlName(`/${splitPaths?.at(1)}/${e}`)
      router.push(pushURL)
    } else {
      const pushURL = toUrlName(`/${splitPaths?.at(1)}`)
      router.push(pushURL)
    }
  }

  // ** City Change
  const handleCityChange = (e: string) => {
    const splitPaths = pathname?.split('/')

    if (!!e) {
      const category = splitPaths?.at(2)
      if (!!category) {
        const pushURL = toUrlName(`/${e}/${splitPaths?.at(2)}`)
        router.push(pushURL)
      } else {
        const pushURL = toUrlName(`/${e}`)
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
      <h2 className='after:bg-secondary relative w-max text-2xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-8 after:origin-bottom-right after:scale-x-100'>
        Filters
      </h2>
      <div className='flex flex-col gap-y-4'>
        {/* Search */}
        <Input
          value={searchText}
          className='bg-white'
          onChange={e => setSearchText(e.target.value)}
          placeholder='What are you looking for?'
        />

        {/* Location */}
        <AsyncSelect<PlacesApiItem>
          fetcher={searchLocation}
          renderOption={user => (
            <div className='flex items-center gap-2'>
              <div className='flex flex-col'>
                <div className='font-medium'>{user?.placePrediction?.text?.text}</div>
              </div>
            </div>
          )}
          getOptionValue={user => user?.placePrediction?.structuredFormat?.mainText?.text}
          getDisplayValue={user => (
            <div className='flex items-center gap-2 text-left'>
              <div className='flex flex-col leading-tight'>
                <div className='font-medium'>{user?.placePrediction?.text?.text}</div>
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
