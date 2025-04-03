'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import Logo from '@images/logo/logo-white.png'

import { websiteConfig } from '@/config/website-config'
import { routes } from '@/constants/routes'

import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

type FooterLink = {
  label: string
  link: string
}

export default function Footer() {
  const pathname = usePathname()

  const explore: FooterLink[] = [
    { label: 'Home', link: routes.home },
    
  ]

  const provideLinks: any[] = [
    { label: 'UI / UX Design' },
    { label: 'App Development' },
    { label: 'eCommerce app & website' },
    { label: 'Website Development' },
    { label: 'Custom ERP' },
    { label: 'SEO / Analytics' }
  ]

  const isActiveLink = (path: string) => {
    return pathname === path
  }

  return (
    <footer className='bg-[#202429] text-white'>
      <div className='container mx-auto pb-8 lg:pt-16'>
        <div className='grid grid-cols-1 gap-5 pt-8 lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Link href='/' className='mb-6 inline-block'>
              <Image src={Logo} alt='Logo' width={240} height={240} className='h-auto w-56' />
            </Link>
          </div>

          <div className='flex flex-col justify-between lg:col-span-8'>
            <div className='mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
              <div>
                <h4 className='mb-4 text-base font-bold text-white'>Explore</h4>
                <ul className='grid grid-cols-1 gap-2'>
                  {explore?.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        aria-label='explore'
                        className={cn(
                          'animated-underline hover:text-footerText text-sm text-gray-400',
                          isActiveLink(item.link) && 'text-footerText font-semibold opacity-100'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className='mb-4 text-base font-bold text-white'>Provide</h4>
                <ul className='grid grid-cols-1 gap-2'>
                  {provideLinks?.map((item, index) => (
                    <li key={index}>
                      <p aria-label='provideLinks' className={cn('hover:text-footerText text-sm text-gray-400')}>
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='md:col-span-2'>
                <ul className='mb-5 space-y-4'>
                  <li className='flex items-center'>
                    <Mail className='mr-3 h-5 w-5 shrink-0 text-xs text-white md:text-base' />
                    <Link
                      href={`mailto:̦${websiteConfig.email}`}
                      className='animated-underline hover:text-footerText text-sm font-semibold text-gray-300 md:text-lg'
                    >
                      {websiteConfig.email}
                    </Link>
                  </li>
                  <li className='flex items-center'>
                    <Phone className='mr-3 h-5 w-5 text-xs text-white md:text-base' />
                    <Link
                      href={`tel:${websiteConfig.call}`}
                      className='animated-underline hover:text-footerText text-sm font-semibold text-gray-300 md:text-lg'
                    >
                      {websiteConfig.call}
                    </Link>
                  </li>
                </ul>
                <div className='flex space-x-4'>
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
            </div>

            {/* <div className='flex flex-col items-start lg:flex-row lg:items-center'>
              <h4 className='mb-3 mr-4 whitespace-nowrap text-base font-bold text-white lg:mb-0'>
                Subscribe to Newsletter:
              </h4>
              <div className='flex w-full items-center justify-center gap-2'>
                <input
                  type='email'
                  placeholder='Email Address'
                  className='flex-1 rounded border-0 bg-white p-3 text-base text-gray-900'
                />
                <Button className='px-6 py-6 font-bold'>Go</Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className='container mx-auto border-t border-gray-500'>
        <div className='py-5 lg:py-12'>
          <p className='text-center text-gray-500'>
            Codentic Software © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
