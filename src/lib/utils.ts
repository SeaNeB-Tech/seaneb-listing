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
  title = 'Seaneb | Discover Local Business Deals & B2B Offers',
  description = 'Explore top-rated restaurants, stores, shops, and business categories near you with Seaneb. Connect and grow your business today.',
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
    creator: 'Seaneb Technologies',
    authors: [{ name: 'Seaneb Technologies' }]
  }
}

export const generatePublicImageBusinessLink = (objectKey?: string) => {
  if (!objectKey) return '/images/default.jpg'

  // If full URL or local image → return directly
  if (objectKey.startsWith('http') || objectKey.startsWith('/images/')) {
    return objectKey
  }

  const cleanKey = objectKey
    .replace(/^\/+/, '')
    .replace(/^storage\//, '')

  return `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${cleanKey}`
}

export const generatePublicImageUserLink = (objectKey?: string) => {
  if (!objectKey) return '/images/default-avatar.png'

  // If full URL or local image → return directly
  if (objectKey.startsWith('http') || objectKey.startsWith('/images/')) {
    return objectKey
  }

  const cleanKey = objectKey
    .replace(/^\/+/, '')
    .replace(/^storage\//, '')

  return `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${cleanKey}`
}

export const parseLocationSlug = (locationSlug: string) => {
  const parts = locationSlug.split('-')
  
  if (parts.length === 1) {
    return { city: parts[0], area: null }
  }

  const lastPart = parts[parts.length - 1]
  
  // If the last part is exactly 2 letters (state code like 'gj', 'mh'), it's just a city
  if (/^[a-z]{2}$/i.test(lastPart)) {
    return {
      city: parts.slice(0, parts.length - 1).join('-'),
      area: null
    }
  }

  // Otherwise, the last part is the city name, and the rest is the area
  return {
    city: lastPart,
    area: parts.slice(0, parts.length - 1).join('-')
  }
}
