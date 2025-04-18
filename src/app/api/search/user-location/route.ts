import { UserLocationAPIResponse } from '@/types/user-location'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { location }: { location: { lat: number; long: number } } = await req.json()

  if (!location) {
    return NextResponse.json({ status: 'error', message: 'Missing query' }, { status: 400 })
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
      'X-Goog-FieldMask': '*'
    }

    const queries: any = {
      includedTypes: ['school', 'hotel', 'restaurant', 'cafe'],
      maxResultCount: 1,
      locationRestriction: {
        circle: {
          center: {
            latitude: location.lat,
            longitude: location.long
          },
          radius: 5000.0
        }
      }
    }

    const data = await axios.post('https://places.googleapis.com/v1/places:searchNearby', queries, { headers })

    const responseData = data?.data as UserLocationAPIResponse

    if (data.statusText === 'OK') {
      if (responseData?.places?.length > 0) {
        const place = responseData?.places[0]

        const city = place.addressComponents?.find(item => {
          if (item?.types?.includes('locality')) {
            return item?.longText
          }
        }) ?? { longText: place.formattedAddress.split(',')[1], shortText: place.formattedAddress.split(',')[1] }

        if (city) {
          return NextResponse.json({ status: 'success', data: city?.shortText })
        }
      } else {
        console.error('No places found in the response.')
      }
    }

    return NextResponse.json(
      { status: 'error', message: 'Google API error', googleStatus: data.status },
      { status: 500 }
    )
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
