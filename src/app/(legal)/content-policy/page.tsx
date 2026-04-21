import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/content-policy.json'

import type { Metadata } from 'next'
import type { ContentPolicyData } from '@/types/content-policy'

const data = dataJson as unknown as ContentPolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: {
    canonical: '/content-policy',
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

export default function ContentPolicyPage() {
  return <PolicyPage data={data} />
}