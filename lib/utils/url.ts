import { User } from '@/types/database'

export function absoluteUrl(pathname?: string): string {
  const origin = process.env.NEXT_PUBLIC_SITE_URL!
  const uri = `${origin}/${pathname}`
  const sanitized = uri.replace(/\/+/g, '/').replace(/\/+$/, '')
  const url = new URL(sanitized)

  return url.toString()
}

export function getQueryString(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams?.entries())
}

export function setQueryString<T extends Record<string, any>>(
  object: T
): string {
  const params = Object.keys(object).reduce((acc: T, k: string) => {
    if (object[k] === undefined || object[k] === null || object[k] === '') {
      return acc
    }
    acc[k as keyof T] = object[k]
    return acc
  }, {} as T)

  return new URLSearchParams(params).toString()
}

