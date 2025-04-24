// ** Next Imports
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

// ** Custom Components
import Providers from '@/components/provider'
import { constructMetadata } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
import NextProgress from '@/components/layout/next-progress'

// ** Styles
import './globals.css'

const poppins = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-roboto'
})

export const metadata: Metadata = constructMetadata({
  title: {
    default: 'SeaNeb',
    template: '%s - SeaNeb'
  }
})

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' translate='no'>
      <head></head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <NextProgress />
          {children} {isProduction && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
