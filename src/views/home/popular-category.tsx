import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { categoryListArray, CategoryListItem } from '@/data/categories'
import React from 'react'

const CategoryItem = ({ category }: { category: CategoryListItem }) => {
  return (
    <div className='bg-primary flex items-center justify-center rounded-lg p-2 text-white shadow-lg shadow-black/30 md:p-3'>
      <p className='text-center text-sm font-medium tracking-wide md:text-lg'>{category?.title}</p>
    </div>
  )
}

const PopularCategories = () => {
  return (
    <ScreenWrapper className='space-y-6 py-10 lg:py-20'>
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular Categories
        </h2>
        <p>List of most frequently searched categories</p>
      </div>

      <div className='grid w-full grid-cols-4 gap-2 sm:grid-cols-5'>
        {categoryListArray?.map(cc => <CategoryItem key={cc?.u_id} category={cc} />)}
      </div>
    </ScreenWrapper>
  )
}

export default PopularCategories
