import React from 'react'
import { Metadata } from 'next'

import { constructMetadata } from '@/lib/utils'

export const metadata: Metadata = constructMetadata({
  title: '404',
  description: 'Page Not Found'
})

const NotFoundPage = () => {
  return (
    <div className='flex h-[90vh] flex-col items-center justify-center'>
      <p className='text-9xl font-bold text-gray-400'>404</p>
      <p>Page Not Found</p>
    </div>
  )
}

export default NotFoundPage
