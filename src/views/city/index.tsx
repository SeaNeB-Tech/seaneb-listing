'use client'

import { AnimatePresence, motion } from 'motion/react'

import PopularAreas from '@/views/city/popular-area'
import ListingGrid from '@/views/listing/grid'

interface CityComponentProps {
  city: string
  areas: string[]
  category?: string
  selectedArea: string | null
}

const CityComponent = ({ city, areas, category, selectedArea }: CityComponentProps) => {
  return (
    <>
      <PopularAreas city={city} selectedArea={selectedArea} areas={areas} category={category} />

      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedArea} // key helps AnimatePresence track changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <ListingGrid city={city} selectedArea={selectedArea || ''} category={category || ''} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default CityComponent
