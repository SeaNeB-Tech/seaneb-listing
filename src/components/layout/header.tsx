'use client'

import { memo, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Logo from '@images/logo/logo-dark.png'
import ScreenWrapper from '../wrapper/screen-wrapper'

import { cn } from '@/lib/utils'

import siteJson from '@/data/site.json'
import ninedots from '@/data/ninedots.json'

import type { SiteData } from '@/types/site'

const siteData: SiteData = siteJson

import * as m from 'motion/react-m'

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [openApps, setOpenApps] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = () => setScrollPosition(window.scrollY)

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpenApps(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <m.nav
      animate={scrollPosition >= 180 ? { opacity: 1, top: 0 } : undefined}
      initial={scrollPosition >= 180 ? { opacity: 0, top: -100 } : undefined}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn('navbar navbar-expand-lg sticky top-0 z-20 w-full bg-white p-0 shadow-lg')}
    >
      <header className='w-full py-1 lg:py-2'>
        <ScreenWrapper className='flex h-16 items-center'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 lg:mr-8'>
            <Image
              src={Logo}
              alt='logo'
              width={220}
              height={38}
              priority
              className='h-auto max-w-44 shrink-0 sm:max-w-full'
            />
          </Link>

          <div className='flex w-full items-center'>
            {/* Navigation */}
            <nav className='hidden flex-1 lg:block'>
              <ul className='flex items-center justify-center gap-8'>
                {siteData.navigation.main.map((item) => {
                  if (!item.href) return null

                  return (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm font-medium text-gray-700 hover:text-primary transition'
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className='text-sm font-medium text-gray-700 hover:text-primary transition'
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Apps launcher */}
            <div ref={ref} className='relative ml-4 flex items-center'>
              {/* 9 dots button */}
              <button
                onClick={() => setOpenApps(v => !v)}
                className='group grid grid-cols-3 gap-[3px] p-2 rounded-lg hover:bg-gray-100 transition'
                aria-label='Apps'
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className='h-[6px] w-[6px] rounded-full bg-gray-700 transition-transform group-hover:scale-125'
                  />
                ))}
              </button>

              {/* Dropdown */}
              {openApps && (
                <m.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className='absolute right-0 top-12 w-[340px] rounded-2xl border bg-white p-4 shadow-xl'
                >
                  <div className='grid grid-cols-3 gap-4'>
                    {ninedots.apps.map((app) => (
                      <a
                        key={app.name}
                        href={app.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex flex-col items-center gap-2 rounded-xl p-3 hover:bg-gray-100 transition'
                      >
                        <Image
                          src={app.image}
                          alt={app.name}
                          width={48}
                          height={48}
                          className='rounded-lg'
                        />
                        <span className='text-xs text-center font-medium'>
                          {app.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </m.div>
              )}
            </div>
          </div>
        </ScreenWrapper>
      </header>
    </m.nav>
  )
}

export default memo(Header)