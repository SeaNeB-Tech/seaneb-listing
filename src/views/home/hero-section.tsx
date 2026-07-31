'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { websiteConfig } from '@/config/website-config'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { MapPin, Search } from 'lucide-react'
import Background from '@images/pages/home/hero-bg.png'

import { AsyncSelect } from '@/components/ui/async-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { color } from '@/constants/colors'
import { useAppContext } from '@/context/app.context'
import { fetchCategoryList } from '@/services/apis'
import { PlacesApiItem, PlacesApiResponse } from '@/types/google-places'
import { capitalizeFirstLetter, toUrlName, getStateSlug, STATE_CODES } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const modifyUserData = (city: string): any => {
  return {
    display_name: city,
    city_name: city,
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

  // Track previous city to detect changes from header location modal
  const prevCityRef = useRef(currentCity)

  // Sync header city selection → search bar location
  // When currentCity changes from header, reset selectedLocation so searchLocation can re-set it
  useEffect(() => {
    if (currentCity && currentCity !== prevCityRef.current) {
      prevCityRef.current = currentCity
      // Reset selectedLocation so the searchLocation callback will auto-select
      setSelectedLocation(null)
    }
  }, [currentCity])

  const onSearch = () => {
    if (!selectedLocation) return

    // selectedLocation now contains the pre-formatted slug (e.g., 'anand-gj') if selected from dropdown
    const locationSlug = toUrlName(selectedLocation?.toLowerCase())
    const category = !!selectedCategory && selectedCategory !== 'all' ? selectedCategory : ''
    const query = searchText.trim()

    setIsSearching(true)

    // Ensure we don't duplicate /in/
    let basePath = locationSlug.includes('/') ? `/${locationSlug}` : `/in/${locationSlug}`

    router.push(
      toUrlName(`${basePath}${!!category ? `/${category}` : ''}${!!query ? `?text=${encodeURIComponent(query)}` : ''}`)
    )
  }

  const searchLocation = useCallback(
    async (inputValue?: string): Promise<any[]> => {
      try {
        if (!!inputValue || !!currentCity) {
          const query = inputValue || currentCity

          const res = await fetch('/api/search/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: query })
          })

          const data: PlacesApiResponse = await res.json()
          const results = data?.data || []

          // Auto-select matching result when using currentCity (not user typing)
          if (!inputValue && !!currentCity && results.length > 0) {
            // Find exact match by city_name, fall back to first result
            const matchingOption = results.find(
              (r: any) => r.city_name?.toLowerCase() === currentCity?.toLowerCase()
            ) || results[0]

            const city = toUrlName(matchingOption?.city_name || matchingOption?.display_name || '')
            
            if (STATE_CODES[city]) {
              setSelectedLocation(STATE_CODES[city])
            } else {
              const state = getStateSlug(matchingOption?.state_name || '', matchingOption?.city_name || '')
              setSelectedLocation(state ? `${city}-${state}` : city)
            }
          }

          return results
        }

        return []
      } catch (error) {
        console.error('error :', error)

        return []
      }
    },
    [currentCity]
  )

  return (
    <div className='relative h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden pt-16 pb-24'>      <Image
      src={Background}
      alt='Hero background'
      fill
      priority
      sizes='100vw'
      className='object-cover object-center'
    />

      {/* overlay */}
      <div className='pointer-events-none absolute inset-0 bg-black/20 lg:bg-black/50' />

      <ScreenWrapper className='relative z-10 h-full w-full'>
        {/* Left content */}
        <div className='z-10 flex !max-w-full flex-col justify-center py-8 lg:!max-w-[400px] xl:!max-w-full mt-0 lg:mt-24 xl:mt-30'>
          <h1 className='z-10 text-3xl font-medium text-white md:text-3xl lg:text-5xl'>Find Nearby local businesses</h1>
          <h2 className='z-10 mt-4 text-2xl text-white'>Explore nearby offers, activities and more</h2>
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
                <AsyncSelect<any>
                  fetcher={searchLocation}
                  renderOption={user => (
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col'>
                        <div className='font-medium'>{user?.display_name}</div>
                      </div>
                    </div>
                  )}
                  getOptionValue={user => {
                    const city = toUrlName(user?.city_name || user?.display_name || '')
                    
                    // If the selected place is a State itself (like Delhi, Haryana, Gujarat)
                    if (STATE_CODES[city]) {
                      return STATE_CODES[city]
                    }
                    
                    const state = getStateSlug(user?.state_name || '', user?.city_name || '')
                    return state ? `${city}-${state}` : city
                  }}
                  getDisplayValue={user => (
                    <div className='flex items-center gap-2 text-left'>
                      <div className='flex flex-col leading-tight'>
                        <div className='font-medium'>{user?.display_name}</div>
                      </div>
                    </div>
                  )}
                  notFound={<div className='py-6 text-center text-sm'>Try searching for your city name</div>}
                  label='Location'
                  placeholder='Location..'
                  clearable
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
                    {categories?.data?.map(category => (
                      <SelectItem key={category.main_category_id} value={toUrlName(category.main_category_name)}>
                        {' '}
                        {capitalizeFirstLetter(category.main_category_name)}
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

        {/* Business registration */}
        <div className='relative z-10 mt-10 flex flex-col items-start gap-4'>
          <p className='text-sm font-medium tracking-wide text-white/80 md:text-base'>
            For business registration download the app now!
          </p>

          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center">

            {/* App Store */}
            <Link
              href={websiteConfig.appstore}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-80"
            >
              <div className="relative h-[48px] w-[160px] sm:h-[56px] sm:w-[180px]">
                <Image
                  src="/images/logo/app-store.svg"
                  alt="Download on App Store"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Play Store */}
            <Link
              href={websiteConfig.playstore}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-80"
            >
              <div className="relative h-[60px] w-[150px] sm:h-[68px] sm:w-[250px]">
                <Image
                  src="/images/logo/google-play-store.png"
                  alt="Get it on Google Play"
                  fill
                  className="object-contain scale-[1.12]"
                />
              </div>
            </Link>

          </div>
        </div>



        {/* Image
        <div className='absolute top-2 right-20 hidden lg:block'>
          <Image
            src={BannerImage}
            alt='Banner Image'
            draggable={false}
            className='!max-h-[500px] !max-w-[550px] rounded-lg object-cover shadow-lg xl:!max-h-[600px] xl:!max-w-full'
          />
        </div> */}
      </ScreenWrapper>

    </div>


  )
}

export default HeroSection
