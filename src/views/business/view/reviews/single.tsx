'use client'

import { memo } from 'react'

import { Check } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utils'

interface ReviewProps {
  name: string
  date: string
  content: string
  rating: number
  isVerified?: boolean
  avatarSrc?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

export const Review = memo(({ name, date, content, rating, isVerified, avatarSrc }: ReviewProps) => {
  return (
    <div className='py-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-16 w-16'>
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback className='bg-gray-200 text-gray-600'>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <div className='flex items-center gap-1.5'>
                <h3 className='font-medium text-gray-900'>{name}</h3>
                {isVerified && (
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white'>
                    <Check className='h-3 w-3' />
                  </span>
                )}
              </div>
              <p className='text-sm text-gray-500'>{date}</p>
            </div>
            <StarRating rating={rating} />
          </div>
          <p className='mt-3 text-gray-700'>{content}</p>
        </div>
      </div>
    </div>
  )
})
