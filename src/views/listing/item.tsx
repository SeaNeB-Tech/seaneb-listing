'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import { generatePublicImageBusinessLink } from '@/lib/utils'
import { PublicBusinessListingItem } from '@/services/apis/types'
import { isValidImageUrl, toUrlName } from '@/utils'
import { Heart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface VenueCardProps {
  business: PublicBusinessListingItem
  selectedArea: string
  citySlug: string
}

const DEFAULT_IMAGE = '/images/pages/home/poster.png'

export default function VenueCard(props: VenueCardProps) {
  const { business, selectedArea, citySlug } = props

  const { display_name, category_name, seaneb_id, area_name, average_rating } = business
  const router = useRouter()

  const [isFavorite, setIsFavorite] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE)

  // Determine rating color based on score
  const getRatingColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-500'
    if (score >= 3.5) return 'bg-yellow-500'

    return 'bg-orange-500'
  }

  const category = useMemo(() => {
    return category_name || ''
  }, [category_name])

  const businessImage = useCallback(async () => {
    if (business?.thumbnail) {
      const imgUrl = generatePublicImageBusinessLink(business.thumbnail)
      const valid = await isValidImageUrl(imgUrl)

      if (valid) {
        return setImageUrl(imgUrl)
      } else {
        return setImageUrl(DEFAULT_IMAGE)
      }
    }

    return setImageUrl(DEFAULT_IMAGE)
  }, [business])

  const pathname = usePathname()

  const redirectRoute = useMemo(() => {
    const safeToUrl = (str: string) => {
      if (!str) return ''
      return decodeURIComponent(str).toLowerCase().replace(/[\s_]+/g, '-')
    }
    
    const slugId = safeToUrl(seaneb_id)

    return `/${slugId}`
  }, [seaneb_id])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.prefetch(redirectRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    businessImage()
  }, [businessImage])

  return (
    <div
      onClick={() => router.push(redirectRoute)}
      className='relative h-[240px] cursor-pointer overflow-hidden rounded-md shadow-xl transition-transform duration-300 hover:scale-105'
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <Image 
          src={imageUrl} 
          alt={display_name} 
          fill 
          className={imageUrl === DEFAULT_IMAGE ? 'object-cover' : 'object-contain'} 
          priority 
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none'></div>
      </div>

      {/* Rating Badge */}
      {!!average_rating && (
        <div
          className={`absolute top-4 left-4 ${getRatingColor(Number(average_rating))} flex h-10 w-10 items-center justify-center rounded-full font-bold text-white`}
        >
          {average_rating}
        </div>
      )}

      {/* Content */}
      <div className='absolute bottom-0 left-0 w-full p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            {display_name && <h3 className='flex items-center gap-1 text-xl font-bold'>{display_name}</h3>}
            {(area_name || citySlug) && <p className='text-sm opacity-90'>{area_name || citySlug}</p>}
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
