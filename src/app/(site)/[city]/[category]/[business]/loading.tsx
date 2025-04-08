import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex min-h-[90vh] w-full items-center justify-center p-3'>
      <div className='spinner relative size-12'>
        <div className='spinner1 absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2'></div>
      </div>
    </div>
  )
}

export default LoadingPage
