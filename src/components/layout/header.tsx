'use client'

import { memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@images/logo/logo-dark.png'
import ScreenWrapper from '../wrapper/screen-wrapper'

import siteJson from '@/data/site.json'
import ninedots from '@/data/ninedots.json'
import type { SiteData } from '@/types/site'
import * as m from 'motion/react-m'

const siteData: SiteData = siteJson

function Header() {
  const pathname = usePathname()

  const [scrollPosition, setScrollPosition] = useState(0)
  const [openApps, setOpenApps] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const appsRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => setScrollPosition(window.scrollY)

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

  const liveApps = ninedots.apps.filter(app => app.status === 'live')
  const upcomingApps = ninedots.apps.filter(app => app.status === 'upcoming')

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

            {/* Logo */}
            <Link href='/' className='flex items-center gap-2 lg:mr-8'>
              <Image
                src={Logo}
                alt='logo'
                width={220}
                height={38}
                priority
                className='h-auto max-w-36 sm:max-w-44 lg:max-w-full'
              />
            </Link>

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
                              key={app.name}
                              href={app.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-gray-100'
                            >
                              <Image src={app.image} alt={app.name} width={48} height={48} className='rounded-lg' />
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
                              key={app.name}
                              className='relative flex cursor-not-allowed flex-col items-center gap-2 rounded-xl bg-gray-50 p-3 opacity-80'
                            >
                              <Image
                                src={app.image}
                                alt={app.name}
                                width={48}
                                height={48}
                                className='rounded-lg grayscale'
                              />

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
