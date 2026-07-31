'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { cn } from '@/lib/utils'
import { capitalizeFirstLetter, toUrlName } from '@/utils'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { PublicLocalityItem } from '@/services/apis/types'

interface Props {
  country: string
  city: string
  category?: string
  areas: PublicLocalityItem[]
  selectedArea: string | null
}

interface AreaItemProps {
  area: PublicLocalityItem
  selectedArea: string | null
  category?: string
  /* eslint-disable-next-line no-unused-vars */
  handleAreaSelect: (areaItem: PublicLocalityItem) => void
}

const fadeVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

const AreaItem = ({ area, selectedArea, category, handleAreaSelect }: AreaItemProps) => {
  const isSelected = useMemo(() => toUrlName(selectedArea || '') === toUrlName(area.area_slug), [selectedArea, area])

  return (
    <motion.button
      layout
      variants={fadeVariant}
      initial='hidden'
      animate='visible'
      exit='exit'
      onClick={() => handleAreaSelect(area)}
      className={cn(
        'group flex cursor-pointer items-center justify-between gap-3 rounded-full border px-4 py-2 transition-all duration-300',
        isSelected
          ? 'border-blue-200 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-blue-100 hover:bg-gray-50'
      )}
    >
      <span className={cn('text-sm font-semibold', isSelected ? 'text-blue-700' : 'text-gray-600')}>
        {area.area_name}
      </span>
      {isSelected && <X className='size-4 text-blue-700' />}
    </motion.button>
  )
}

const PopularAreas = ({ country, city, selectedArea, category, areas }: Props) => {
  // ** Hooks
  const router = useRouter()
  const isSelected = useMemo(() => !!selectedArea, [selectedArea])

  const filteredAreas = useMemo(
    () => {
      const activeAreas = areas?.filter(a => a.business_count > 0) || []
      return isSelected
        ? activeAreas.filter(a => toUrlName(a.area_slug) === toUrlName(selectedArea || '') && !!a.area_name?.length)
        : activeAreas.filter(v => !!v?.area_name?.length)
    },
    [selectedArea, isSelected, areas]
  )

  // ** Functions
  const handleAreaSelect = (areaItem: PublicLocalityItem) => {
    if (toUrlName(areaItem.area_slug) !== toUrlName(selectedArea || '')) {
      const areaSlug = `/${country}/${areaItem.area_slug}-${city}`
      const pushURL = areaSlug + (category ? toUrlName(`/${category}`) : '')
      router.push(pushURL)
    } else {
      const pushURL = `/${country}/${city}` + (category ? toUrlName(`/${category}`) : '')
      router.push(pushURL)
    }
  }

  return (
    <ScreenWrapper
      className={cn('space-y-6 py-10 transition-all duration-300 lg:py-20', isSelected ? 'lg:pt-10 lg:pb-0' : '')}
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
            <AreaItem key={area.area_slug} area={area} handleAreaSelect={handleAreaSelect} selectedArea={selectedArea} category={category} />
          ))}
        </AnimatePresence>
      </motion.div>
    </ScreenWrapper>
  )
}

export default PopularAreas
