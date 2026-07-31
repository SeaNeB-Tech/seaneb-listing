import axios from 'axios'
import { NextResponse } from 'next/server'

// Clean up city names by removing common suffixes like "Taluka", "District", etc.
function cleanCityName(name: string): string {
  if (!name) return name

  return name
    .replace(/\s*(Taluka|taluka|District|district|Tehsil|tehsil|Mandal|mandal)\s*/gi, '')
    .trim()
}

export async function POST(req: Request) {
  const { location }: { location: { lat: number; long: number } } = await req.json()

  if (!location) {
    return NextResponse.json({ status: 'error', message: 'Missing location' }, { status: 400 })
  }

  try {
    // Use OpenStreetMap Nominatim for free reverse geocoding (no API key needed)
    const { data } = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat: location.lat,
        lon: location.long,
        format: 'json',
        addressdetails: 1,
        zoom: 10
      },
      headers: {
        'User-Agent': 'Seaneb-Listing/1.0'
      }
    })

    if (data && data.address) {
      // Extract city name - prefer city/town over county/district
      const rawCityName = data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        data.address.state_district ||
        ''

      // Clean up the name (remove "Taluka", "District" etc.)
      const cityName = cleanCityName(rawCityName)

      if (cityName) {

        return NextResponse.json({ status: 'success', data: cityName })
      }
    }

    return NextResponse.json(
      { status: 'error', message: 'Could not determine city from coordinates' },
      { status: 500 }
    )
  } catch (err: any) {
    console.error('Reverse geocoding error:', err.response?.data || err.message)

    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
