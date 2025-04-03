import { ValidateResult } from 'react-hook-form'

//? ** Extracting First Letters
export const getInitials = (string: string) => {
  if (!string) return string

  return string?.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}

//? ** Await Function that is used to wait
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//? ** Displays '...' after string after a given length of chars
export const truncateString = (string: string, length: number) => {
  return string?.length > length ? string.substring(0, length)?.trim() + '...' : string
}

//? ** Checks if given string contains given prefix
export const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)

//? ** Returns the string with sliced suffix
export const withoutSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str

//? ** Returns the string with sliced prefix
export const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

//? ** Checks if given input is a file
export function isFile(input: any): boolean {
  if ('File' in window && input instanceof File) return true
  else return false
}

//? ** Converts 'This is demo' to 'this-is-demo'
export const toFileName = (string: string) => {
  try {
    if (string) {
      if (typeof string === 'string') {
        const updatedString = string.replaceAll(' ', '-').toLowerCase()

        return updatedString
      }

      return string
    }

    return string
  } catch {
    return string
  }
}

//? ** Currency Convert
export const currencyConvert = (value: number, options?: Intl.NumberFormatOptions) => {
  return value.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
    ...options
  })
}

//? ** Checks for number
export const isNumber = (value: any) => {
  return !isNaN(Number(value))
}

//? ** Default Date Format
export const defaultFormatDate = 'DD MMM, YYYY'

//? ** Default DateTime Format
export const defaultFormatTime = 'DD MMM, YYYY h:mm A'

//? ** Validating Image Dimensions and Size
type ValidateOptions = { fileSize: number; checkSquare?: boolean }

export const validateImage = async (value: File, options: ValidateOptions): Promise<ValidateResult> => {
  if (!value || !(value instanceof File)) return 'Please upload a valid image file.'

  const MAX_SIZE_MB = options?.fileSize || 2
  if (value.size > MAX_SIZE_MB * 1024 * 1024)
    return `Please upload a image with less than ${options?.fileSize}MB size or use "Crop & Compress" below`

  return new Promise(resolve => {
    const img = new Image()
    img.src = URL.createObjectURL(value)
    img.onload = () => {
      const aspectRatio = img.width / img.height
      const isSquare = Math.abs(aspectRatio - 1) < 0.1 // Allow slight variation
      resolve(
        isSquare || options?.checkSquare === false
          ? true
          : 'Please upload a image that is square or use "Crop & Compress" below'
      )
    }
    img.onerror = () => resolve('Invalid image file.')
  })
}

export const getTodaysDate = () => {
  return `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
}
