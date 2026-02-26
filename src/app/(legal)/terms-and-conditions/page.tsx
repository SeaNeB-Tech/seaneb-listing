import PolicyPage from '@/components/PolicyPage'
import dataJson from '@/data/terms-and-conditions.json'

import type { Metadata } from 'next'
import type { TermsAndConditionsData } from '@/types/terms-and-conditions'

const data = dataJson as unknown as TermsAndConditionsData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

export default function TermsAndConditionsPage() {
  return <PolicyPage data={data} />
}