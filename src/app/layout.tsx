import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Script from 'next/script'
import Providers from '@/components/provider'
import { constructMetadata } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
import NextProgress from '@/components/layout/next-progress'
import Layout from '@/components/layout'
import './globals.css'
import '@assets/iconify-icons/generated-icons.css'

const poppins = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITEMAP_URL!),
  title: {
    default: 'SeaNeb | Discover Local Business Deals & B2B Offers',
    template: '%s - SeaNeb'
  },
  alternates: {
    canonical: '/'
  }
}
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' translate='no'>
      <head>
        <link rel='apple-touch-icon' href='/images/logo/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        {!isProduction && <meta name='robots' content='index, follow' />}

          <Script
            id='gtm-script'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PBWN9VZC');
              `
            }}
          />
      </head>

      <body className={`${poppins.className} antialiased`}>
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-PBWN9VZC'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

        <Providers>
          <NextProgress />

          <Layout>
            {children}
          </Layout>

          {isProduction && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}