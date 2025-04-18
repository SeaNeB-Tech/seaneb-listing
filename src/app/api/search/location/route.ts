import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { input }: { input: string } = await req.json()

  if (!input) {
    return NextResponse.json({ status: 'error', message: 'Missing query' }, { status: 400 })
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
      'X-Goog-FieldMask': '*'
    }

    const queries: any = {}

    queries.input = input
    queries.includedRegionCodes = ['IN']

    const data = await axios.post('https://places.googleapis.com/v1/places:autocomplete', queries, { headers })

    if (data.statusText === 'OK') {
      const cities = data?.data.suggestions

      return NextResponse.json({ status: 'success', data: cities })
    }

    return NextResponse.json(
      { status: 'error', message: 'Google API error', googleStatus: data.status },
      { status: 500 }
    )
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
