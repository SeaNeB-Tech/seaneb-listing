import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { input }: { input: string } = await req.json()
  console.log('🚀 ------------------------🚀')
  console.log('🚀 ~ POST ~ input:', input)
  console.log('🚀 ------------------------🚀')
  console.log('process.env.GOOGLE_API_KEY :', process.env.GOOGLE_API_KEY)

  if (!input) {
    return NextResponse.json({ status: 'error', message: 'Missing query' }, { status: 400 })
  }

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`
    console.log('🚀 --------------------------🚀')
    console.log('🚀 ~ POST ~ apiUrl:', apiUrl)
    console.log('🚀 --------------------------🚀')

    const googleRes = await fetch(apiUrl)
    const data = await googleRes.json()
    console.log('🚀 ----------------------🚀')
    console.log('🚀 ~ POST ~ data:', data)
    console.log('🚀 ----------------------🚀')

    if (data.status === 'OK') {
      const cities = data.predictions.map((item: any) => item.description)

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
