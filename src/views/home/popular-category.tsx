'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { color } from '@/constants/colors'
import { useAppContext } from '@/context/app.context'
import { CategoryListItem } from '@/services/apis/types'
import { capitalizeFirstLetterOfEachWord, toUrlName } from '@/utils'
import Link from 'next/link'

const CategoryItem = ({ category }: { category: CategoryListItem }) => {
  const { currentCity } = useAppContext()

  return (
    <Link className='h-full' href={toUrlName(`/${currentCity || 'Anand'}/${category?.main_category}`)}>
      <div
        className='flex h-full items-center justify-center rounded-md p-2 shadow-md transition-transform duration-200 md:p-3'
        style={{
          backgroundImage: `linear-gradient(135deg, ${color.linearGradientValue.join(', ')})`,
          color: '#fff'
        }}
      >
        <p className='text-center text-sm font-semibold tracking-wide md:text-lg'>
          {capitalizeFirstLetterOfEachWord(category?.category)}
        </p>
      </div>
    </Link>
  )
}

const PopularCategories = ({ listCategories }: { listCategories: CategoryListItem[] }) => {
  return (
    <ScreenWrapper className='space-y-6 py-10'>
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular Categories
        </h2>
        <p>List of most frequently searched categories</p>
      </div>

      <div className='flex w-full grid-cols-3 flex-wrap items-stretch gap-2 sm:grid-cols-4 lg:grid lg:grid-cols-5'>
        {listCategories?.map(cc => (
          <CategoryItem key={cc?.main_category} category={cc} />
        ))}
      </div>
    </ScreenWrapper>
  )
}

export default PopularCategories
