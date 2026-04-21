import type { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us - SeaNeb',
  description: 'Get in touch with SeaNeb for support, partnerships, or inquiries.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Page() {
  return <ContactPage/>
}