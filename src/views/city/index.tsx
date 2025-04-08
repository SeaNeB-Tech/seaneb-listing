'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import PopularAreas from '@/views/city/popular-area'
import ListingGrid from '@/views/listing/grid'

const CityComponent = ({ city }: { city: string }) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  return (
    <>
      <PopularAreas city={city} setSelectedArea={setSelectedArea} selectedArea={selectedArea} />

      <AnimatePresence mode='wait'>
        {selectedArea && (
          <motion.div
            key={selectedArea} // key helps AnimatePresence track changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ListingGrid city={city} selectedArea={selectedArea} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CityComponent
