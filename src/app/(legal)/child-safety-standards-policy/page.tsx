import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/child-safety-standards-policy.json'

import type { Metadata } from 'next'
import type { ChildSafetyStandardsPolicyData } from '@/types/child-safety-standards-policy'

const data = dataJson as unknown as ChildSafetyStandardsPolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

export default function ChildSafetyPage() {
  return <PolicyPage data={data} />
}