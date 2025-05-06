'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { cn } from '@/lib/utils'
import { capitalizeFirstLetter, toUrlName } from '@/utils'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
  city: string
  category?: string
  areas: string[]
  selectedArea: string | null
}

interface AreaItemProps {
  area: string
  selectedArea: string | null
  /* eslint-disable-next-line no-unused-vars */
  handleAreaSelect: (v: string) => void
}

const fadeVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

const AreaItem = ({ area, selectedArea, handleAreaSelect }: AreaItemProps) => {
  const isSelected = useMemo(() => toUrlName(selectedArea || '') === toUrlName(area), [selectedArea, area])

  return (
    <motion.div
      layout
      variants={fadeVariant}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={cn(
        'bg-background border-primary text-primary flex cursor-pointer items-center justify-center rounded-full border-2 px-2 py-1 md:px-3',
        isSelected ? 'bg-primary text-background' : 'text-primary'
      )}
      onClick={() => handleAreaSelect(area)}
    >
      <p className='text-center text-sm font-medium tracking-wide capitalize md:text-base'>{area}</p>
      {isSelected && <X className='ml-2 size-4' />}
    </motion.div>
  )
}

const PopularAreas = ({ city, selectedArea, category, areas }: Props) => {
  // ** Hooks
  const router = useRouter()
  const isSelected = useMemo(() => !!selectedArea, [selectedArea])

  const filteredAreas = useMemo(
    () =>
      isSelected
        ? areas.filter(a => toUrlName(a) === toUrlName(selectedArea || '') && !!a?.length)
        : areas?.filter(v => !!v?.length),
    [selectedArea, isSelected, areas]
  )

  // ** Functions
  const handleAreaSelect = (area: string) => {
    if (toUrlName(area) !== toUrlName(selectedArea || '')) {
      const pushURL = toUrlName(`/${area}-in-${city}`) + (category ? toUrlName(`/${category}`) : '')
      console.log('pushURL :', pushURL)
      router.push(pushURL)
    } else {
      const pushURL = `/${city}` + (category ? toUrlName(`/${category}`) : '')
      router.push(pushURL)
    }
  }

  return (
    <ScreenWrapper
      className={cn('space-y-6 py-10 transition-all duration-300 lg:py-20', isSelected ? 'lg:pt-10 lg:pb-0' : '')}
    >
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h3 className='after:bg-secondary relative text-3xl whitespace-normal after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular localities in <b>{capitalizeFirstLetter(city) || ''}</b>
        </h3>
      </div>

      <motion.div layout className='flex w-full flex-wrap items-center gap-2'>
        <AnimatePresence mode='wait'>
          {filteredAreas.map(area => (
            <AreaItem key={area} area={area} handleAreaSelect={handleAreaSelect} selectedArea={selectedArea} />
          ))}
        </AnimatePresence>
      </motion.div>
    </ScreenWrapper>
  )
}

export default PopularAreas
