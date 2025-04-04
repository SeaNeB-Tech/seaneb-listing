import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import React from 'react'

const BusinessDetails = () => {
  return (
    <ScreenWrapper className='grid grid-cols-12 py-10 lg:py-20'>
      {/* Left Side View */}
      <div className='col-span-8'>
        <h2 className='text-3xl font-medium'>Burger House</h2>
      </div>
    </ScreenWrapper>
  )
}

export default BusinessDetails
