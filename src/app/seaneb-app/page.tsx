import type { Metadata } from 'next'
import SeaNebAppClient from './seanebAppClient'
import Script from 'next/script'
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.seaneb.com/seaneb-app#app",
    "name": appData.meta.title,
    "description": appData.meta.description,
    "url": "https://www.seaneb.com/seaneb-app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android, iOS",
    "inLanguage": "en-IN",
    "publisher": {
      "@id": "https://www.seaneb.com/#organization"
    }
  }

  return (
    <>
      <Script
        id="app-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SeaNebAppClient />
    </>
  )
}