'use client'

import { AnimatePresence, motion } from 'motion/react'

import PopularAreas from '@/views/city/popular-area'
import ListingGrid from '@/views/listing/grid'

import { PublicLocalityItem } from '@/services/apis/types'

interface CityComponentProps {
  country: string
  city: string
  areas: PublicLocalityItem[]
  category?: string
  selectedArea: string | null
}

const CityComponent = ({ country, city, areas, category, selectedArea }: CityComponentProps) => {
  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedArea} // key helps AnimatePresence track changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={!areas?.length ? 'flex min-h-[50vh] w-full items-center justify-center' : undefined}
        >
          <ListingGrid city={city} selectedArea={selectedArea || ''} category={category || ''} areas={areas} country={country} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default CityComponent
