'use client'

import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import { areaListArray, AreaListItem } from '@/data/areas'
import { cn } from '@/lib/utils'
import { capitalizeFirstLetter } from '@/utils'

interface Props {
  city: string
  selectedArea: string | null
  /* eslint-disable-next-line no-unused-vars */
  setSelectedArea: (v: string | null) => void
}

interface AreaItemProps {
  area: AreaListItem
  selectedArea: string | null
  /* eslint-disable-next-line no-unused-vars */
  setSelectedArea: (v: string | null) => void
}

const AreaItem = ({ area, selectedArea, setSelectedArea }: AreaItemProps) => {
  return (
    <div
      className={cn(
        'bg-background border-primary text-primary flex cursor-pointer items-center justify-center rounded-full border-2 px-2 py-1 md:px-3',
        selectedArea === area?.u_id ? 'bg-primary text-background' : 'text-primary'
      )}
      onClick={() => (selectedArea === area?.u_id ? setSelectedArea(null) : setSelectedArea(area?.u_id))}
    >
      <p className='text-center text-sm font-medium tracking-wide md:text-base'>{area?.name}</p>
    </div>
  )
}

const PopularAreas = ({ city, selectedArea, setSelectedArea }: Props) => {
  return (
    <ScreenWrapper className='space-y-6 py-10 lg:py-20'>
      {/* Title */}
      <div className='space-y-3 lg:mt-3'>
        <h2 className='after:bg-secondary relative text-3xl whitespace-normal after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:max-w-20 after:origin-bottom-right after:scale-x-100'>
          Popular localities in <b>{capitalizeFirstLetter(city) || ''}</b>
        </h2>
      </div>

      <div className='flex w-full flex-wrap items-center gap-2'>
        {areaListArray?.map(cc => (
          <AreaItem key={cc?.u_id} area={cc} setSelectedArea={setSelectedArea} selectedArea={selectedArea} />
        ))}
      </div>
    </ScreenWrapper>
  )
}

export default PopularAreas
