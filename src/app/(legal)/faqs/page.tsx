import type { Metadata } from 'next'
import dataJson from '@/data/faqs.json'
import FaqsClient from './faqsClient'
import type { FaqsData } from '@/types/faqs'

const faqsData = dataJson as FaqsData

export const metadata: Metadata = {
  title: faqsData.meta.title,
  description: faqsData.meta.description
}

export default function Page() {
  return <FaqsClient data={faqsData} />
}