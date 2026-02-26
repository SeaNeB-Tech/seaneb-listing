import type { Metadata } from 'next'
import SeaNebAppClient from './seanebAppClient'

import appJson from '@/data/seaneb-app.json'
import type { SeaNebAppData } from '@/types/seaneb-app'

const appData: SeaNebAppData = appJson

export const metadata: Metadata = {
  title: appData.meta.title,
  description: appData.meta.description,
}

export default function Page() {
  return <SeaNebAppClient />
}