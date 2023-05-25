import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useNotification = (userId: string) => {
  const url = userId ? `/api/notification/${userId}` : null

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useNotification
