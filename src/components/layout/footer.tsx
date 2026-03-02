'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter
} from "react-icons/fa6"

import Logo from '@images/logo/logo-white.png'
import { websiteConfig } from '@/config/website-config'
import { footerLinks } from '@/config/footer-links'

import { Mail, Phone, ChevronDown } from 'lucide-react'
import { memo, useState } from 'react'
import ScreenWrapper from '../wrapper/screen-wrapper'

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  twitter_x: FaXTwitter
} as const

function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
  }

  return (
    <footer className='bg-black text-white'>
      <ScreenWrapper className='py-5'>
        <div>
          {/* Logo */}
          <div className='flex justify-center'>
            <Link href='/' className='mb-6 inline-block'>
              <Image
                src={Logo}
                alt='Logo'
                width={240}
                height={240}
                loading='lazy'
                sizes='100vw'
                className='h-auto w-56'
              />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid gap-x-14 gap-y-10 mb-12 text-[15px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">

            {/* Dynamic Accordion Sections */}
            {Object.entries(footerLinks).map(([section, links]) => {
              const title =
                section === 'legal'
                  ? 'Legal'
                  : section === 'product'
                  ? 'Help & Support'
                  : section

              const isOpen = openSection === section

              return (
                <div key={section}>
                  {/* Heading */}
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between font-semibold mb-3 text-white text-base tracking-wide"
                  >
                    {title}

                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Content */}
                  <ul
                    className={`overflow-hidden transition-all duration-300 ease-in-out space-y-2.5 text-gray-400 ${
                      isOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {links.map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-white transition leading-6"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Contact (Accordion Too) */}
            <div>
              <button
                onClick={() => toggleSection('contact')}
                className="w-full flex items-center justify-between font-semibold mb-3 text-white text-base tracking-wide"
              >
                Contact
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openSection === 'contact' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out space-y-3 text-gray-400 ${
                  openSection === 'contact'
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <Link
                    href={`mailto:${websiteConfig.email}`}
                    className="hover:text-white"
                  >
                    {websiteConfig.email}
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <Link
                    href={`tel:${websiteConfig.call}`}
                    className="hover:text-white"
                  >
                    {websiteConfig.call}
                  </Link>
                </div>
              </div>
            </div>

            {/* Social (Accordion Too) */}
            <div>
              <button
                onClick={() => toggleSection('social')}
                className="w-full flex items-center justify-between font-semibold mb-3 text-white text-base tracking-wide"
              >
                Follow Us
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openSection === 'social' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === 'social'
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex gap-3 mb-4">
                  {(Object.entries(
                    websiteConfig.social ?? {}
                  ) as [string, string][]).map(
                    ([key, href]) => {
                      const Icon =
                        SOCIAL_ICONS[
                          key as keyof typeof SOCIAL_ICONS
                        ]
                      if (!Icon) return null

                      return (
                        <Link
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 p-3 hover:bg-white/20 transition"
                        >
                          <Icon size={20} />
                        </Link>
                      )
                    }
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={websiteConfig.appstore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/logo/app-store.svg"
                      alt="Download on App Store"
                      width={140}
                      height={44}
                    />
                  </Link>

                  <Link
                    href={websiteConfig.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/logo/google-play-store.png"
                      alt="Get it on Google Play"
                      width={155}
                      height={55}
                    />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ScreenWrapper>

      {/* Bottom bar */}
      <ScreenWrapper className='border-t border-gray-500'>
        <div className='py-5 lg:py-7'>
          <p className='text-center text-gray-300'>
            <Link href={websiteConfig?.website}>SeaNeB</Link> ©{' '}
            {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </ScreenWrapper>
    </footer>
  )
}

export default memo(Footer)