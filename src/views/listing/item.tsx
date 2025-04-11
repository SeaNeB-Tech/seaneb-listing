'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import { Daum } from '@/services/apis/types'
import { Heart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { generatePublicImageBusinessLink } from '@/lib/utils'
import { isValidImageUrl, toUrlName } from '@/utils'

interface VenueCardProps {
  business: Daum
  selectedArea: string
}

const DEFAULT_IMAGE = '/images/pages/home/banner-image-1.jpg'

export default function VenueCard(props: VenueCardProps) {
  const { business } = props

  const { business_name, business_legal_name, city, avg_rating } = business
  const router = useRouter()
  const pathname = usePathname()

  const [isFavorite, setIsFavorite] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE)

  // Determine rating color based on score
  const getRatingColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-500'
    if (score >= 3.5) return 'bg-yellow-500'

    return 'bg-orange-500'
  }

  const category = useMemo(() => {
    const categories = business?.business_category?.split(',')

    return categories?.[0] || ''
  }, [business?.business_category])

  const businessImage = useCallback(async () => {
    if (!!business?.shop_galleries?.[0]?.link && !!business?.country && !!business?.state && !!business?.city) {
      return setImageUrl(generatePublicImageBusinessLink(business, business?.shop_galleries?.[0]?.link))
    }

    if (business?.icon) {
      const valid = await isValidImageUrl(business?.icon)

      if (valid) {
        return setImageUrl(business?.icon)
      } else {
        return setImageUrl(DEFAULT_IMAGE)
      }
    }

    return setImageUrl(DEFAULT_IMAGE)
  }, [business])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.prefetch(toUrlName(`${pathname}/${category}/${business_legal_name}`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    businessImage()
  }, [businessImage])

  return (
    <div
      onClick={() => router.push(toUrlName(`${pathname}/${category}/${business_legal_name}`))}
      className='relative h-[240px] cursor-pointer overflow-hidden rounded-md shadow-xl transition-transform duration-300 hover:scale-105'
    >
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image src={imageUrl} alt={business_legal_name} fill className='object-cover' priority />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
      </div>

      {/* Rating Badge */}
      {!!avg_rating && (
        <div
          className={`absolute top-4 left-4 ${getRatingColor(avg_rating)} flex h-10 w-10 items-center justify-center rounded-full font-bold text-white`}
        >
          {avg_rating}
        </div>
      )}

      {/* Content */}
      <div className='absolute bottom-0 left-0 w-full p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            {business_name && <h3 className='flex items-center gap-1 text-xl font-bold'>{business_name}</h3>}
            {city && <p className='text-sm opacity-90'>{city}</p>}
          </div>
          <button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className='text-white transition-colors hover:text-pink-500'
            aria-label='Add to favorites'
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'fill-transparent'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
