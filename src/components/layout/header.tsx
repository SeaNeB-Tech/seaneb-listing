'use client'

import { memo, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import LogoSmall from '@images/logo/logo-small.png'
import Logo from '@images/logo/logo-white.png'

import ScreenWrapper from '../wrapper/screen-wrapper'

import { cn } from '@/lib/utils'
import * as m from 'motion/react-m'

function Header() {
  // ** Hooks
  // const pathname = usePathname()

  // ** States
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  // useEffect(() => {
  //   setIsMenuOpen(false)
  // }, [pathname])

  return (
    <m.nav
      animate={scrollPosition >= 180 ? { opacity: 1, top: 0 } : undefined}
      initial={scrollPosition >= 180 ? { opacity: 0, top: -100 } : undefined}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn('navbar navbar-expand-lg sticky top-0 z-20 w-full bg-white p-0 shadow-lg')}
    >
      <header className='w-full py-1 lg:py-2'>
        <ScreenWrapper className='flex h-16 items-center'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center gap-2 lg:mr-8'>
              <Image
                src={LogoSmall}
                alt='logo'
                width={48}
                height={48}
                priority
                className='h-12 w-12 shrink-0 lg:hidden'
              />
              <Image
                src={Logo}
                alt='logo'
                width={264}
                height={48}
                priority
                className='hidden shrink-0 invert-100 lg:block'
              />
              {/* <p className='text-lg font-medium'>SeaNeB</p> */}
            </Link>
          </div>

          <div className='flex w-full items-center'>
            {/* Desktop Navigation */}
            <nav className='hidden flex-1 lg:block'>
              {/* <ul className='flex items-center gap-6'>
                {headerMenuData().map((menu, index) => (
                  <li className='group relative' key={index}>
                    <Link
                      href={menu?.href}
                      className={cn(
                        'animated-underline hover:text-primary block px-1 py-2 text-base font-medium text-gray-900',
                        pathname === menu?.href &&
                          'text-primary font-semibold transition-transform duration-200 ease-out'
                      )}
                    >
                      {menu?.title}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </nav>
            <div className='ml-4 flex flex-1 items-center justify-end lg:flex-none'>
              {(checkDevice() !== 'android' || !isMobile) && (
                <Link href='/contact-us'>
                  <Image width={130} height={60} alt='Download on App Store' src={'/images/logo/app-store.svg'} />
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
              {/* {isMobile && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='bg-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded text-white lg:hidden'
                  aria-label='Toggle menu'
                >
                  {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
                </button>
              )} */}
            </div>
          </div>
        </ScreenWrapper>
      </header>

      {/* <AnimatePresence>
        {isMenuOpen && isMobile && (
          <m.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '65%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 right-0 z-[100000] h-full bg-white p-4 shadow-md'
          >
            <div className='item-center flex justify-end'>
              <button
                onClick={() => setIsMenuOpen(false)}
                className='bg-primary mb-4 flex h-10 w-10 items-center justify-center rounded text-white'
              >
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
                      pathname === menu?.href ? 'bg-primary text-white' : 'hover:text-primary text-gray-900'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {menu?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence> */}
    </m.nav>
  )
}

export default memo(Header)
