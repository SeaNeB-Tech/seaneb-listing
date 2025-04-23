'use client'

// ** React Imports
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LazyMotion, domAnimation } from 'motion/react'
import { AppProvider } from '@/context/app.context'

const queryClient = new QueryClient()

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>{children}</AppProvider>
      </QueryClientProvider>
    </LazyMotion>
  )
}

export default ClientProviders
