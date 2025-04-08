'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { areaListArray, AreaListItem } from '@/data/areas'
import { cn } from '@/lib/utils'
import { capitalizeFirstLetter } from '@/utils'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'

interface Props {
  city: string
  selectedArea: string | null
  setSelectedArea: (v: string | null) => void
}

interface AreaItemProps {
  area: AreaListItem
  selectedArea: string | null
  setSelectedArea: (v: string | null) => void
}

const fadeVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

const AreaItem = ({ area, selectedArea, setSelectedArea }: AreaItemProps) => {
  return (
    <motion.div
      layout
      variants={fadeVariant}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={cn(
        'bg-background border-primary text-primary flex cursor-pointer items-center justify-center rounded-full border-2 px-2 py-1 md:px-3',
        selectedArea === area?.u_id ? 'bg-primary text-background' : 'text-primary'
      )}
      onClick={() => (selectedArea === area?.u_id ? setSelectedArea(null) : setSelectedArea(area?.u_id))}
    >
      <p className='text-center text-sm font-medium tracking-wide md:text-base'>{area?.name}</p>
      {selectedArea === area?.u_id && <X className='ml-2 size-4' />}
    </motion.div>
  )
}

const PopularAreas = ({ city, selectedArea, setSelectedArea }: Props) => {
  const isSelected = useMemo(() => !!selectedArea, [selectedArea])

  const filteredAreas = useMemo(
    () => (isSelected ? areaListArray.filter(a => a.u_id === selectedArea) : areaListArray),
    [selectedArea, areaListArray]
  )

  return (
    <ScreenWrapper
      className={cn(
        'space-y-6 py-10 transition-all duration-300 lg:py-20',
        isSelected ? 'lg:pt-10 lg:pb-0' : 'min-h-[50vh]'
      )}
    >
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h2 className='after:bg-secondary relative text-3xl whitespace-normal after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular localities in <b>{capitalizeFirstLetter(city) || ''}</b>
        </h2>
      </div>

      <motion.div layout className='flex w-full flex-wrap items-center gap-2'>
        <AnimatePresence mode='wait'>
          {filteredAreas.map(area => (
            <AreaItem key={area.u_id} area={area} setSelectedArea={setSelectedArea} selectedArea={selectedArea} />
          ))}
        </AnimatePresence>
      </motion.div>
    </ScreenWrapper>
  )
}

export default PopularAreas
