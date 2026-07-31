'use client'

import { memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@images/logo/logo-dark.svg'
import ScreenWrapper from '../wrapper/screen-wrapper'

import siteJson from '@/data/site.json'
import type { SiteData } from '@/types/site'
import * as m from 'motion/react-m'
import { generatePublicImageBusinessLink } from '@/lib/utils'
import Axios from 'axios'
import LocationModal from './location-modal'
import { useAppContext } from '@/context/app.context'
import { MapPin, ChevronDown } from 'lucide-react'

const siteData: SiteData = siteJson

// Define type for fetched apps
interface AppProduct {
  product_key: string
  name: string
  url: string
  image: string | null
  logo: string | null
  status: 'live' | 'upcoming'
}

function Header() {
  const pathname = usePathname()
  const { currentCity, isLocationModalOpen, toggleLocationModal, isDetecting } = useAppContext()

  const [scrollPosition, setScrollPosition] = useState(0)
  const [openApps, setOpenApps] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [appsData, setAppsData] = useState<AppProduct[]>([])

  const appsRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setScrollPosition((prev) => {
      const current = Math.round(window.scrollY)
      return prev === current ? prev : current
    })
  }

  // Fetch Nine Dots Apps
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const cachedStr = localStorage.getItem('ninedots_apps_cache_v3')
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr)
            if (cached.timestamp && (Date.now() - cached.timestamp < 24 * 60 * 60 * 1000)) {
              setAppsData(cached.data)
              return
            }
          } catch (e) {
            // ignore cache parse errors
          }
        }

        const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/ninedots`)
        if (response.data?.success && Array.isArray(response.data.data)) {
          const apiProducts = response.data.data
          const formattedApps: AppProduct[] = apiProducts.map((prod: any) => ({
            product_key: prod.product_key,
            name: prod.name || prod.product_key,
            url: prod.href || `https://${prod.product_key}.seaneb.com`,
            image: prod.icon || prod.logo,
            logo: prod.logo,
            status: 'live' // currently all fetched apps are considered live
          }))
          
          localStorage.setItem('ninedots_apps_cache_v3', JSON.stringify({
            data: formattedApps,
            timestamp: Date.now()
          }))
          
          setAppsData(formattedApps)
        }
      } catch (error) {
        console.error('Failed to fetch nine dots apps:', error)
      }
    }
    fetchApps()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!appsRef.current?.contains(e.target as Node)) setOpenApps(false)
      if (!menuRef.current?.contains(e.target as Node)) setOpenMenu(false)
    }
    document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href?: string) => {
    if (!href){

      return false
    }
    if (href === '/'){

      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  const liveApps = appsData.filter(app => app.status === 'live')
  const upcomingApps = appsData.filter(app => app.status === 'upcoming')
  
  const seanebApp = appsData.find(app => app.product_key.toLowerCase() === 'seaneb' || app.name.toLowerCase() === 'seaneb')
  const mainLogo = seanebApp?.logo ? generatePublicImageBusinessLink(seanebApp.logo) : null

  return (
    <>
      <m.nav
        animate={scrollPosition >= 180 ? { opacity: 1, top: 0 } : undefined}
        initial={scrollPosition >= 180 ? { opacity: 0, top: -100 } : undefined}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='navbar sticky top-0 z-20 w-full bg-white p-0 shadow-lg'
      >
        <header className='w-full py-1 lg:py-2'>
          <ScreenWrapper className='flex h-16 items-center justify-between'>
            {/* Hamburger */}
            <button onClick={() => setOpenMenu(true)} className='rounded-lg p-2 hover:bg-gray-100 lg:hidden'>
              <div className='flex flex-col gap-[4px]'>
                <span className='h-[2px] w-5 rounded bg-gray-800' />
                <span className='h-[2px] w-5 rounded bg-gray-800' />
                <span className='h-[2px] w-5 rounded bg-gray-800' />
              </div>
            </button>

            {/* Left side: Logo & Location */}
            <div className='flex items-center gap-4 lg:gap-6 lg:mr-auto'>
              <Link href='/' className='flex items-center gap-2 lg:mr-8'>
                {mainLogo && (
                  <Image
                    src={mainLogo}
                    alt='logo'
                    width={220}
                    height={38}
                    priority
                    unoptimized
                    className='w-auto max-w-[150px] sm:max-w-[180px] lg:max-w-[220px] max-h-[38px] object-contain'
                  />
                )}
              </Link>
              
              {/* Location Selector (Desktop/Tablet) */}
              <div className='relative hidden sm:block shrink-0'>
                <button
                  id="location-selector-desktop"
                  onClick={toggleLocationModal}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 group ${isLocationModalOpen
                      ? "border-blue-500/30 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {isDetecting ? (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-500 shrink-0 transition-colors" />
                  )}
                  <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                    {isDetecting ? "Detecting..." : (currentCity || "Select City")}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${isLocationModalOpen ? "rotate-180" : ""}`} />
                </button>
                <LocationModal />
              </div>
            </div>

            {/* RIGHT */}
            <div className='flex items-center'>
              {/* Desktop Nav */}
              <nav className='mr-4 hidden flex-1 lg:block'>
                <ul className='flex items-center justify-center gap-8'>
                  {siteData.navigation.main.map(item => {
                    if (!item.href){

                      return null
                    }
                    const active = isActive(item.href)

                    return (
                      <li key={item.label} className='group relative'>
                        <Link
                          href={item.href}
                          className={`relative pb-1 text-sm font-medium transition ${
                            active ? 'text-primary' : 'hover:text-primary text-gray-700'
                          }`}
                        >
                          {item.label}
                          <span
                            className={`bg-primary absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300 ${
                              active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Apps */}
              <div ref={appsRef} className='relative flex cursor-pointer items-center'>
                <button
                  onClick={() => setOpenApps(v => !v)}
                  className='group grid grid-cols-3 gap-[3px] rounded-lg p-2 transition hover:bg-gray-100'
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className='h-[6px] w-[6px] rounded-full bg-gray-700 transition group-hover:scale-125'
                    />
                  ))}
                </button>

                {openApps && (
                  <m.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className='absolute top-12 right-0 w-[380px] rounded-2xl border bg-white p-5 shadow-xl'
                  >
                    {/* OUR PRODUCTS */}
                    {liveApps.length > 0 && (
                      <div>
                        <h3 className='relative mb-4 inline-block text-sm font-semibold text-gray-800'>
                          Our Products
                          <span className='bg-primary absolute -bottom-1 left-0 h-[2px] w-10 rounded-full' />
                        </h3>

                        <div className='grid grid-cols-3 gap-4'>
                          {liveApps.map(app => (
                            <a
                              key={app.product_key}
                              href={app.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-gray-100'
                            >
                              {app.image ? (
                                <Image 
                                  src={generatePublicImageBusinessLink(app.image)} 
                                  alt={app.name} 
                                  width={48} 
                                  height={48} 
                                  unoptimized
                                  className='rounded-lg object-contain w-12 h-12' 
                                />
                              ) : (
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                  {app.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className='text-center text-xs font-medium'>{app.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* UPCOMING PRODUCTS */}
                    {upcomingApps.length > 0 && (
                      <div className='mt-6'>
                        <h3 className='relative mb-4 inline-block text-sm font-semibold text-gray-800'>
                          Upcoming Products
                          <span className='bg-primary absolute -bottom-1 left-0 h-[2px] w-10 rounded-full' />
                        </h3>
                        <div className='grid grid-cols-3 gap-4'>
                          {upcomingApps.map(app => (
                            <div
                              key={app.product_key}
                              className='relative flex cursor-not-allowed flex-col items-center gap-2 rounded-xl bg-gray-50 p-3 opacity-80'
                            >
                              {app.image ? (
                                <Image 
                                  src={generatePublicImageBusinessLink(app.image)} 
                                  alt={app.name} 
                                  width={48} 
                                  height={48} 
                                  unoptimized
                                  className='rounded-lg grayscale object-contain w-12 h-12' 
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg grayscale">
                                  {app.name.charAt(0).toUpperCase()}
                                </div>
                              )}

                              <span className='text-center text-xs font-medium'>{app.name}</span>

                              <span className='bg-primary absolute top-1 right-1 rounded-full px-2 py-[2px] text-[10px] text-white'>
                                Upcoming
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </m.div>
                )}
              </div>
            </div>
          </ScreenWrapper>
        </header>
      </m.nav>

      {/* MOBILE DRAWER */}
      <m.div
        ref={menuRef}
        initial={{ x: '-100%' }}
        animate={{ x: openMenu ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className='fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-xl lg:hidden'
      >
        <div className='flex items-center justify-between border-b p-5'>
          <span className='font-semibold'>Menu</span>
          <button onClick={() => setOpenMenu(false)}>✕</button>
        </div>

        <div className='px-5 py-4 border-b'>
          <button
            id="location-selector-mobile"
            onClick={() => {
              setOpenMenu(false);
              toggleLocationModal();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-200 group ${isLocationModalOpen
                ? "border-blue-500/30 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
          >
            <div className='flex items-center gap-2'>
              {isDetecting ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-500 shrink-0 transition-colors" />
              )}
              <span className="text-sm font-semibold text-gray-700 max-w-[150px] truncate">
                {isDetecting ? "Detecting..." : (currentCity || "Select City")}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>
        </div>

        <nav className='p-5'>
          <ul className='flex w-full flex-col items-center gap-4 text-center'>
            {siteData.navigation.main.map(item => {
              if (!item.href){

                return null
              }
              const active = isActive(item.href)

              return (
                <li key={item.label} className='w-full'>
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className={`block text-sm font-medium ${active ? 'text-primary' : 'text-gray-700'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </m.div>

      {openMenu && <div className='fixed inset-0 z-40 bg-black/30 lg:hidden' onClick={() => setOpenMenu(false)} />}
    </>
  )
}

export default memo(Header)
