import type { Metadata } from 'next'
import SeaNebAppClient from './seanebAppClient'

import appJson from '@/data/seaneb-app.json'
import type { SeaNebAppData } from '@/types/seaneb-app'

const appData: SeaNebAppData = appJson

export const metadata: Metadata = {
  title: appData.meta.title,
  description: appData.meta.description,
  alternates: {
    canonical: '/seaneb-app',
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
  return <SeaNebAppClient />
}