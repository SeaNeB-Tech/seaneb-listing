import type { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us - SeaNeb',
  description: 'Get in touch with SeaNeb for support, partnerships, or inquiries.',
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
  return <ContactPage/>
}