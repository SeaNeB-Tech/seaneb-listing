import React from 'react'
import Link from 'next/link'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Calendar, ChevronDown, Dumbbell, Home, MapPin, Utensils } from 'lucide-react'

import BannerImage from '@images/pages/home/banner-image-1.jpg'
import Background from '@images/pages/home/hero-bg.svg'

import Image from 'next/image'

const HeroSection = () => {
  return (
    <div className='plain-color relative bg-gradient-to-br py-10 lg:pt-20'  style={{
      backgroundImage: `url(${Background.src})`,
      backgroundAttachment: 'fixed'
    }}>
      <ScreenWrapper className='relative h-full w-full'>
        {/* Left content */}
        <div className='z-10 flex !max-w-full flex-col justify-center py-8 lg:!max-w-[400px] xl:!max-w-full'>
          <h1 className='z-10 text-3xl font-medium text-gray-900 md:text-3xl lg:text-5xl'>Find Nearby Attractions</h1>
          <p className='z-10 mt-4 text-2xl text-gray-600'>Explore top-rated attractions, activities and more</p>
        </div>

        {/* Search bar - positioned in the middle */}
        <div className='relative z-10 mx-auto mt-8'>
          <div className='bg-white p-2 shadow-lg md:rounded-full'>
            <div className='flex flex-col md:flex-row'>
              <div className='flex flex-1 items-center border-b border-gray-200 px-4 py-2 md:border-r md:border-b-0'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='w-full border-none bg-transparent text-lg outline-none'
                />
              </div>

              <div className='flex flex-1 items-center border-b border-gray-200 px-4 py-2 md:border-r md:border-b-0'>
                <MapPin className='mr-2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Location'
                  className='w-full border-none bg-transparent text-lg outline-none'
                />
              </div>

              <div className='flex flex-1 items-center px-4 py-2'>
                <span className='text-lg text-gray-600'>All Categories</span>
                <ChevronDown className='ml-2 h-4 w-4 text-gray-400' />
              </div>

              <button className='mt-2 rounded-full bg-red-500 px-6 py-2 text-lg font-medium text-white transition hover:bg-red-600 md:mt-0'>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className='relative z-10 mt-8'>
          <p className='mb-3 text-sm text-gray-600'>Or browse featured categories:</p>
          <div className='flex flex-wrap gap-2'>
            <Link href='#' className='flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm text-white'>
              <Home className='mr-2 h-4 w-4' />
              Apartments
            </Link>
            <Link href='#' className='flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm text-white'>
              <Utensils className='mr-2 h-4 w-4' />
              Eat & Drink
            </Link>
            <Link href='#' className='flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm text-white'>
              <Calendar className='mr-2 h-4 w-4' />
              Events
            </Link>
            <Link href='#' className='flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm text-white'>
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
