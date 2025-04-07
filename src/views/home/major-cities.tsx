import React from 'react'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import Image from 'next/image'
import Link from 'next/link'

const CityItem = ({ city }: { city: string }) => {
  return (
    <Link href={`/${city}`} className='flex flex-col items-center justify-start rounded-lg p-1'>
      <div className='flex h-20 w-20 items-center justify-center rounded-lg p-3 md:h-24 md:w-24'>
        <Image
          width={90}
          height={90}
          src={`/images/city/icon.png`}
          alt={city}
          className='h-auto w-full rounded-lg object-contain p-2 shadow-lg shadow-black/30'
        />
      </div>
      <p className='text-center text-sm font-normal md:text-lg'>{city}</p>
    </Link>
  )
}

const MajorCities = ({ listCities }: { listCities: string[] }) => {
  return (
    <ScreenWrapper className='space-y-6 py-10'>
      {/* Title */}
      <div className='space-y-3'>
        <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Major Cities
        </h2>
        <p>Top cities</p>
      </div>

      <div className='grid w-full grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8'>
        {listCities?.map((city, index) => <CityItem key={index} city={city} />)}
      </div>
    </ScreenWrapper>
  )
}

export default MajorCities
