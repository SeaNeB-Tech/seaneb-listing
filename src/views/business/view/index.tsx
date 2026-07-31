'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { generatePublicImageUserLink, generatePublicImageBusinessLink } from '@/lib/utils'
import { PublicBusinessDetail } from '@/services/apis/types'
import { TestimonialItem } from '@/types/business'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import React from 'react'
import LocationMap from './basic/map'
import BusinessRating from './basic/rating'
import BusinessReviews from './reviews'
import { FaWhatsapp } from 'react-icons/fa'

interface BusinessDetailsProps {
  businessData: PublicBusinessDetail
  testimonials: TestimonialItem[]
}

/* 🔹 Reusable Card */
const Card = ({ title, children }: any) => (
  <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
    <div className="border-b px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-50">
      {title}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

const BusinessDetails = ({ businessData, testimonials }: BusinessDetailsProps) => {
  return (
    <div className="bg-gray-50">
      <ScreenWrapper className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-12">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {/* Header */}
          <div className="rounded-xl border bg-white p-5 shadow-sm flex items-start gap-5">
            <div className="flex-shrink-0">
              <img
                src={businessData?.branch_logo 
                  ? generatePublicImageBusinessLink(businessData.branch_logo)
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(businessData?.business?.display_name || businessData?.branch_name || 'Business')}&background=random&size=96`
                }
                alt="Business Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-contain border p-1 bg-white shadow-sm"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">
                {businessData?.business?.display_name || businessData?.branch_name}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {businessData?.location?.area?.area_name}, {businessData?.location?.city?.city_name}, {businessData?.location?.state?.state_name}
              </div>

              <div className="mt-3">
                <BusinessRating businessData={businessData} />
              </div>
            </div>
          </div>

          {/* Contact */}
          <Card title="Contact Information">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">

              {businessData?.contact?.primary_number && (
                <a href={`tel:${businessData.contact.primary_number}`} className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="font-medium">{businessData.contact.country_code} {businessData.contact.primary_number}</span>
                </a>
              )}

              {businessData?.contact?.business_email && (
                <a href={`mailto:${businessData.contact.business_email}`} className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <span>{businessData.contact.business_email}</span>
                </a>
              )}
            </div>
          </Card>

          {/* Location */}
          {businessData?.latitude && businessData?.longitude && (
            <Card title="Location">
              <LocationMap lat={businessData.latitude.toString()} long={businessData.longitude.toString()} />
            </Card>
          )}

          {/* Reviews */}
          {!!testimonials?.length && (
            <Card title="Customer Reviews">
              <BusinessReviews testimonials={testimonials} />
            </Card>
          )}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">

          {/* Owner */}
          {businessData?.owner && (businessData.owner.full_name || businessData.owner.first_name || businessData.owner.profile_picture) && (
            <Card title="Business Owner">
              <div className="space-y-4">
                {/* Profile */}
                <div className="flex items-start gap-3">
                  <img
                    src={businessData.owner?.profile_picture 
                      ? generatePublicImageUserLink(businessData.owner.profile_picture)
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(businessData.owner?.full_name || businessData.owner?.first_name || 'Owner')}&background=random`
                    }
                    className="h-12 w-12 rounded-full object-cover border"
                  />

                  <div className="space-y-1">
                    <p className="font-semibold text-sm">
                      {businessData.owner?.full_name || businessData.owner?.first_name || 'Owner'}
                    </p>

                    {businessData.owner?.email && (
                      <a
                        href={`mailto:${businessData.owner?.email}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {businessData.owner?.email}
                      </a>
                    )}

                    {businessData.owner?.mobile_number && (
                      <a
                        href={`tel:${businessData.owner?.mobile_number}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {businessData.owner?.mobile_number}
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${businessData?.contact?.whatsapp_country_code || ''}${businessData?.contact?.whatsapp_number || businessData?.contact?.primary_number}`,
                        '_blank'
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp
                  </button>

                  {businessData?.contact?.primary_number && (
                    <a
                      href={`tel:${businessData?.contact?.primary_number}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium hover:bg-gray-100 transition"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Business Details */}
          <Card title="Business Details">
            <div className="space-y-3 text-sm">
              {[
                { label: 'Area', value: businessData?.location?.area?.area_name },
                { label: 'City', value: businessData?.location?.city?.city_name },
                { label: 'State', value: businessData?.location?.state?.state_name },
                { label: 'Country', value: businessData?.location?.country?.country_name },
                { label: 'Address', value: businessData?.address }
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium capitalize">{item.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Share */}
          <Card title="Share Business">
            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: businessData?.business?.display_name || businessData?.branch_name,
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm hover:bg-gray-100"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </Card>

        </div>
      </ScreenWrapper>
    </div>
  )
}

export default BusinessDetails