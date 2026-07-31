'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/app.context'
import { Search, MapPin, Navigation, Navigation2, X } from 'lucide-react'
import { toUrlName, getStateSlug, STATE_CODES } from '@/utils'

export default function LocationModal({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter()
  const {
    currentCity,
    isLocationModalOpen,
    isDetecting,
    closeLocationModal,
    detectLocation,
    setCurrentCity
  } = useAppContext()

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLocationModalOpen) {
      setQuery('')
      setSuggestions([])
      setHighlightIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isLocationModalOpen])

  useEffect(() => {
    if (!isLocationModalOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLocationModal()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-location-modal="true"]')) return

      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        const btnDesk = document.getElementById('location-selector-desktop')
        const btnMob = document.getElementById('location-selector-mobile')
        if (btnDesk?.contains(e.target as Node) || btnMob?.contains(e.target as Node)) return
        closeLocationModal()
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLocationModalOpen, closeLocationModal])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        return
      }
      setLoading(true)
      try {
        const res = await fetch('/api/search/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: query })
        })
        const data = await res.json()
        if (data.status === 'success') {
          setSuggestions(data.data || [])
        } else {
          setSuggestions([])
        }
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (city: any) => {
    closeLocationModal()
    
    // Update header label
    setCurrentCity(city.city_name)
    
    const citySlug = toUrlName(city.city_name)
    let url = ''

    // If the selected place is a State itself (like Delhi, Haryana, Gujarat)
    if (STATE_CODES[citySlug]) {
      url = `/in/${STATE_CODES[citySlug]}`
    } else {
      // Navigate to city-state flat URL
      const stateSlug = getStateSlug(city.state_name, city.city_name)
      url = `/in/${citySlug}${stateSlug ? `-${stateSlug}` : ''}`
    }
    
    router.push(url)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleSelect(suggestions[highlightIndex])
      }
    }
  }

  const handleDetect = async () => {
    await detectLocation()
    closeLocationModal()
  }

  if (!isLocationModalOpen) return null

  const articleContent = (
    <article
      ref={dropdownRef}
      data-location-modal="true"
      className="flex flex-col bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden"
    >
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 leading-none">Choose your location</h3>
        </div>
        <button
          onClick={closeLocationModal}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {currentCity && (
        <div className="px-4 py-3 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Current Location</span>
          <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            {currentCity}
          </span>
        </div>
      )}

      <div className="h-px bg-gray-100 mx-4" />

      <div className="px-4 pt-2.5 pb-1.5">
        <button
          onClick={handleDetect}
          disabled={isDetecting}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group disabled:opacity-60 disabled:cursor-wait"
        >
          {isDetecting ? (
            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-md bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center shrink-0 transition-colors">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
            </div>
          )}
          <span className="text-xs font-bold text-blue-700 leading-tight">
            {isDetecting ? 'Detecting...' : 'Detect my location'}
          </span>
          {!isDetecting && (
            <Navigation2 className="w-3.5 h-3.5 text-blue-400 ml-auto shrink-0 group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2.5 px-4 py-1.5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">or search</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="px-4 pb-2">
        <div className="flex items-center border border-gray-200 rounded-lg px-2.5 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all duration-200">
          <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-900 placeholder:text-gray-400 font-medium"
            placeholder="Search for your city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          {loading && (
            <div className="ml-2 w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
          )}
        </div>
      </div>

      {(suggestions.length > 0 || (loading && query.length >= 2) || (!loading && query.length >= 2 && suggestions.length === 0)) && (
        <div className="border-t border-gray-100">
          <ul className="max-h-48 overflow-y-auto custom-scrollbar">
            {suggestions.map((city, index) => (
              <li
                key={city.place_id || index}
                onClick={() => handleSelect(city)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                  highlightIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                  highlightIndex === index ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <MapPin className={`w-3 h-3 transition-colors ${
                    highlightIndex === index ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-semibold truncate transition-colors ${
                    highlightIndex === index ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {city.area_name ? `${city.area_name}, ` : ''}{city.city_name}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate">
                    {[city.state_name, city.country_name].filter(Boolean).join(', ')}
                  </span>
                </div>
              </li>
            ))}

            {loading && suggestions.length === 0 && (
              <li className="px-4 py-5 text-center flex flex-col items-center">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Searching...</p>
              </li>
            )}

            {!loading && query.length >= 2 && suggestions.length === 0 && (
              <li className="px-4 py-4 text-center flex flex-col items-center">
                <div className="bg-gray-50 p-2 rounded-lg mb-1.5">
                  <MapPin className="w-4 h-4 text-gray-300" />
                </div>
                <p className="text-xs font-medium text-gray-500">No cities found for "{query}"</p>
              </li>
            )}
          </ul>
        </div>
      )}
    </article>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true">
        <div className="w-full max-w-[380px]">
          {articleContent}
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute top-full left-0 mt-2 z-[9999] w-[380px]"
      role="dialog"
      aria-modal="false"
    >
      {articleContent}
    </div>
  )
}
