'use client'

import { memo, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Logo from '@images/logo/logo-dark.png'

import ScreenWrapper from '../wrapper/screen-wrapper'

import { websiteConfig } from '@/config/website-config'
import { cn } from '@/lib/utils'

import * as m from 'motion/react-m'

function Header() {
  // ** States
  const [scrollPosition, setScrollPosition] = useState(0)
  const [agent, setAgent] = useState<'ios' | 'android' | 'other'>('other')

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }

  const checkDevice = () => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent || navigator.vendor
      if (/android/i.test(userAgent)) {
        return 'android'
      } else if (/iPad|iPhone|Mac|iPod/.test(userAgent)) {
        return 'ios'
      }

      return 'other'
    }

    return 'other'
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    setAgent(checkDevice())

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
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
          <div className='flex items-center'>
            <Link href='/' className='flex items-center gap-2 lg:mr-8'>
              <Image src={Logo} alt='logo' width={264} height={48} priority className='shrink-0' />
              {/* <p className='text-lg font-medium'>SeaNeB</p> */}
            </Link>
          </div>

          <div className='flex w-full items-center'>
            {/* Desktop Navigation */}
            <nav className='hidden flex-1 lg:block'></nav>
            <div className='ml-4 flex flex-1 items-center justify-end lg:flex-none'>
              <Link href={websiteConfig.appstore} className={cn(agent === 'ios' ? 'block' : 'hidden lg:block')}>
                <Image
                  width={130}
                  height={60}
                  sizes='100vw'
                  priority
                  className='h-[42px] w-auto'
                  alt='Download on App Store'
                  src={'/images/logo/app-store.svg'}
                />
              </Link>
              <Link href={websiteConfig.playstore} className={cn(agent === 'android' ? 'block' : 'hidden lg:block')}>
                <Image
                  width={160}
                  height={60}
                  priority
                  sizes='100vw'
                  className='h-[60px]'
                  alt='Download on Google Play'
                  src={'/images/logo/google-play-store.png'}
                />
              </Link>
            </div>
          </div>
        </ScreenWrapper>
      </header>
    </m.nav>
  )
}

export default memo(Header)
