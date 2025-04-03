type IpType = {
  v4: {
    httpsUrl: string
  }
  v6: {
    httpsUrl: string
  }
}

const type: IpType = {
  v4: {
    httpsUrl: 'https://api.ipify.org/'
  },
  v6: {
    httpsUrl: 'https://api6.ipify.org/'
  }
}

const getIp = async (version: 'v4' | 'v6'): Promise<string | null> => {
  const data = type[version]
  try {
    const response = await fetch(data.httpsUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch IP')
    }

    return await response.text()
  } catch (e) {
    console.error(`Error fetching IP for version ${version}:`, e)

    return null
  }
}

// This is the function that automatically switches to v6 if v4 fails
export const getIpAuto = async (): Promise<string | null> => {
  let ip = await getIp('v4')
  if (ip === null) {
    console.info('Switching to IPv6...')
    ip = await getIp('v6')
  }

  return ip
}

// You can also export the `getIp` function if needed
export { getIp }
