'use client'

import { memo } from 'react'
import { Check, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utils'

interface ReviewProps {
  name: string
  date: string
  content: string
  rating: number
  isVerified?: boolean
  avatarSrc?: string
  isLast?: boolean
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
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

export const Review = memo(({ name, date, content, rating, isVerified, avatarSrc, isLast }: ReviewProps) => {
  return (
    <div className={`p-6 sm:p-8 transition-colors hover:bg-gray-50/30 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className='flex items-start gap-4'>
        <Avatar className='h-12 w-12 sm:h-14 sm:w-14 shrink-0'>
          <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
          <AvatarFallback className='bg-pink-600 text-white font-medium text-lg'>{getInitials(name)}</AvatarFallback>
        </Avatar>
        
        <div className='flex-1 w-full'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-4'>
            <div>
              <div className='flex items-center gap-1.5'>
                <h4 className='font-bold text-gray-900'>{name}</h4>
                {isVerified && (
                  <span className='flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm'>
                    <Check className='h-2.5 w-2.5 stroke-[3]' />
                  </span>
                )}
              </div>
              <p className='text-sm text-gray-500 mt-0.5'>{date}</p>
            </div>
            <div className="mt-1 sm:mt-0">
              <StarRating rating={rating} />
            </div>
          </div>
          
          <div className='mt-3 mb-4'>
            <div className='text-sm sm:text-base text-gray-700 bg-[#F9FAFB] rounded-xl p-4 border border-gray-100'>
              {content || "No review text provided."}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
})
