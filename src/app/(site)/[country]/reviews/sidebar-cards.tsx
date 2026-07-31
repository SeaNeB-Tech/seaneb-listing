'use client'

import { Mail, Phone, Share2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { generatePublicImageUserLink } from '@/lib/utils'

const Card = ({ title, children }: any) => (
  <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
    <div className="border-b px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-50">
      {title}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function SidebarCards({ businessData }: { businessData: any }) {
  return (
    <>
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
              <span className="font-medium capitalize text-right">{item.value || 'N/A'}</span>
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
    </>
  )
}
