//? ** Extracting First Letters
export const getInitials = (string: string) => {
  if (!string) return string

  return string?.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}

//? ** Capitalize the first letter of a string
export const capitalizeFirstLetter = (string: string) => {
  if (!string) return string

  return string?.toLowerCase().charAt(0).toUpperCase() + string?.toLowerCase().slice(1)
}

//? ** Capitalize the first letter of each word
export const capitalizeFirstLetterOfEachWord = (string: string) => {
  if (!string) return string

  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

//? ** Await Function that is used to wait
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//? ** Converts 'This is demo' to 'this-is-demo'
export const toUrlName = (string: string) => {
  try {
    if (string) {
      if (typeof string === 'string') {
        const updatedString = string.replaceAll(' ', '-').replaceAll('_', '-').toLowerCase()

        return updatedString
      }

      return string
    }

    return string
  } catch {
    return string
  }
}

export const isValidImageUrl = (url: string): Promise<boolean> => {
  return new Promise(resolve => {
    const img = new Image()
    img.src = url

    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

export const STATE_CODES: Record<string, string> = {
  "gujarat": "gj",
  "maharashtra": "mh",
  "karnataka": "ka",
  "delhi": "dl",
  "tamil nadu": "tn",
  "telangana": "tg",
  "west bengal": "wb",
  "uttar pradesh": "up",
  "haryana": "hr",
  "rajasthan": "rj",
  "punjab": "pb",
  "bihar": "br",
  "madhya pradesh": "mp",
  "andhra pradesh": "ap",
  "kerala": "kl",
  "odisha": "or",
  "assam": "as",
  "jammu and kashmir": "jk",
  "goa": "ga",
}

export const getStateSlug = (stateName: string, cityName?: string) => {
  if (!stateName) {
    if (cityName && STATE_CODES[cityName.toLowerCase().trim()]) {
      return STATE_CODES[cityName.toLowerCase().trim()]
    }
    return ''
  }
  const lower = stateName.toLowerCase().trim()
  return STATE_CODES[lower] || toUrlName(lower)
}
