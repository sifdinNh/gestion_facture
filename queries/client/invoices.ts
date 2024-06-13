import useSWR from 'swr'
import { setQueryString } from '@/lib/utils'
import { InvoicesAPI } from '@/types/api'
import { fetcher } from '@/lib/utils'

export function useInvoicesAPI(
    params?: {
      page?: number
      perPage?: number
    }
  ) {
    const query = setQueryString({ ...params })
    const url = query ? `/api/v1/invoices/list?${query}` : null
  
    const { data, error, isLoading, isValidating, mutate } = useSWR<
    InvoicesAPI,
      Error
    >(url, fetcher,{
        refreshInterval: 3000, // Refresh data every 60 seconds
    })
  
    return {
      invoices: data?.data ?? null,
      error: error ?? data?.error ?? null,
      isLoading,
      isValidating,
      mutate,
    }
  }