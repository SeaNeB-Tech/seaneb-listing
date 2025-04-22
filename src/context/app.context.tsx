'use client'

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react'

interface AppContextProps {
  currentCity: string
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // ** States
  const [currentCity, setCurrentCity] = useState<string>('')

  const fetchCurrentLocation = useCallback(async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async response => {
          console.log(response?.coords)
          const res = await fetch('/api/search/user-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: { lat: response?.coords?.latitude, long: response?.coords?.longitude } })
          })

          const data: { status: string; data: string } = await res.json()

          const cityName = data?.data
          setCurrentCity(cityName)
        },
        err => {
          console.log('Error Fetching User Location', err)
        },
        { enableHighAccuracy: true }
      )
    } catch (error) {
      console.log('error :', error)
      setCurrentCity('')
    }
  }, [])

  useEffect(() => {
    fetchCurrentLocation()
  }, [fetchCurrentLocation])

  const values: AppContextProps = {
    currentCity
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
