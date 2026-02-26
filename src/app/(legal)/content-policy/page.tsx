import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/content-policy.json'

import type { Metadata } from 'next'
import type { ContentPolicyData } from '@/types/content-policy'

const data = dataJson as unknown as ContentPolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

export default function ContentPolicyPage() {
  return <PolicyPage data={data} />
}