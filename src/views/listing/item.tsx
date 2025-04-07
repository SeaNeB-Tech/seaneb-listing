'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Heart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface VenueCardProps {
  id: string
  title: string
  selectedArea: string
  legalName: string
  location: string
  rating: number
  date?: string
  price?: string
  imageUrl: string
}

export default function VenueCard(props: VenueCardProps) {
  const { title, selectedArea, legalName, location, rating, date, price, imageUrl } = props
  const router = useRouter()
  const pathname = usePathname()

  const [isFavorite, setIsFavorite] = useState(false)

  // Determine rating color based on score
  const getRatingColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-500'
    if (score >= 3.5) return 'bg-yellow-500'

    return 'bg-orange-500'
  }

  return (
    <div
      onClick={() => router.push(`${pathname}/${selectedArea}/${legalName}`)}
      className='relative h-[240px] cursor-pointer overflow-hidden rounded-md shadow-xl transition-transform duration-300 hover:scale-105'
    >
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image src={imageUrl || '/placeholder.svg'} alt={legalName} fill className='object-cover' priority />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
      </div>

      {/* Rating Badge */}
      {rating && (
        <div
          className={`absolute top-4 left-4 ${getRatingColor(rating)} flex h-10 w-10 items-center justify-center rounded-full font-bold text-white`}
        >
          {rating}
        </div>
      )}

      {/* Date Badge */}
      {date && (
        <div className='absolute top-4 right-4 text-right text-white'>
          <p className='font-medium'>{date}</p>
        </div>
      )}

      {/* Content */}
      <div className='absolute bottom-0 left-0 w-full p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            {title && <h3 className='flex items-center gap-1 text-xl font-bold'>{title}</h3>}
            {location && <p className='text-sm opacity-90'>{location}</p>}
            {price && <p className='text-lg font-medium'>{price}</p>}
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
