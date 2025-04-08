'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Calendar, Dumbbell, Home, MapPin, Search, Utensils } from 'lucide-react'

import BannerImage from '@images/pages/home/banner-image-1.jpg'
import Background from '@images/pages/home/hero-bg.svg'

import { AsyncSelect } from '@/components/ui/async-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { color } from '@/constants/colors'
import { fetchCategoryList } from '@/services/apis'
import { capitalizeFirstLetter } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const searchLocation = async (inputValue?: string): Promise<string[]> => {
  if (!inputValue) return []

  const res = await fetch('/api/search/location', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: inputValue })
  })

  const data = await res.json()

  return data?.suggestions || []
}

const HeroSection = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoryList()
  })

  console.log('categories :', categories)

  return (
    <div
      className='relative bg-gradient-to-br py-10 lg:pt-20 xl:h-[600px]'
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <ScreenWrapper className='relative h-full w-full'>
        {/* Left content */}
        <div className='z-10 flex !max-w-full flex-col justify-center py-8 lg:!max-w-[400px] xl:!max-w-full'>
          <h1 className='z-10 text-3xl font-medium text-gray-900 md:text-3xl lg:text-5xl'>Find Nearby Attractions</h1>
          <p className='z-10 mt-4 text-2xl text-gray-600'>Explore top-rated attractions, activities and more</p>
        </div>

        {/* Search bar - positioned in the middle */}
        <div className='relative z-10 mt-4 max-w-7xl'>
          <div className='p-2 md:rounded-full md:bg-white md:shadow-lg'>
            <div className='flex flex-col gap-2 md:flex-row'>
              {/* Search By Name */}
              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='w-full border-none bg-white text-base outline-none md:bg-transparent md:text-lg'
                />
              </div>

              {/* Enter Location */}
              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <MapPin className='mr-2 h-5 w-5 shrink-0 text-gray-400' />
                <AsyncSelect<string>
                  fetcher={searchLocation}
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
                  notFound={<div className='py-6 text-center text-sm'>Try searching for your city name</div>}
                  label='Location'
                  placeholder='Location..'
                  value={selectedUser || ''}
                  onChange={setSelectedUser}
                  width={'100%'}
                />
              </div>

              {/* List Category */}
              <div className='flex flex-1 items-center bg-white px-4 py-2 md:bg-transparent'>
                <Select>
                  <SelectTrigger className='w-full border-none p-0 text-left text-base text-gray-600 ring-0 outline-none focus:ring-0 focus:ring-offset-0 md:text-lg'>
                    <SelectValue placeholder='All Categories' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    {categories?.data.map(category => (
                      <SelectItem key={category.u_id} value={category.main_category}>
                        {capitalizeFirstLetter(category.category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                style={{
                  backgroundImage: `linear-gradient(135deg, ${color.linearGradientValue.join(', ')})`,
                  color: '#fff'
                }}
                className='mt-2 cursor-pointer rounded-full px-2 py-1 text-base font-medium text-white transition md:mt-0 md:px-6 md:py-2 md:text-lg'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Search className='h-5 w-5 shrink-0' />
                  <span>Search</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className='relative z-10 mt-8'>
          <p className='mb-3 text-sm text-gray-600'>Or browse featured categories:</p>
          <div className='flex flex-wrap gap-2'>
            <Link
              href='#'
              className='flex items-center rounded-full bg-gray-900 px-2 py-1 text-sm text-white md:px-4 md:py-2'
            >
              <Home className='mr-2 h-4 w-4' />
              Apartments
            </Link>
            <Link
              href='#'
              className='flex items-center rounded-full bg-gray-900 px-2 py-1 text-sm text-white md:px-4 md:py-2'
            >
              <Utensils className='mr-2 h-4 w-4' />
              Eat & Drink
            </Link>
            <Link
              href='#'
              className='flex items-center rounded-full bg-gray-900 px-2 py-1 text-sm text-white md:px-4 md:py-2'
            >
              <Calendar className='mr-2 h-4 w-4' />
              Events
            </Link>
            <Link
              href='#'
              className='flex items-center rounded-full bg-gray-900 px-2 py-1 text-sm text-white md:px-4 md:py-2'
            >
              <Dumbbell className='mr-2 h-4 w-4' />
              Fitness
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className='absolute top-2 right-20 hidden lg:block'>
          <Image
            src={BannerImage}
            alt='Banner Image'
            draggable={false}
            className='!max-h-[500px] !max-w-[550px] rounded-lg object-cover shadow-lg xl:!max-h-[600px] xl:!max-w-full'
          />
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default HeroSection
