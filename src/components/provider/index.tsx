import React from 'react'
import ClientProviders from './client'

const Providers = async ({ children }: { children: React.ReactNode }) => {
  return <ClientProviders>{children}</ClientProviders>
}

export default Providers
