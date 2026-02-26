import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/refund-policy.json'

import type { Metadata } from 'next'
import type { RefundPolicyData } from '@/types/refund-policy'

const data = dataJson as unknown as RefundPolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

export default function RefundPolicyPage() {
  return <PolicyPage data={data} />
}