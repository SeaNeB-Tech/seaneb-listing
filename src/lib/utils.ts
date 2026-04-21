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
  title = 'SeaNeB | Discover Local Business Deals & B2B Offers',
  description = 'Explore top-rated restaurants, stores, shops, and business categories near you with SeaNeB. Connect and grow your business today.',
  image = '/images/og/og.jpg',
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
      creator: '@seaneb'
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITEMAP_URL || 'http://localhost:6590'),
    ...(noIndex && {
      robots: {
        index: true,
        follow: true
      }
    }),
    creator: 'SeaNeB Technologies',
    authors: [{ name: 'SeaNeB Technologies' }]
  }
}

export const generatePublicImageBusinessLink = (objectKey?: string) => {
  if (!objectKey) return '/images/default.jpg'

  return `/storage/${objectKey}`
}

export const generatePublicImageUserLink = (objectKey?: string) => {
  if (!objectKey) return '/images/default-avatar.png'

  // If full URL → extract path
  if (objectKey.startsWith('http')) {
    const url = new URL(objectKey)
    
    return `/storage${url.pathname}`
  }

  const cleanKey = objectKey
    .replace(/^\/+/, '')
    .replace(/^storage\//, '')

  return `/storage/${cleanKey}`
}
