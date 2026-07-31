'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toUrlName } from '@/utils'
import axios from 'axios'
import { useAppContext } from '@/context/app.context'

// Flag to store the saved location and prevent continuous redirects
const REDIRECT_FLAG = 'saved_location_slug'
const SESSION_REDIRECT_FLAG = 'has_redirected_to_location'

export const AutoRedirect = () => {
  const router = useRouter()
  const { setCurrentCity } = useAppContext()
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    // 1. Check if already redirected this session
    if (sessionStorage.getItem(SESSION_REDIRECT_FLAG)) {
      return
    }

    // 2. Check if location is already saved in localStorage (persist across sessions)
    const savedLocation = localStorage.getItem(REDIRECT_FLAG)
    if (savedLocation) {
      sessionStorage.setItem(SESSION_REDIRECT_FLAG, 'true')
      router.replace(`/${savedLocation}`)
      return
    }

    const setFallbackAndRedirect = () => {
      // Default to Anand if permission is denied or location fetch fails
      const fallbackSlug = 'in/anand-gj'
      localStorage.setItem(REDIRECT_FLAG, fallbackSlug)
      localStorage.setItem('saved_city_name', 'Anand')
      setCurrentCity('Anand')
      sessionStorage.setItem(SESSION_REDIRECT_FLAG, 'true')
      router.replace(`/${fallbackSlug}`)
      setChecking(false)
    }

    const checkLocationAndRedirect = async () => {
      setChecking(true)

      // Check if browser supports Geolocation
      if (!navigator.geolocation) {
        setFallbackAndRedirect()
        return
      }

      // Prompt user for location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            
            // Reverse Geocoding using free BigDataCloud API
            const response = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )

            const data = response.data
            const city = data.city || data.locality || data.principalSubdivision
            
            if (city) {
              const countryCode = data.countryCode?.toLowerCase() || 'in'
              const citySlug = toUrlName(city)
              const finalSlug = `${countryCode}/${citySlug}`
              
              localStorage.setItem(REDIRECT_FLAG, finalSlug)
              localStorage.setItem('saved_city_name', city)
              setCurrentCity(city)
              sessionStorage.setItem(SESSION_REDIRECT_FLAG, 'true')
              router.replace(`/${finalSlug}`)
            } else {
              setFallbackAndRedirect()
            }
          } catch (error) {
            console.error('Reverse Geocoding failed:', error)
            setFallbackAndRedirect()
          }
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error)
          setFallbackAndRedirect()
        },
        { timeout: 10000 } // Wait max 10s for the user to respond
      )
    }

    checkLocationAndRedirect()
  }, [router])

  return null
}

