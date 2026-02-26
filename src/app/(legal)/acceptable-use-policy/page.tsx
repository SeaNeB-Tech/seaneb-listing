import Link from 'next/link'
import PolicyPage from '@/components/PolicyPage'
import dataJson from '@/data/acceptable-use-policy.json'

import type { Metadata } from 'next'
import type { AcceptableUsePolicyData } from '@/types/acceptable-use-policy'

const data: AcceptableUsePolicyData = dataJson

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
}

const introNode = (
  <>
    <p className="mb-4">
      {data.intro.paragraph.replace('Terms and Conditions', '')}
      <Link href={data.intro.termsHref} className="text-primary hover:underline">
        Terms and Conditions
      </Link>{' '}
      (&apos;Legal Terms&apos;) and should therefore be read alongside our main Legal Terms and Conditions.
      If you do not agree with these Legal Terms, please refrain from using our Services.
      Your continued use of our Services implies acceptance of these Legal Terms.
    </p>

    <p className="mb-4">{data.intro.appliesTo}</p>

    <ol className="list-decimal pl-6 mb-6 space-y-2">
      {data.intro.scope.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ol>
  </>
)

export default function AcceptableUsePolicyPage() {
  return <PolicyPage data={data} introNode={introNode} />
}