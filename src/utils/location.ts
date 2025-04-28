// ** Axios imports
import { getIp } from './ip-data'

import axios from 'axios'

export const getLocationData = async () => {
  const ip = await getIp('v6')

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_IP_URL}/${ip}?token=${process.env.NEXT_PUBLIC_IP_TOKEN}`
    )

    return { ...response.data, ip }
  } catch (error) {
    console.error('Failed to get location data:', error)

    return null
  }
}
