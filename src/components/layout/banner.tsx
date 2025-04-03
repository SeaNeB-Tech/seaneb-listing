'use client'

import { cn } from '@/lib/utils'
import ScreenWrapper from '../wrapper/screen-wrapper'
import BreadcrumbComponent from '../breadcrumb'

import * as m from 'motion/react-m'

const BannerComponent = ({
  title,
  data,
  bordered = true
}: {
  title: string
  data: { path: string; title: string }[]
  bordered?: boolean
}) => {
  return (
    <div
      className={cn(
        'w-full bg-blue-50',
        bordered
          ? 'rounded-b-[30px] border border-blue-100 shadow-blue-50 lg:rounded-none lg:border-none lg:shadow-none'
          : ''
      )}
    >
      <ScreenWrapper className='py-6 sm:py-16'>
        <div className='flex flex-col items-center justify-between gap-5 overflow-hidden sm:flex-row'>
          <m.p
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className='text-3xl font-bold text-black sm:text-4xl'
          >
            {title}
          </m.p>
          <m.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <BreadcrumbComponent data={data} />
          </m.div>
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default BannerComponent
