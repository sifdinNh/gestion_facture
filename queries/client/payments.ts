import useSWR from 'swr'
import { setQueryString } from '@/lib/utils'
import { PaymentsAPI } from '@/types/api'
import { fetcher } from '@/lib/utils'

export function usePaymentsAPI(
    params?: {
      page?: number
      perPage?: number
    }
  ) {
    const query = setQueryString({ ...params })
    const url = query ? `/api/v1/payments/list?${query}` : null
  
    const { data, error, isLoading, isValidating, mutate } = useSWR<
    PaymentsAPI,
      Error
    >(url, fetcher,{
        refreshInterval: 6000, // Refresh data every 6 seconds
    })
  
    return {
      payments: data?.data ?? null,
      error: error ?? data?.error ?? null,
      isLoading,
      isValidating,
      mutate,
    }
  }