'use client'

import { getLocationData } from '@/utils/location'
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  currentCity: string
  setCurrentCity: (city: string) => void
  isLocationModalOpen: boolean
  isDetecting: boolean
  setIsDetecting: (val: boolean) => void
  toggleLocationModal: () => void
  closeLocationModal: () => void
  detectLocation: () => Promise<string | null>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // ** States
  const [currentCity, setCurrentCity] = useState<string>('')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)

  const toggleLocationModal = useCallback(() => {
    setIsLocationModalOpen(prev => !prev)
  }, [])

  const closeLocationModal = useCallback(() => {
    setIsLocationModalOpen(false)
  }, [])

  const getLocationFromIP = async () => {
    const locationData = await getLocationData()
    setCurrentCity(locationData?.city || '')
    setIsDetecting(false)
  }

  const fetchCurrentLocation = useCallback(async (): Promise<string | null> => {
    setIsDetecting(true)
    return new Promise((resolve) => {
      const fallbackCity = 'Anand'

      const handleFallback = () => {
        setCurrentCity(fallbackCity)
        localStorage.setItem('saved_city_name', fallbackCity)
        setIsDetecting(false)
        resolve(fallbackCity)
      }

      if (!navigator.geolocation) {
        handleFallback()
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )
            const data = await response.json()
            const city = data.city || data.locality || data.principalSubdivision

            if (city) {
              setCurrentCity(city)
              localStorage.setItem('saved_city_name', city)
              setIsDetecting(false)
              resolve(city)
            } else {
              handleFallback()
            }
          } catch {
            handleFallback()
          }
        },
        () => {
          handleFallback()
        },
        { enableHighAccuracy: true, timeout: 10000 }
      )
    })
  }, [])

  useEffect(() => {
    // Only fetch from localStorage on initial load
    const savedCity = localStorage.getItem('saved_city_name')
    if (savedCity) {
      setCurrentCity(savedCity)
    }
  }, [])

  const values: AppContextProps = {
    currentCity,
    setCurrentCity,
    isLocationModalOpen,
    isDetecting,
    setIsDetecting,
    toggleLocationModal,
    closeLocationModal,
    detectLocation: fetchCurrentLocation
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
