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

import { Mail, Phone } from 'lucide-react'
import { memo } from 'react'
import ScreenWrapper from '../wrapper/screen-wrapper'

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  twitter_x: FaXTwitter
} as const

function Footer() {
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
          <div className="grid gap-x-14 gap-y-12 mb-12 text-[15px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">

            {/* Dynamic sections */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="font-semibold mb-4 text-white text-base tracking-wide">
                  {section === 'legal' ? 'Legal' :
                   section === 'product' ? 'Help & Support' :
                   section}
                </p>

                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition leading-6">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <p className="font-semibold mb-3 text-white">Contact</p>

              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <Link href={`mailto:${websiteConfig.email}`} className="hover:text-white">
                    {websiteConfig.email}
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <Link href={`tel:${websiteConfig.call}`} className="hover:text-white">
                    {websiteConfig.call}
                  </Link>
                </div>
              </div>
            </div>

            {/* Social + Stores */}
            <div className="lg:justify-self-end">
              <p className="font-semibold mb-3 text-white">Follow Us</p>

              {/* Social icons */}
              <div className="flex gap-3 mb-4">
                {(Object.entries(websiteConfig.social ?? {}) as [string, string][])
                  .map(([key, href]) => {
                    const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS]
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
                  })}
              </div>

            {/* Store buttons */}
<div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">

  {/* App Store */}
  <Link
    href={websiteConfig.appstore}
    target="_blank"
    rel="noopener noreferrer"
    className="transition hover:opacity-80"
  >
    <div className="relative h-[44px] w-[140px]">
      <Image
        src="/images/logo/app-store.svg"
        alt="Download on App Store"
        fill
        className="object-contain"
      />
    </div>
  </Link>

  {/* Play Store — slightly wider */}
  <Link
    href={websiteConfig.playstore}
    target="_blank"
    rel="noopener noreferrer"
    className="transition hover:opacity-80"
  >
    <div className="relative h-[55px] w-[155px]">
      <Image
        src="/images/logo/google-play-store.png"
        alt="Get it on Google Play"
        fill
        className="object-contain scale-[1.08]"
      />
    </div>
  </Link>

</div>
            </div>

          </div>
        </div>
      </ScreenWrapper>

      {/* Bottom bar */}
      <ScreenWrapper className='border-t border-gray-500'>
        <div className='py-5 lg:py-7'>
          <p className='text-center text-gray-300'>
            <Link href={websiteConfig?.website}>SeaNeB</Link> © {new Date().getFullYear()}.
            {' '}All Rights Reserved.
          </p>
        </div>
      </ScreenWrapper>
    </footer>
  )
}

export default memo(Footer)