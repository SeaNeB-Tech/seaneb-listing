import type { Metadata } from 'next'
import ContactPage from './ContactPage'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact Us - SeaNeB',
  description: 'Get in touch with SeaNeB for support, partnerships, or inquiries.',
  alternates: {
    canonical: '/contact',
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
    "@type": "ContactPage",
    "@id": "https://www.seaneb.com/contact#contactpage",
    "url": "https://www.seaneb.com/contact",
    "name": "Contact SeaNeB",
    "description": "Get in touch with SeaNeB for support, partnerships, or inquiries.",
    "inLanguage": "en-IN",
    "isPartOf": {
      "@id": "https://www.seaneb.com/#website"
    },
    "about": {
      "@id": "https://www.seaneb.com/#organization"
    }
  }
  return (
    
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContactPage />
    </>
  )
}