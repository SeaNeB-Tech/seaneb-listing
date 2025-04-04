import React from 'react'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { majorCitiesArray } from '@/data/major-cities'
import Image from 'next/image'
import Link from 'next/link'

const CityItem = ({ city }: { city: (typeof majorCitiesArray)[0] }) => {
  return (
    <Link href={`/${city.u_id}`} className='flex flex-col items-center justify-center rounded-lg p-1'>
      <div className='flex h-20 w-20 items-center justify-center rounded-lg md:h-24 md:w-24'>
        <Image
          width={90}
          height={90}
          src={city.image}
          alt={city?.name}
          className='h-auto w-full rounded object-contain shadow-md shadow-black/30'
        />
      </div>
      <p className='text-center text-sm font-normal md:text-lg'>{city.name}</p>
    </Link>
  )
}

const MajorCities = () => {
  return (
    <ScreenWrapper className='space-y-6 py-10'>
      {/* Title */}
      <div className='space-y-3'>
        <h2 className='after:bg-secondary relative w-max text-3xl after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Major Cities
        </h2>
        <p>Top cities</p>
      </div>

      <div className='grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8'>
        {majorCitiesArray?.map(city => <CityItem key={city?.u_id} city={city} />)}
      </div>
    </ScreenWrapper>
  )
}

export default MajorCities
