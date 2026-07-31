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
  detectLocation: () => Promise<void>
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

  const fetchCurrentLocation = useCallback(async () => {
    setIsDetecting(true)
    try {
      navigator.geolocation.getCurrentPosition(
        async response => {
          try {
            const res = await fetch('/api/search/user-location', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ location: { lat: response?.coords?.latitude, long: response?.coords?.longitude } })
            })

            const data: { status: string; data: string } = await res.json()

            if (data?.status === 'success' && data?.data) {
              setCurrentCity(data.data)
              setIsDetecting(false)
            } else {
              // Reverse geocoding failed, fallback to IP-based detection
              getLocationFromIP()
            }
          } catch {
            // API call failed, fallback to IP-based detection
            getLocationFromIP()
          }
        },
        err => {
          if (err.code === 1 || err.code === 2 || err.code === 3) {
            getLocationFromIP()
          } else {
            setIsDetecting(false)
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      )
    } catch {
      setCurrentCity('')
      setIsDetecting(false)
    }
  }, [])

  useEffect(() => {
    fetchCurrentLocation()
  }, [fetchCurrentLocation])

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
