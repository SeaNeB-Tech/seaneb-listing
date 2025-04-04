import BusinessViewCarousel from '@/views/business/carousel'
import BusinessDetails from '@/views/business/view'
import React from 'react'

interface BusinessProps {
  params: Promise<{ city: string; category: string; business: string }>
}

const BusinessDetailsPage = async ({ params }: BusinessProps) => {
  const { city, category, business } = await params

  return (
    <>
      <BusinessViewCarousel />
      <BusinessDetails />
    </>
  )
}

export default BusinessDetailsPage
