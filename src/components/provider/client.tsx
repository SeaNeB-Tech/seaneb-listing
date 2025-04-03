'use client'

// ** React Imports
import React from 'react'

import { LazyMotion, domAnimation } from 'motion/react'

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export default ClientProviders
