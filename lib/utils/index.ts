import { type ClassValue, clsx } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {
  httpStatusCodes,
  type HttpStatusCode,
  httpUnknownStatusCode,
  httpStatusCode,
  httpStatusText,
  httpStatusMessage,
} from './http-codes'
export { ApiError } from './error'
export { fetcher } from './fetcher'
export { getQueryString, setQueryString } from './url'
export { createFetch } from './cache'