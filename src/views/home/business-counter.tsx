'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import BusinessImg from '@images/marketing/seaneb-offers-ui.svg'

const BusinessCounter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = 251
    const duration = 2000
    const interval = 16
    const step = Math.ceil(end / (duration / interval))

    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className='relative overflow-hidden bg-white py-16 md:py-24'>
      <div className='mx-auto max-w-6xl px-6'>
        {/* ===== Top Grid ===== */}
        <div className='grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-6'>
          {/* Left Content */}
          <div className='order-2 text-center md:order-1 md:text-left'>
            <div className='mx-auto mb-4 h-px w-16 bg-gray-200 md:mx-0' />

            <h3 className='bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl'>
              {count}+
            </h3>

            <p className='mt-3 text-base font-medium text-gray-700 md:text-xl'>Businesses Registered with SeaNeB</p>

            <p className='mt-1 text-sm text-gray-500'>And growing every day</p>
          </div>

          {/* Right Phone */}
          <div className='order-1 flex justify-center md:order-2 md:justify-end'>
            <div className='w-[170px] md:w-[220px]'>
              <Image
                src={BusinessImg}
                alt='SeaNeB mobile interface'
                className='h-auto w-full object-contain drop-shadow-2xl'
                priority
              />
            </div>
          </div>
        </div>
        <div className='mt-8 text-center md:mt-8'>
          {/* Rays */}
          <div className='flex justify-center'>
            <svg width='220' height='100' viewBox='0 0 220 100' fill='none'>
              <path d='M110 8 L110 38' stroke='#F59E0B' strokeWidth='5' strokeLinecap='round' />
              <path d='M80 15 L100 45' stroke='#F59E0B' strokeWidth='5' strokeLinecap='round' />
              <path d='M140 15 L120 45' stroke='#F59E0B' strokeWidth='5' strokeLinecap='round' />
              <path d='M45 45 L85 60' stroke='#F59E0B' strokeWidth='5' strokeLinecap='round' />
              <path d='M175 45 L135 60' stroke='#F59E0B' strokeWidth='5' strokeLinecap='round' />
            </svg>
          </div>

          {/* Headline */}
          <h2 className='text-3xl leading-tight font-semibold text-gray-900 md:text-5xl'>
            <span className='block'>Local Businesses</span>
            <span className='font-bold heading-gradient'>Growth Partner</span>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default BusinessCounter
