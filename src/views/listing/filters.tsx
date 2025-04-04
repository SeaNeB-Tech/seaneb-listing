import { Input } from '@/components/ui/input'
import { categoryListArray } from '@/data/categories'
import { cn } from '@/lib/utils'
import { BusinessFilters } from './grid'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  filters: BusinessFilters
  setFilters: Dispatch<SetStateAction<BusinessFilters>>
}

const ListingFilters = ({ filters, setFilters }: Props) => {
  return (
    <div className='space-y-8'>
      <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-12 after:origin-bottom-right after:scale-x-100'>
        Filters
      </h2>
      <div className='flex flex-col gap-y-4'>
        {/* Search */}
        <Input className='w-full xl:h-12 xl:!px-6 xl:text-lg' placeholder='What are you looking for?' />

        {/* Category */}
        <p>Pick a category :</p>
        <div className='flex flex-wrap items-center gap-2'>
          {categoryListArray?.map(category => (
            <div
              className={cn(
                'bg-background border-primary text-primary flex cursor-pointer items-center justify-center rounded-full border-2 px-2 py-1 md:px-3',
                filters.category === category?.u_id ? 'bg-primary text-background' : 'text-primary'
              )}
              onClick={() =>
                filters.category === category?.u_id
                  ? setFilters((prev: BusinessFilters) => ({
                      ...prev,
                      category: '',
                      search: prev.search,
                      area: prev.area
                    }))
                  : setFilters((prev: BusinessFilters) => ({ ...prev, category: category?.u_id }))
              }
            >
              <p className='text-center text-sm font-medium tracking-wide md:text-sm'>{category?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListingFilters
