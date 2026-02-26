import Link from 'next/link'
import PolicyPage from '@/components/PolicyPage'

import dataJson from '@/data/privacy-policy.json'

import type { Metadata } from 'next'
import type { PrivacyPolicyData } from '@/types/privacy-policy'

const data = dataJson as unknown as PrivacyPolicyData

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

const introNode = (
  <>
    <p className="mb-4">{data.intro.paragraph}</p>

    <ul className="list-disc pl-6 mb-4 space-y-2">
      {data.intro.points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>

    <p className="mb-8">{data.intro.contactNote}</p>

    <h2 className="text-2xl font-bold mt-8 mb-4">
      SUMMARY OF KEY POINTS
    </h2>

    <dl className="space-y-4 mb-8">
      {data.summaryPoints.map((sp) => (
        <div key={sp.label}>
          <dt className="font-semibold">{sp.label}</dt>
          <dd className="text-gray-600">{sp.text}</dd>
        </div>
      ))}
    </dl>
  </>
)

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      data={data}
      introNode={introNode}
      tocItems={data.tableOfContents}
    />
  )
}