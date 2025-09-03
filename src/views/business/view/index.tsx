'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'

import { generatePublicImageUserLink } from '@/lib/utils'
import { BusinessDetailsAPIResponse, TestimonialItem } from '@/types/business'
import { Facebook, Instagram, LinkIcon, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LocationMap from './basic/map'
import BusinessRating from './basic/rating'
import { HostCard } from './host-card'
import BusinessReviews from './reviews'

interface BusinessDetailsProps {
  businessData: BusinessDetailsAPIResponse
  testimonials: TestimonialItem[]
}

const LinkButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link
      href={href || `#`}
      className='flex cursor-pointer items-center gap-1.5 rounded-none border border-gray-300 bg-gray-100 px-2 py-2 text-xs text-black hover:bg-gray-300'
    >
      {children}
    </Link>
  )
}

const BusinessDetails = ({ businessData, testimonials }: BusinessDetailsProps) => {
  return (
    <ScreenWrapper className='grid grid-cols-1 gap-x-10 gap-y-10 py-10 lg:grid-cols-12 lg:py-20'>
      {/* Left Side View */}
      <div className='min-h-[30vh] lg:col-span-8 lg:min-h-[50vh]'>
        <h2 className='text-3xl font-medium'>{businessData?.business_name}</h2>
        <div className='mt-2 flex items-center gap-2'>
          <MapPin className='h-4 w-4 text-gray-500' />
          <p className='capitalize'>{`${businessData?.area}, ${businessData?.city}`?.toLowerCase()}</p>
        </div>
        <BusinessRating businessData={businessData} />

        {/* Links */}
        <div className='mt-4 flex flex-col justify-center gap-2 lg:mt-8'>
          {/* Contacts */}
          <div className='mt-2 flex flex-wrap sm:mt-0'>
            {businessData?.contact_no && (
              <LinkButton href={`tel:${businessData?.contact_no}`}>
                <Phone className='size-4' />
                {businessData?.contact_no}
              </LinkButton>
            )}
            {businessData?.email && (
              <LinkButton href={`mailto:${businessData?.email}`}>
                <Mail className='size-4' />
                {businessData?.email}
              </LinkButton>
            )}
            {businessData?.website_url && (
              <LinkButton href={businessData?.website_url}>
                <LinkIcon className='size-4' />
                {businessData?.website_url || 'www.example.com'}
              </LinkButton>
            )}
          </div>
          {/* Socials */}
          <div className='flex flex-wrap'>
            {businessData?.facebook_url && (
              <Link
                href={businessData?.facebook_url}
                className='flex items-center gap-1 bg-[#3b5998] px-3 py-1 text-white'
              >
                <Facebook className='h-4 w-4' />
                <span>Facebook</span>
              </Link>
            )}

            {businessData?.instagram_url && (
              <Link
                href={businessData?.instagram_url}
                className='flex items-center gap-1 bg-[#e1306c] px-3 py-1 text-white'
              >
                <Instagram className='h-4 w-4' />
                <span>Instagram</span>
              </Link>
            )}

            {businessData?.x_url && (
              <Link href={businessData?.x_url} className='flex items-center gap-1 bg-[#1da1f2] px-3 py-1 text-white'>
                <Twitter className='h-4 w-4' />
                <span>Twitter</span>
              </Link>
            )}
          </div>
        </div>

        {/* Map */}
        {businessData?.latitude && businessData?.longitude && (
          <LocationMap lat={businessData?.latitude} long={businessData?.longitude} />
        )}

        {!!testimonials?.length && <BusinessReviews testimonials={testimonials} />}
      </div>

      {/* Right Side View */}
      <div className='relative lg:col-span-4'>
        <div className='sticky top-24 flex flex-col items-center gap-4'>
          {businessData?.users_businesses?.map(user => (
            <HostCard
              key={user?.u_id}
              email={user?.user?.email}
              imageUrl={generatePublicImageUserLink(user?.user?.image + '-140x140.png')}
              name={user?.user?.full_name}
              phone={user?.user?.mobile_no}
              onSendMessage={() => {
                window.open(`https://wa.me/${businessData?.whatsapp_no || user?.user?.mobile_no}`, '_blank')
              }}
            />
          ))}
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default BusinessDetails
