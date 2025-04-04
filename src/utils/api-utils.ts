import { ApiResponse } from '@/types/api-response'
import { ApiUtils, MakeUrl } from '@/types/api-utils'

import Axios from 'axios'
import { sign } from 'jsonwebtoken'

const showLogs = true

export const getDefaultHeaders = async () => {
  return { 'Content-Type': 'application/json', SameSite: 'None' }
}

export const makeUrl = ({ uri = '', pathParams, query }: MakeUrl, host: string) => {
  return `${host || `${window?.location?.origin}`}${uri
    .split('/')
    .map(param => (param.charAt(0) === ':' && pathParams ? encodeURI(pathParams[param.slice(1)]) : param))
    .join('/')}${query ? `?${new URLSearchParams(query)}` : ''}`
}

const callAxios = async ({
  uriEndPoint,
  pathParams,
  query,
  body,
  apiHostUrl = '',
  nextUrl,
  auth = false
}: ApiUtils) => {
  showLogs &&
    console.log('Call AXIOS ==>', {
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
      auth
    })

  const payload = { uriEndPoint, pathParams, query, body, apiHostUrl, auth }

  const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? `THISISSECRET`

  const encPayload = sign(payload, secret)

  if (uriEndPoint?.headerProps?.type === 'formData')
    return Axios({
      method: uriEndPoint.method,
      url: makeUrl(
        {
          ...uriEndPoint,
          uri: '/api/form-data' + uriEndPoint.uri,
          pathParams,
          query
        },
        apiHostUrl
      ),
      headers: {
        ...(await getDefaultHeaders()),
        ...uriEndPoint.headerProps
      },
      data: body || {}
    })

  if (nextUrl)
    return Axios({
      method: uriEndPoint.method,
      url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
      headers: {
        ...(await getDefaultHeaders()),
        ...uriEndPoint.headerProps
      },
      data: body || {}
    })

  return Axios({
    method: 'POST',
    url: '/api/backend',
    headers: {
      ...(await getDefaultHeaders())
    },
    data: { params: encPayload }
  })
}

export const callApi = (props: ApiUtils): Promise<ApiResponse> => {
  const {
    uriEndPoint = { uri: '', method: 'GET', headerProps: {} },
    pathParams,
    query,
    body,
    apiHostUrl,
    nextUrl,
    auth
  } = props

  return new Promise((resolve, reject) => {
    callAxios({
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
      nextUrl,
      auth
    })
      .then(response => {
        showLogs && console.log('callApi RES ==>', response.data)
        resolve(response?.data)
      })
      .catch(async err => {
        showLogs && console.log('callApi ERR ==>', err)
        reject(err.response?.data ?? err)
      })
  })
}
