'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import Modal from '../Modal'
import useEditPostModal from '@/hooks/useEditPostModal'
import Form from '../Form'
import { toast } from 'react-hot-toast'
import usePosts from '@/hooks/usePosts'
import usePost from '@/hooks/usePost'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import axios from 'axios'

const EditPostModal = () => {
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: mutatePosts } = usePosts('')

  const searchParams = useSearchParams()

  const postId: any = searchParams?.get('postId')

  const { data: fetchedPost, mutate: mutatePost } = usePost(postId)

  const editPostModal = useEditPostModal()

  useEffect(() => {
    setBody(fetchedPost?.body)
  }, [postId])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <textarea
        disabled={isLoading}
        onChange={(event) => setBody(event.target.value)}
        value={body}
        className='
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              '
        placeholder={'Edit your tweet!'}
      ></textarea>
      <hr
        className='
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition'
      />
    </div>
  )

  const onSubmit = useCallback(async () => {
    setIsLoading(true)

    try {
      await axios.patch(`/api/posts/edit?postId=${postId}`, { body, postId })

      mutatePost()
      mutatePosts()
      toast.success('Tweet edited successfully!')
      editPostModal.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Unable to edit tweet')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePost, mutatePosts, fetchedPost])

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPostModal.isOpen}
      title='Edit your tweet'
      actionLabel='Save'
      onClose={editPostModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditPostModal
