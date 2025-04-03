import { cn } from '@/lib/utils'
import React from 'react'

const ScreenWrapper = ({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) => {
  return (
    <div id={id} className={cn('mx-auto h-full w-full max-w-screen-2xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  )
}

export default ScreenWrapper
