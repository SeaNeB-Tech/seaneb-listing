'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { generatePublicImageUserLink } from '@/lib/utils'
import { BusinessDetailsAPIResponse, TestimonialItem } from '@/types/business'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import React from 'react'
import LocationMap from './basic/map'
import BusinessRating from './basic/rating'
import BusinessReviews from './reviews'
import { FaWhatsapp } from 'react-icons/fa'

interface BusinessDetailsProps {
  businessData: BusinessDetailsAPIResponse
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
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-semibold">
              {businessData?.business_name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {businessData?.area}, {businessData?.city}, {businessData?.state}
            </div>

            <div className="mt-3">
              <BusinessRating businessData={businessData} />
            </div>
          </div>

          {/* Contact */}
          <Card title="Contact Information">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">

              {businessData?.contact_no && (
                <a href={`tel:${businessData.contact_no}`} className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="font-medium">{businessData.contact_no}</span>
                </a>
              )}

              {businessData?.email && (
                <a href={`mailto:${businessData.email}`} className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <span>{businessData.email}</span>
                </a>
              )}
            </div>
          </Card>

          {/* Location */}
          {businessData?.latitude && businessData?.longitude && (
            <Card title="Location">
              <LocationMap lat={businessData.latitude} long={businessData.longitude} />
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
          <Card title="Business Owner">
            {businessData?.users_businesses?.map(user => (
              <div key={user?.u_id} className="space-y-4">

                {/* Profile */}
                <div className="flex items-start gap-3">
                  <img
                    src={generatePublicImageUserLink(user?.user?.image + '-140x140.png')}
                    className="h-12 w-12 rounded-full object-cover border"
                  />

                  <div className="space-y-1">
                    <p className="font-semibold text-sm">
                      {user?.user?.full_name}
                    </p>

                    {user?.user?.email && (
                      <a
                        href={`mailto:${user?.user?.email}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {user?.user?.email}
                      </a>
                    )}

                    {user?.user?.mobile_no && (
                      <a
                        href={`tel:${user?.user?.mobile_no}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {user?.user?.mobile_no}
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${businessData?.whatsapp_no || user?.user?.mobile_no}`,
                        '_blank'
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp
                  </button>

                  {user?.user?.mobile_no && (
                    <a
                      href={`tel:${user?.user?.mobile_no}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium hover:bg-gray-100 transition"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                </div>

              </div>
            ))}
          </Card>

          {/* Business Details */}
          <Card title="Business Details">
            <div className="space-y-3 text-sm">
              {[
                { label: 'City', value: businessData?.city },
                { label: 'State', value: businessData?.state },
                { label: 'Country', value: businessData?.country }
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium capitalize">{item.value}</span>
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
                    title: businessData?.business_name,
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