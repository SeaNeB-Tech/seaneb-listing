"use client"

import { TestimonialItem } from '@/types/business'
import { Review } from './single'
import { generatePublicImageUserLink } from '@/lib/utils'
import { MessageSquare, Edit3, ArrowDown } from 'lucide-react'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import emptyReviewAnimation from './empty-review.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const BusinessReviews = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-0">
        {(!testimonials || testimonials.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Lottie animationData={emptyReviewAnimation} loop={true} className="w-64 h-64 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews yet</h3>
          </div>
        ) : (
          testimonials?.map((item: any, index: number) => {
            const userObj = item?.User || item?.user || {};
            const userName = userObj.first_name ? `${userObj.first_name} ${userObj.last_name || ''}`.trim() : 'Anonymous';
            const userAvatar = userObj.avatar || userObj.image;
            const avatarUrl = userAvatar 
              ? generatePublicImageUserLink(userAvatar) 
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;
            return (
              <Review
                key={index}
                name={userName}
                content={item?.comment || item?.feedback}
                date={dayjs(item?.created_at).format('MMMM YYYY')}
                isVerified={false}
                avatarSrc={avatarUrl}
                rating={Number(item?.rating || 0)}
                isLast={index === testimonials.length - 1}
              />
            )
          })
        )}
      </div>

      {/* Load More Footer */}
      {testimonials?.length > 0 && (
        <div className="p-6 flex justify-center border-t border-gray-100">
          <button className="flex items-center justify-center gap-2 w-full max-w-sm border hover:bg-gray-50 text-blue-600 rounded-lg py-2.5 text-sm font-medium transition-colors">
            Load More <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default BusinessReviews
