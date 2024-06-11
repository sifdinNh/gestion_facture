'use client'

import useSWR from 'swr'
import { setQueryString } from '@/lib/utils'
import { UserAPI, UsersAPI } from '@/types/api'


export function useUsersAPI(
    id: string | null,
    params?: { page?: number; perPage?: number }
  ) {
    const query = setQueryString({ id, ...params })
    const url = query ? `/api/v1/users/list?${query}` : null
  
    if (!url) {
      console.error('URL is null, request will not be made.')
    }
  
    const fetcher = (url: string) => fetch(url).then(res => res.json())
  
    const { data, error, isLoading, isValidating, mutate } = useSWR<UsersAPI, Error>(url, fetcher)
  
    return {
      users: data?.data?.users ?? [],
      error: error ?? data?.error ?? null,
      isLoading,
      isValidating,
      mutate,
    }
  }