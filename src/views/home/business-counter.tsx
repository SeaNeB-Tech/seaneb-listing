'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import BusinessImg from '@images/marketing/seaneb-offers-ui.svg'

const BusinessCounter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const cachedStr = localStorage.getItem('business_count_cache')
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr)
            if (cached.timestamp && (Date.now() - cached.timestamp < 24 * 60 * 60 * 1000)) {
              animateCount(cached.count)
              return
            }
          } catch (e) {
            // ignore cache parse errors
          }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/businesses/count`)
        const data = await res.json()
        const total = data?.data?.total_businesses || 251
        
        localStorage.setItem('business_count_cache', JSON.stringify({
           count: total,
           timestamp: Date.now()
        }))
        
        animateCount(total)
      } catch (err) {
        animateCount(251)
      }
    }

    const animateCount = (end: number) => {
      let start = 0
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
    }

    fetchTotal()
  }, [])

  return (
    <section className="relative  left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16 bg-gradient-to-r from-[#f5f3f0] via-[#f7f7f7] to-[#f3e6e3]">
      <div className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Our Growth
            </p>

            <h3 className="mt-2 text-5xl md:text-7xl font-extrabold text-red-600">
              {count}+
            </h3>

            <p className="mt-3 text-lg font-medium text-gray-800">
              Businesses Registered with Seaneb
            </p>

            <p className="text-sm text-gray-500">
              Trusted by local entrepreneurs across regions
            </p>

            <div className="mt-6 w-12 h-[2px] bg-red-500" />

            <h2 className="mt-6 text-3xl md:text-5xl font-semibold text-gray-900">
              Local Businesses <br />
              <span className="text-red-600 font-bold">
                Growth Partner
              </span>
            </h2>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-[220px] md:w-[280px]">
              <Image
                src={BusinessImg}
                alt="Seaneb mobile interface"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default BusinessCounter