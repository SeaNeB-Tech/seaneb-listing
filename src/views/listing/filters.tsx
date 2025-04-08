'use client'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { BusinessFilters } from './grid'

import { AsyncSelect } from '@/components/ui/async-select'
import { fetchCategoryList } from '@/services/apis'
import { sleep } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'

interface Props {
  filters: BusinessFilters
  setFilters: Dispatch<SetStateAction<BusinessFilters>>
}

const ListingFilters = ({ filters, setFilters }: Props) => {
  const [searchText, setSearchText] = useState('')

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

  const searchCategory = async (inputValue?: string): Promise<string[]> => {
    if (!inputValue) return allCategories
    await sleep(100)

    const filteredCategories = categories?.data.filter(category =>
      category?.category?.toLowerCase().includes(inputValue?.toLowerCase())
    )

    return filteredCategories?.map(category => category?.category) || []
  }

  useEffect(() => {
    delayedQuery()

    return delayedQuery.cancel
  }, [searchText, delayedQuery])

  return (
    <div className='sticky top-24 space-y-8'>
      <h2 className='after:bg-secondary relative w-max text-2xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-12 after:origin-bottom-right after:scale-x-100'>
        Filters
      </h2>
      <div className='flex flex-col gap-y-4'>
        {/* Search */}
        <Input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder='What are you looking for?'
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
            getOptionValue={user => user}
            getDisplayValue={user => (
              <div className='flex items-center gap-2 text-left'>
                <div className='flex flex-col leading-tight'>
                  <div className='font-medium'>{user}</div>
                </div>
              </div>
            )}
            notFound={<div className='py-6 text-center text-sm'>No such category exists</div>}
            label='Category'
            placeholder='Pick a category..'
            value={filters.category || ''}
            onChange={e => setFilters((prev: BusinessFilters) => ({ ...prev, category: e }))}
            width={'100%'}
          />
        )}
      </div>
    </div>
  )
}

export default ListingFilters
