'use client'

import React, { useMemo } from 'react'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

import { PublicBusinessDetail } from '@/services/apis/types'

const BusinessRating = ({ businessData }: { businessData: PublicBusinessDetail }) => {
  const avgRating = useMemo(() => Math.floor(Number(businessData?.review_summary?.average_rating || 0)), [businessData?.review_summary?.average_rating])

  return (
    <div className='mt-3 flex items-center gap-2'>
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              'size-5 text-transparent',
              index + 1 <= avgRating ? 'fill-orange-300 text-orange-300' : 'text-gray-300'
            )}
          />
        ))}
      </div>
      <p className='text-sm text-gray-600 capitalize'>
        {businessData?.review_summary?.average_rating ? `(${businessData?.review_summary?.total_reviews} ratings)` : 'Rating 0'}
      </p>
    </div>
  )
}

export default BusinessRating
