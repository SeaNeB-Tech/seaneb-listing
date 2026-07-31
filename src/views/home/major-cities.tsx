'use client'

import React, { useState, useEffect } from 'react'
import BusinessCounter from '@/views/home/business-counter'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { 
  fetchBrowseCountries, 
  fetchBrowseStates, 
  fetchBrowseCities,
  BrowseCountry,
  BrowseState,
  BrowseCity,
  BrowseBreadcrumb
} from '@/services/apis'

type ViewState = 'countries' | 'states' | 'cities'



interface MajorCitiesProps {
  initialCountrySlug?: string;
  initialStateSlug?: string;
  listCities?: any[]; // Keep to avoid ts errors if passed from home page
}

const MajorCities = ({ initialCountrySlug, initialStateSlug, listCities }: MajorCitiesProps = {}) => {
  const router = useRouter()
  const [view, setView] = useState<ViewState>('countries')
  
  // Data states
  const [countries, setCountries] = useState<BrowseCountry[]>([])
  const [states, setStates] = useState<BrowseState[]>([])
  const [cities, setCities] = useState<BrowseCity[]>([])
  const [breadcrumb, setBreadcrumb] = useState<BrowseBreadcrumb[]>([])

  // Selection states
  const [selectedCountry, setSelectedCountry] = useState<BrowseCountry | null>(null)
  const [selectedState, setSelectedState] = useState<BrowseState | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fetch initial countries, states, or cities
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      if (initialCountrySlug && initialStateSlug) {
        const res = await fetchBrowseCities(initialCountrySlug, initialStateSlug)
        if (res?.success) {
          setCities(res.data.items || [])
          setBreadcrumb(res.data.breadcrumb || [])
          setView('cities')
          
          if (res.data.breadcrumb && res.data.breadcrumb.length > 1) {
            setSelectedCountry({
              country_slug: initialCountrySlug,
              country_name: res.data.breadcrumb[0].label,
              business_count: 0
            } as BrowseCountry)
            setSelectedState({
              state_slug: initialStateSlug,
              state_name: res.data.breadcrumb[1].label,
              business_count: 0
            } as BrowseState)
          }
        }
      } else if (initialCountrySlug) {
        const res = await fetchBrowseStates(initialCountrySlug)
        if (res?.success) {
          setStates(res.data.items || [])
          setBreadcrumb(res.data.breadcrumb || [])
          setView('states')
          
          if (res.data.breadcrumb && res.data.breadcrumb.length > 0) {
            setSelectedCountry({
              country_slug: initialCountrySlug,
              country_name: res.data.breadcrumb[0].label,
              business_count: 0
            } as BrowseCountry)
          }
        }
      } else {
        const res = await fetchBrowseCountries()
        if (res?.success) {
          setCountries(res.data.items || [])
          setBreadcrumb(res.data.breadcrumb || [])
        }
      }
      setIsLoading(false)
    }
    loadInitialData()
  }, [initialCountrySlug])

  const handleCountryClick = async (country: BrowseCountry) => {
    setSelectedCountry(country)
    setIsLoading(true)
    const res = await fetchBrowseStates(country.country_slug)
    if (res?.success) {
      setStates(res.data.items || [])
      setBreadcrumb(res.data.breadcrumb || [])
      setView('states')
    }
    setIsLoading(false)
  }

  const handleStateClick = async (state: BrowseState) => {
    if (!selectedCountry) return
    setSelectedState(state)
    setIsLoading(true)
    const res = await fetchBrowseCities(selectedCountry.country_slug, state.state_slug)
    if (res?.success) {
      setCities(res.data.items || [])
      setBreadcrumb(res.data.breadcrumb || [])
      setView('cities')
    }
    setIsLoading(false)
  }

  const handleBack = async () => {
    if (view === 'cities') {
      if (initialCountrySlug && initialStateSlug) {
        router.push(`/${initialCountrySlug}`)
      } else if (selectedCountry) {
        setIsLoading(true)
        const res = await fetchBrowseStates(selectedCountry.country_slug)
        if (res?.success) {
          setStates(res.data.items || [])
          setBreadcrumb(res.data.breadcrumb || [])
          setView('states')
          setSelectedState(null)
        }
        setIsLoading(false)
      } else {
        setView('countries')
      }
    } else if (view === 'states') {
      if (initialCountrySlug) {
        router.push('/')
      } else {
        setIsLoading(true)
        const res = await fetchBrowseCountries()
        if (res?.success) {
          setCountries(res.data.items || [])
          setBreadcrumb(res.data.breadcrumb || [])
          setView('countries')
          setSelectedCountry(null)
        }
        setIsLoading(false)
      }
    }
  }

  const CountryCard = ({ country }: { country: BrowseCountry }) => {
    const abbr = country.country_name.substring(0, 2).toUpperCase()
    
    return (
      <Link 
        href={`/${country.country_slug}`}
        className='flex cursor-pointer flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
      >
        <div className='flex items-center justify-between mb-4'>
          <span className='rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 tracking-wider uppercase'>
            COUNTRY
          </span>
          <span className='rounded bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500'>
            {abbr}
          </span>
        </div>
        <div className='flex items-center gap-3 mb-6'>
          <img 
            src={`https://flagcdn.com/w40/${country.country_slug.toLowerCase()}.png`} 
            alt={`${country.country_name} flag`} 
            className="h-6 w-9 object-cover rounded shadow-sm border border-gray-100"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <h3 className='text-lg font-semibold text-gray-800 line-clamp-1'>{country.country_name}</h3>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-xs text-gray-500 font-medium'>{country.business_count || 0} Businesses</span>
          <ChevronRight className='h-4 w-4 text-gray-400' />
        </div>
      </Link>
    )
  }

  const StateCard = ({ state }: { state: BrowseState }) => {
    const abbr = state.state_name.substring(0, 2).toUpperCase()
    const cSlug = selectedCountry?.country_slug || initialCountrySlug
    
    return (
      <Link 
        href={`/${cSlug}/${state.state_slug}`}
        className='flex cursor-pointer flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
      >
        <div className='flex items-center justify-between mb-4'>
          <span className='rounded bg-purple-50 px-2 py-1 text-[10px] font-bold text-purple-600 tracking-wider uppercase'>
            STATE
          </span>
          <span className='rounded bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500'>
            {abbr}
          </span>
        </div>
        <h3 className='text-lg font-semibold text-gray-800 mb-6 line-clamp-1'>{state.state_name}</h3>
        <div className='flex items-center justify-between'>
          <span className='text-xs text-gray-500 font-medium'>{state.business_count || 0} Businesses</span>
          <ChevronRight className='h-4 w-4 text-gray-400' />
        </div>
      </Link>
    )
  }

  const CityCard = ({ city }: { city: BrowseCity }) => {
    const abbr = city.city_name.substring(0, 2).toUpperCase()
    
    return (
      <Link 
        href={`/${city.slug}`}
        className='flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
      >
        <div className='flex items-center justify-between mb-4'>
          <span className='rounded bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600 tracking-wider uppercase'>
            CITY
          </span>
          <span className='rounded bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500'>
            {abbr}
          </span>
        </div>
        <h3 className='text-lg font-semibold text-gray-800 mb-6 line-clamp-1'>{city.city_name}</h3>
        <div className='flex items-center justify-between'>
          <span className='text-xs text-gray-500 font-medium'>{city.business_count || 0} Businesses</span>
          <ChevronRight className='h-4 w-4 text-gray-400' />
        </div>
      </Link>
    )
  }

  const getTitle = () => {
    if (view === 'cities' && selectedState) return `Explore ${selectedState.state_name}`
    if (view === 'states' && selectedCountry) return `Explore ${selectedCountry.country_name}`
    
return 'Explore Locations'
  }

  return (
    <ScreenWrapper className='space-y-6 py-10 lg:pt-20 bg-[#fafafb] -mx-4 px-4 sm:mx-0 sm:px-0 rounded-none sm:rounded-3xl sm:bg-transparent'>
      
      {/* Title Area */}
      <div className='mb-8 flex items-center gap-4'>
        {view !== 'countries' && (
          <button 
            onClick={handleBack}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0'
          >
            <ChevronRight className='h-5 w-5 rotate-180 text-gray-600' />
          </button>
        )}
        <h2 className='text-3xl font-bold text-[#1a2b49] line-clamp-1'>
          {getTitle()}
        </h2>
      </div>
      
      {/* Breadcrumb text (Optional minimal breadcrumb just to show depth) */}
      {breadcrumb.length > 0 && view !== 'countries' && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4 px-1">
           {breadcrumb.map((bc, idx) => (
             <React.Fragment key={bc.slug}>
               <span className="font-medium text-gray-700">{bc.label}</span>
               {idx < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
             </React.Fragment>
           ))}
        </div>
      )}

      {/* Grid Container */}
      <div className='w-full min-h-[200px]'>
        {isLoading ? (
          <div className='flex h-[200px] items-center justify-center'>
            <div className='spinner relative size-10'>
               <div className='spinner1 absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2'></div>
            </div>
          </div>
        ) : (
          <>
            {view === 'countries' && (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {countries.length > 0 ? countries.map((country) => (
                  <CountryCard key={country.slug} country={country} />
                )) : (
                  <div className="col-span-full py-10 text-center text-gray-500">No countries available.</div>
                )}
              </div>
            )}

            {view === 'states' && (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {states.length > 0 ? states.map((state) => (
                  <StateCard key={state.slug} state={state} />
                )) : (
                  <div className="col-span-full py-10 text-center text-gray-500">No states available.</div>
                )}
              </div>
            )}

            {view === 'cities' && (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {cities.length > 0 ? cities.map((city) => (
                  <CityCard key={city.slug} city={city} />
                )) : (
                  <div className="col-span-full py-10 text-center text-gray-500">No cities available.</div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <BusinessCounter />
    </ScreenWrapper>
  )
}

export default MajorCities
