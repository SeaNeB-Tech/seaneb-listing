interface ApiResponse {
  status: boolean
  statusCode: number
  message: string
  data: any
}

export const submitContactUsRequest = async (body: any): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/front-end/contact-us-cs', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response?.ok) {
      const data = await response?.json()

      return data
    }

    return null
  } catch (error) {
    console.error('submitContactUsRequest :', error)

    return null
  }
}
