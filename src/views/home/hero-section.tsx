'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { Calendar, Dumbbell, Home, MapPin, Search, Utensils } from 'lucide-react'

import BannerImage from '@images/pages/home/banner-image-1.jpg'
import Background from '@images/pages/home/hero-bg.svg'

import { AsyncSelect } from '@/components/ui/async-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { color } from '@/constants/colors'
import { useAppContext } from '@/context/app.context'
import { fetchCategoryList } from '@/services/apis'
import { PlacesApiItem, PlacesApiResponse } from '@/types/google-places'
import { capitalizeFirstLetter, toUrlName } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const modifyUserData = (city: string): PlacesApiItem => {
  return {
    placePrediction: {
      place: 'places/ChIJhYgM_X5OXjkRFVJLDDy5oKk',
      placeId: 'ChIJhYgM_X5OXjkRFVJLDDy5oKk',

      text: {
        text: city,
        matches: [
          {
            endOffset: 5
          }
        ]
      },
      structuredFormat: {
        mainText: {
          text: city,
          matches: [
            {
              endOffset: 5
            }
          ]
        },
        secondaryText: {
          text: city
        }
      },
      types: ['geocode', 'locality', 'political']
    }
  }
}

const HeroSection = () => {
  const router = useRouter()
  const { currentCity } = useAppContext()

  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoryList()
  })

  const onSearch = () => {
    if (!selectedLocation) return

    const city = toUrlName(selectedLocation?.toLowerCase())
    const category = !!selectedCategory && selectedCategory !== 'all' ? selectedCategory : ''
    const query = searchText.trim()

    setIsSearching(true)

    router.push(
      toUrlName(`/${city}${!!category ? `/${category}` : ''}${!!query ? `?text=${encodeURIComponent(query)}` : ''}`)
    )
  }

  const searchLocation = useCallback(
    async (inputValue?: string): Promise<PlacesApiItem[]> => {
      try {
        if (!inputValue && !currentCity) return []

        if (!!inputValue) {
          const res = await fetch('/api/search/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: inputValue })
          })

          const data: PlacesApiResponse = await res.json()

          return data?.data || []
        } else {
          if (!!currentCity) {
            setSelectedLocation(currentCity)

            return !!currentCity ? [modifyUserData(currentCity)] : []
          }

          return []
        }
      } catch (error) {
        console.log('error :', error)

        return []
      }
    },
    [currentCity]
  )

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

        {/* Search bar */}
        <form onSubmit={onSearch} className='relative z-10 mt-4 max-w-7xl'>
          <div className='p-2 md:rounded-full md:bg-white md:shadow-lg'>
            <div className='flex flex-col gap-2 md:flex-row'>
              {/* Search By Name */}
              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <input
                  type='text'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder='What are you looking for?'
                  className='w-full border-none bg-white text-base outline-none md:bg-transparent md:text-lg'
                />
              </div>

              {/* Enter Location */}
              <div className='flex flex-1 items-center border-b border-gray-200 bg-white px-4 py-2 md:border-r md:border-b-0 md:bg-transparent'>
                <MapPin className='mr-2 h-5 w-5 shrink-0 text-gray-400' />
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
                  placeholder='Location..'
                  value={selectedLocation || ''}
                  onChange={setSelectedLocation}
                  width={'100%'}
                />
              </div>

              {/* Category */}
              <div className='flex flex-1 items-center bg-white px-4 py-2 md:bg-transparent'>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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

              {/* Search Button */}
              <button
                type='submit'
                onClick={onSearch}
                disabled={isSearching}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${color.linearGradientValue.join(', ')})`,
                  color: '#fff'
                }}
                className='mt-2 cursor-pointer rounded-full px-2 py-1 text-base font-medium text-white transition md:mt-0 md:px-6 md:py-2 md:text-lg'
              >
                <div className='flex items-center justify-center gap-2'>
                  {isSearching ? (
                    <span>Searching...</span>
                  ) : (
                    <>
                      <Search className='h-5 w-5 shrink-0' />
                      <span>Search</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* Categories */}
        <div className='relative z-10 mt-8'>
          <p className='mb-3 text-sm text-gray-600'>Or browse featured categories:</p>
          <div className='flex flex-wrap gap-2'>
            {[
              { icon: <Home className='mr-2 h-4 w-4' />, label: 'Apartments' },
              { icon: <Utensils className='mr-2 h-4 w-4' />, label: 'Eat & Drink' },
              { icon: <Calendar className='mr-2 h-4 w-4' />, label: 'Events' },
              { icon: <Dumbbell className='mr-2 h-4 w-4' />, label: 'Fitness' }
            ].map(({ icon, label }, idx) => (
              <Link
                key={idx}
                href='#'
                className='flex items-center rounded-full bg-gray-900 px-2 py-1 text-sm text-white md:px-4 md:py-2'
              >
                {icon}
                {label}
              </Link>
            ))}
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
