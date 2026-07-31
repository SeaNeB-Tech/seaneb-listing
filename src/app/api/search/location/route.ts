import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { input }: { input: string } = await req.json()

  if (!input) {
    return NextResponse.json({ status: 'error', message: 'Missing query' }, { status: 400 })
  }

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hometown`, {
      params: { input }
    })

    if (data && data.success) {
      return NextResponse.json({ status: 'success', data: data.locations || [] })
    }

    return NextResponse.json(
      { status: 'error', message: 'Hometown API error' },
      { status: 500 }
    )
  } catch (err: any) {
    console.error('Hometown API error:', err.response?.data || err.message)
    return NextResponse.json({ 
      status: 'error', 
      message: err.message
    }, { status: 500 })
  }
}
