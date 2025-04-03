'use client'

import { headerMenuData } from '@/data/menu-data'
import { cn } from '@/lib/utils'
import Logo from '@images/logo/logo-small.png'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ScreenWrapper from '../wrapper/screen-wrapper'

export default function Header() {
  // ** Hooks
  const pathname = usePathname()

  // ** States
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }

  const checkDevice = () => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent || navigator.vendor
      if (/android/i.test(userAgent)) {
        return 'android'
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'ios'
      }
      return 'other'
    }
    return 'other'
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <m.nav
      animate={scrollPosition >= 200 ? { opacity: 1, top: 0 } : undefined}
      initial={scrollPosition >= 200 ? { opacity: 0, top: -100 } : undefined}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='navbar navbar-expand-lg z-[99999] sticky top-0 w-full bg-white shadow-lg p-0'>
      <header className='w-full py-1 lg:py-2'>
        <ScreenWrapper className='flex h-16 items-center'>
          <div className='flex items-center'>
            <Link href='/' className='lg:mr-8'>
              <Image
                src={Logo}
                alt='logo'
                width={48}
                height={48}
                priority
                className='h-12 w-12 shrink-0'
              />
            </Link>
          </div>

          <div className='flex items-center w-full'>
            {/* Desktop Navigation */}
            <nav className='hidden lg:block flex-1'>
              <ul className='flex items-center gap-6'>
                {headerMenuData().map((menu, index) => (
                  <li className='group relative' key={index}>
                    <Link
                      href={menu?.href}
                      className={cn(
                        'animated-underline block px-1 py-2 text-base font-medium text-gray-900 hover:text-primary',
                        pathname === menu?.href &&
                          'font-semibold text-primary transition-transform duration-200 ease-out'
                      )}>
                      {menu?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className='ml-4 flex flex-1 lg:flex-none items-center justify-end'>
              {(checkDevice() !== 'android' || !isMobile) && (
                <Link href='/contact-us'>
                  <Image
                    width={130}
                    height={60}
                    alt='Download on App Store'
                    src={'/images/logo/app-store.svg'}
                  />
                </Link>
              )}
              {(checkDevice() !== 'ios' || !isMobile) && (
                <Link href='/contact-us'>
                  <Image
                    width={160}
                    height={60}
                    alt='Download on Google Play'
                    src={'/images/logo/google-play-store.png'}
                  />
                </Link>
              )}
              {isMobile && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='h-10 w-10 flex items-center justify-center rounded bg-primary text-white hover:bg-primary lg:hidden'
                  aria-label='Toggle menu'>
                  {isMenuOpen ? (
                    <X className='h-5 w-5' />
                  ) : (
                    <Menu className='h-5 w-5' />
                  )}
                </button>
              )}
            </div>
          </div>
        </ScreenWrapper>
      </header>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <m.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '65%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 right-0 h-full bg-white shadow-md p-4 z-[100000]'>
            <div className='flex item-center justify-end'>
              <button
                onClick={() => setIsMenuOpen(false)}
                className='mb-4 flex h-10 w-10 items-center justify-center rounded bg-primary text-white'>
                <X className='h-5 w-5' />
              </button>
            </div>
            <ul className='flex flex-col gap-4'>
              {headerMenuData().map((menu, index) => (
                <li key={index}>
                  <Link
                    href={menu?.href}
                    className={cn(
                      'block w-full px-4 py-2 text-base font-medium',
                      pathname === menu?.href
                        ? 'bg-primary text-white'
                        : 'text-gray-900 hover:text-primary'
                    )}
                    onClick={() => setIsMenuOpen(false)}>
                    {menu?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  )
}
