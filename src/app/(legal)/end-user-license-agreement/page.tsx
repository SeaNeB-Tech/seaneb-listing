import type { Metadata } from 'next'

import PolicyPage from '@/components/PolicyPage'
import dataJson from '@/data/end-user-licence-agreement.json'

import type { EulaData } from '@/types/end-user-license-agreement'

const data = dataJson as unknown as EulaData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: {
    canonical: '/end-user-licence-agreement',
  },
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
}

export default function EulaPage() {
  return <PolicyPage data={data} />
}