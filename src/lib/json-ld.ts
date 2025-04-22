import { BusinessDetailsAPIResponse } from '@/types/business'
import { LocalBusiness, WithContext } from 'schema-dts'

export const generateJSONLd = (
  data: BusinessDetailsAPIResponse,
  city: string,
  category: string,
  business: string
): WithContext<LocalBusiness> => {
  const getSameAs = [data?.facebook_url, data?.instagram_url, data?.website_url, data?.x_url]?.filter(v => !!v)

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data?.business_name,
    image: data?.icon,
    url: process.env.NEXT_PUBLIC_SITEMAP_URL + `/${city}/${category}/${business}`,
    telephone: data?.contact_no,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data?.address_line_1 || '',
      addressLocality: data?.address_line_2 || '',
      addressRegion: data?.state || '',
      addressCountry: data?.country_code?.toUpperCase() || 'IN',
      postalCode: data?.zip_code || ''
    },
    sameAs: getSameAs
  }
}
