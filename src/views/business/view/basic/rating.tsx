'use client'

import React, { useMemo } from 'react'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

import { BusinessDetailsAPIResponse } from '@/types/business'

const BusinessRating = ({ businessData }: { businessData: BusinessDetailsAPIResponse }) => {
  const avgRating = useMemo(() => Math.floor(Number(businessData?.avg_rating || 0)), [businessData?.avg_rating])

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
        {businessData?.avg_rating ? `(${businessData?.avg_rating} ratings)` : ''}
      </p>
    </div>
  )
}

export default BusinessRating
