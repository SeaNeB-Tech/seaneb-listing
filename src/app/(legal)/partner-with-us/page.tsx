import type { Metadata } from 'next'
import PartnerWithUsPage from './PartnerWithUsPage'

export const metadata: Metadata = {
  title: 'Partner With Us - SeaNeb',
  description: 'Join SeaNeb as a partner and grow your business with our platform.',
  alternates: {
    canonical: '/partner-with-us',
  },
}

export default function Page() {
  return <PartnerWithUsPage />
}