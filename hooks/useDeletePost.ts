import { useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'
import usePost from './usePost'
import axios, { AxiosRequestConfig } from 'axios'
import usePosts from './usePosts'
import useCurrentUser from './useCurrentUser'

const useDeletePost = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams()

  const postId: any = searchParams?.get('postId')
  const { data: currentUser } = useCurrentUser()

  const { data: post, mutate: mutateFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId as string)

  const requestConfig: AxiosRequestConfig = {}
  requestConfig.data = { postId: postId }

  const deleteUser = useCallback(async () => {
    try {
      await axios.delete(`/api/posts/delete?postId=${postId}`, requestConfig)

      mutateFetchedPost()
      mutateFetchedPosts()
    } catch (error) {
      console.log(error)
    }
  }, [postId, currentUser, post])

  return { deleteUser }
}

export default useDeletePost
