import Image from 'next/image'
import Link from 'next/link'

import Logo from '@images/logo/logo-white.png'

import { websiteConfig } from '@/config/website-config'

import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import { memo } from 'react'
import ScreenWrapper from '../wrapper/screen-wrapper'

function Footer() {
  return (
    <footer className='bg-black text-white'>
      <ScreenWrapper className='py-5'>
        <div className=' '>
          <div className='flex justify-center'>
            <Link href='/' className='mb-6 inline-block'>
              <Image src={Logo} alt='Logo' width={240} height={240} priority sizes='100vw' className='h-auto w-56' />
            </Link>
          </div>

          <div className='flex items-center justify-center space-x-5'>
            <div className='flex items-center'>
              <Mail className='mr-3 h-5 w-5 shrink-0 text-xs text-white md:text-base' />
              <Link
                href={`mailto:${websiteConfig.email}`}
                className='animated-underline hover:text-footerText = text-sm font-medium text-gray-300'
              >
                {websiteConfig.email}
              </Link>
            </div>
            <div className='flex items-center'>
              <Phone className='mr-3 h-5 w-5 text-xs text-white md:text-base' />
              <Link
                href={`tel:${websiteConfig.call}`}
                className='animated-underline hover:text-footerText = text-sm font-medium text-gray-300'
              >
                {websiteConfig.call}
              </Link>
            </div>
            <div className='hidden h-1 w-1 rounded-full bg-white lg:block' />
            <div className='hidden space-x-4 lg:flex'>
              <Link
                href={websiteConfig.facebook}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='facebook redirects'
                className='hover:text-footerText text-white'
              >
                <Facebook className='h-5 w-5' />
              </Link>

              <Link
                href={websiteConfig.instagram}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='instagram redirects'
                className='hover:text-footerText text-white'
              >
                <Instagram className='h-5 w-5' />
              </Link>
              <Link
                href={websiteConfig.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='linked-in redirects'
                className='hover:text-footerText text-white'
              >
                <Linkedin className='h-5 w-5' />
              </Link>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-center space-x-4 lg:hidden'>
            <Link
              href={websiteConfig.facebook}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='facebook redirects'
              className='hover:text-footerText text-white'
            >
              <Facebook className='h-5 w-5' />
            </Link>

            <Link
              href={websiteConfig.instagram}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='instagram redirects'
              className='hover:text-footerText text-white'
            >
              <Instagram className='h-5 w-5' />
            </Link>
            <Link
              href={websiteConfig.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='linked-in redirects'
              className='hover:text-footerText text-white'
            >
              <Linkedin className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </ScreenWrapper>

      <ScreenWrapper className='border-t border-gray-500'>
        <div className='py-5 lg:py-7'>
          <p className='text-center text-gray-300'>SeaNeb © {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </ScreenWrapper>
    </footer>
  )
}

export default memo(Footer)
