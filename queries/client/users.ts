'use client'

import useSWR from 'swr'
import { useState } from 'react';
import { setQueryString } from '@/lib/utils'
import { UsersAPI, UserAPI } from '@/types/api'


export function useUserAPI(
  id: string | null = null,
  params?: { username?: string }
) {
  let url: string | null = null

  url = `/api/v1/user?id=${id}`

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    UserAPI,
    Error
  >(url)

  return {
    user: data?.data ?? null,
    error: error ?? data?.error ?? null,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createUser = async (userData: { email: string; password: string; [key: string]: any }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/users/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to create user');
      }
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
}

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

  export function useDeleteUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const deleteUser = async (userId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/v1/users', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error?.message || 'Failed to delete user');
        }
        return result.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { deleteUser, isLoading, error };
  }