'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'

import { Button } from '@/components/ui/button'
import { generatePublicImageUserLink } from '@/lib/utils'
import { BusinessDetailsAPIResponse, TestimonialItem } from '@/types/business'
import { Facebook, Instagram, LinkIcon, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import LocationMap from './basic/map'
import BusinessRating from './basic/rating'
import { HostCard } from './host-card'
import BusinessReviews from './reviews'

interface BusinessDetailsProps {
  businessData: BusinessDetailsAPIResponse
  testimonials: TestimonialItem[]
}

const BusinessDetails = ({ businessData, testimonials }: BusinessDetailsProps) => {
  return (
    <ScreenWrapper className='grid grid-cols-1 gap-x-10 gap-y-10 py-10 lg:grid-cols-12 lg:py-20'>
      {/* Left Side View */}
      <div className='lg:col-span-8'>
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
              <Button className='cursor-pointer rounded-none border border-gray-300 bg-gray-100 text-xs text-black hover:bg-gray-300'>
                <Phone className='size-4' />
                {businessData?.contact_no}
              </Button>
            )}
            {businessData?.email && (
              <Button className='cursor-pointer rounded-none border border-gray-300 bg-gray-100 text-xs text-black hover:bg-gray-300'>
                <Mail className='size-4' />
                {businessData?.email}
              </Button>
            )}
            {businessData?.website_url && (
              <Button className='cursor-pointer rounded-none border border-gray-300 bg-gray-100 text-xs text-black hover:bg-gray-300'>
                <LinkIcon className='size-4' />
                {businessData?.website_url || 'www.example.com'}
              </Button>
            )}
          </div>
          {/* Socials */}
          <div className='flex flex-wrap'>
            <Link href='#' className='flex items-center gap-1 bg-[#3b5998] px-3 py-1 text-white'>
              <Facebook className='h-4 w-4' />
              <span>Facebook</span>
            </Link>

            <Link href='#' className='flex items-center gap-1 bg-[#ff0000] px-3 py-1 text-white'>
              <Youtube className='h-4 w-4' />
              <span>YouTube</span>
            </Link>

            <Link href='#' className='flex items-center gap-1 bg-[#e1306c] px-3 py-1 text-white'>
              <Instagram className='h-4 w-4' />
              <span>Instagram</span>
            </Link>

            <Link href='#' className='flex items-center gap-1 bg-[#25D366] px-3 py-1 text-white'>
              <MessageCircle className='h-4 w-4' />
              <span>WhatsApp</span>
            </Link>

            <Link href='#' className='flex items-center gap-1 bg-[#1da1f2] px-3 py-1 text-white'>
              <Twitter className='h-4 w-4' />
              <span>Twitter</span>
            </Link>
          </div>
        </div>

        {/* Map */}
        {businessData?.google_map_id && <LocationMap />}

        {!!testimonials?.length && <BusinessReviews testimonials={testimonials} />}
      </div>

      {/* Right Side View */}
      <div className='relative lg:col-span-4'>
        <div className='sticky top-24 flex flex-col items-center gap-4'>
          {businessData?.users_businesses?.map(user => (
            <HostCard
              key={user?.u_id}
              email={user?.user?.email}
              imageUrl={generatePublicImageUserLink('india', user?.users_u_id, user?.user?.image + '-140x140.png')}
              name={user?.user?.full_name}
              phone={user?.user?.mobile_no}
              onSendMessage={() => {
                console.log('Send message to', user?.user?.full_name)
              }}
            />
          ))}
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default BusinessDetails
