'use client'

// ** React Imports
import React from 'react'

// ** Utils Imports
import { cn } from '@/lib/utils'

// ** Animation and Styles
import { motion } from 'motion/react'

const PageWrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
