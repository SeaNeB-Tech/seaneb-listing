import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/cookie-policy.json'

import type { Metadata } from 'next'
import type { CookiePolicyData } from '@/types/cookie-policy'

const data = dataJson as unknown as CookiePolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

export default function CookiePolicyPage() {
  return <PolicyPage data={data} />
}