import type { Metadata } from 'next'
import dataJson from '@/data/faqs.json'
import FaqsClient from './faqsClient'
import type { FaqsData } from '@/types/faqs'

const faqsData = dataJson as FaqsData

export const metadata: Metadata = {
  title: faqsData.meta.title,
  description: faqsData.meta.description,
  alternates: {
    canonical: '/faqs',
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

export default function Page() {
  return <FaqsClient data={faqsData} />
}