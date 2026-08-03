import { fetchPublicBusinessBySeanebId } from '@/services/apis'
import NotFoundPage from '@/app/not-found'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import BusinessReviews from '@/views/business/view/reviews'
import SidebarCards from './sidebar-cards'
import { generatePublicImageBusinessLink } from '@/lib/utils'
import { MapPin, ArrowLeft, Star, MessageSquare, BadgeCheck, Facebook, Link as LinkIcon, Info, Users } from 'lucide-react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { Phone } from 'lucide-react'
import dayjs from 'dayjs'

export default async function BusinessReviewsPage({
  params
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const slug = decodeURIComponent(country || '')

  const response = await fetchPublicBusinessBySeanebId(slug)
  const businessData = response?.data

  if (!businessData?.branch_id) {
    return <NotFoundPage />
  }

  // Use reviews from the business data response directly
  const reviewsList = Array.isArray(businessData?.reviews) ? businessData.reviews : []

  // Use review_summary from business data for consistent rating display
  const actualTotalReviews = Number(businessData?.review_summary?.total_reviews || reviewsList.length)
  const actualAverageRating = businessData?.review_summary?.average_rating
    ? Number(businessData.review_summary.average_rating).toFixed(1)
    : (reviewsList.length > 0
      ? (reviewsList.reduce((sum: number, review: any) => sum + Number(review?.rating || 0), 0) / reviewsList.length).toFixed(1)
      : '0.0')

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      
      {/* 1. Dark Header Banner */}
      <div className="bg-[#0f111a] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2"></div>
        
        <ScreenWrapper className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white rounded-2xl p-1.5 overflow-hidden">
              <img
                src={businessData?.branch_logo 
                  ? generatePublicImageBusinessLink(businessData.branch_logo)
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(businessData?.business?.display_name || businessData?.branch_name || 'Business')}&background=random&size=128`
                }
                alt="Business Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {businessData?.business?.display_name || businessData?.branch_name}
              </h1>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{businessData?.location?.area?.area_name}, {businessData?.location?.city?.city_name}, {businessData?.location?.state?.state_name}</span>
              </div>
              
              <div className="flex items-center gap-3 pt-1 text-sm font-medium">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(actualAverageRating)) ? 'fill-yellow-500' : 'text-gray-600'}`} />
                  ))}
                  <span className="ml-2 text-white">{actualAverageRating}</span>
                </div>
                <span className="text-gray-400">({actualTotalReviews} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[200px] backdrop-blur-sm">
            <span className="text-gray-300 text-sm font-medium mb-1">Overall Rating</span>
            <div className="text-4xl font-bold text-white mb-2">{actualAverageRating}</div>
            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(actualAverageRating)) ? 'fill-yellow-500' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-gray-400 text-sm">{actualTotalReviews} Reviews</span>
          </div>

        </ScreenWrapper>
      </div>
      
      {/* 2. Main Content Area */}
      <ScreenWrapper className="py-8">
        <Link 
          href={`/${slug}`} 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Business
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Reviews */}
          <div className="lg:col-span-8">
            <BusinessReviews testimonials={reviewsList} />
          </div>

          {/* Right Column - Sidebars */}
          <div className="lg:col-span-4 space-y-6">
            <SidebarCards businessData={businessData} />
          </div>
        </div>
      </ScreenWrapper>
    </div>
  )
}
