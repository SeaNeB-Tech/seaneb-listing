import React from 'react'
import Link from 'next/link'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Calendar, ChevronDown, Dumbbell, Home, MapPin, Utensils } from 'lucide-react'

import BannerImage from '@images/pages/home/banner-image-1.jpg'
import Background from '@images/pages/home/hero-bg.svg'

import Image from 'next/image'

const HeroSection = () => {
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
              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='w-full border-none bg-white text-base outline-none md:bg-transparent md:text-lg'
                />
              </div>

              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <MapPin className='mr-2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Location'
                  className='w-full border-none bg-white text-base outline-none md:bg-transparent md:text-lg'
                />
              </div>

              <div className='flex flex-1 items-center bg-white px-4 py-2 md:bg-transparent'>
                <span className='text-base text-gray-600 md:text-lg'>All Categories</span>
                <ChevronDown className='ml-2 h-4 w-4 text-gray-400' />
              </div>

              <button className='mt-2 rounded-full bg-red-500 px-2 py-1 text-base font-medium text-white transition hover:bg-red-600 md:mt-0 md:px-6 md:py-2 md:text-lg'>
                Search
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
