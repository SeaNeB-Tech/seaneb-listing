import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import React from 'react'
import ClientProviders from './client'

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientProviders>{children}</ClientProviders>
    </NextIntlClientProvider>
  )
}

export default Providers
