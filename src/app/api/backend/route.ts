// ** Next Imports
import queryString from 'querystring'

import { NextResponse as res } from 'next/server'

// ** Type Imports
import { ApiUtils, MakeUrl } from '@/types/api-utils'

// ** API Imports
import Axios from 'axios'
import { verify } from 'jsonwebtoken'

const makeUrl = ({ uri = '', pathParams, query }: MakeUrl, host: string) => {
  return `${host || `${process.env.NEXT_PUBLIC_API_URL}`}${uri
    .split('/')
    .map(param => (param.charAt(0) === ':' && pathParams ? encodeURI(pathParams[param.slice(1)]) : param))
    .join('/')}${query ? `?${queryString.stringify(query)}` : ''}`
}

export async function POST(req: Request) {
  const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? `THISISSECRET`
  const { params }: { params: string } = await req.json()

  const decParams = verify(params, secret)

  const { uriEndPoint, query, pathParams, apiHostUrl = '', body, show_bookmarked = false } = decParams as ApiUtils

  try {
    const response = await Axios({
      method: uriEndPoint.method,
      url: makeUrl(
        {
          ...uriEndPoint,
          pathParams,
          query
        },
        apiHostUrl
      ),
      headers: {
        'Content-Type': 'application/json',
        SameSite: 'None',
        showBookmarked: show_bookmarked ? show_bookmarked?.toString() : 'false',
        ...uriEndPoint.headerProps
      },
      data: body || {}
    })

    return res.json(response?.data, { status: 200 })
  } catch (error: any) {
    return res.json(
      error?.response?.data ?? {
        status: false,
        message: 'Internal Server Error'
      },
      { status: 500 }
    )
  }
}
