import { clsx, type ClassValue } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type TitleTemplate = {
  default: string
  template: string
  absolute?: string
}

interface ConstructMetadata {
  title?: string | TitleTemplate
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  keywords?: string
}

export function constructMetadata({
  title = 'SeaNeb | Discover Local Business Deals & B2B Offers',
  description = 'Explore top-rated restaurants, stores, shops, and business categories near you with SeaNeb. Connect and grow your business today.',
  image = '/images/og/opengraph-image.png',
  icons = '/favicon.ico',
  noIndex = false,
  keywords = ''
}: ConstructMetadata = {}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: 'website',
      url: process.env.NEXT_PUBLIC_SITEMAP_URL,
      description,
      images: [
        {
          url: image,
          alt: typeof title === 'string' ? title : undefined
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image }],
      creator: '@codentic.software'
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITEMAP_URL || 'http://localhost:6590'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    creator: 'Codentic Software',
    authors: [{ name: 'Codentic Software' }]
  }
}

export const generatePublicImageBusinessLink = (
  businessData: { country: string; state: string; city: string; area: string; u_id: string },
  objectKey: string
) => {
  return `https://${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${objectKey}`
}

export const generatePublicImageUserLink = (country: string, userId: string, objectKey: string) => {
  return `https://${process.env.NEXT_PUBLIC_DO_SPACES_NAME}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${objectKey}`
}
