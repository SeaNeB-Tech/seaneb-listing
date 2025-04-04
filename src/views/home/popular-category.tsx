'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { CategoryListItem } from '@/services/apis/types'
import { capitalizeFirstLetterOfEachWord } from '@/utils'

const CategoryItem = ({ category }: { category: CategoryListItem }) => {
  const linearGradientValue = ['rgba(17, 17, 17, 1)', 'rgba(65, 65, 65, 1)', 'rgba(65, 65, 65, 1)']

  return (
    <div
      className='flex items-center justify-center rounded-md p-2 shadow-md transition-transform duration-200 md:p-3'
      style={{
        backgroundImage: `linear-gradient(135deg, ${linearGradientValue.join(', ')})`,
        color: '#fff'
      }}
    >
      <p className='text-center text-sm font-semibold tracking-wide md:text-lg'>
        {capitalizeFirstLetterOfEachWord(category?.category)}
      </p>
    </div>
  )
}

const PopularCategories = ({ listCategories }: { listCategories: CategoryListItem[] }) => {
  return (
    <ScreenWrapper className='space-y-6 py-10 lg:py-20'>
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular Categories
        </h2>
        <p>List of most frequently searched categories</p>
      </div>

      <div className='flex w-full grid-cols-3 flex-wrap gap-2 sm:grid-cols-4 lg:grid lg:grid-cols-5'>
        {listCategories?.map(cc => <CategoryItem key={cc?.u_id} category={cc} />)}
      </div>
    </ScreenWrapper>
  )
}

export default PopularCategories
