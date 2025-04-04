'use client'

import React, { useState } from 'react'

import PopularAreas from '@/views/city/popular-area'
import ListingGrid from '@/views/listing/grid'

const CityComponent = ({ city }: { city: string }) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  return (
    <>
      <PopularAreas city={city} setSelectedArea={setSelectedArea} selectedArea={selectedArea} />
      {selectedArea && <ListingGrid selectedArea={selectedArea} />}
    </>
  )
}

export default CityComponent
