// ** React Imports
import React from 'react'

// ** Constants
import { color } from '@/constants/colors'

// ** Third Party Imports
import NextTopLoader from 'nextjs-toploader'

const NextProgress = () => {
  return (
    <NextTopLoader
      color={color.primary}
      initialPosition={0.1}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing='linear'
      speed={400}
      shadow={`'0 0 10px ${color.primary},0 0 5px ${color.primary}'`}
      zIndex={1600}
    />
  )
}

export default NextProgress
