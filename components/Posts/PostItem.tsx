import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { FC, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from '../Avatar'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import useLike from '@/hooks/useLike'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useDeletePost from '@/hooks/useDeletePost'
import { toast } from 'react-hot-toast'
import useEditPostModal from '@/hooks/useEditPostModal'

interface PostItemProps {
  userId?: string
  data: Record<string, any>
}

const PostItem: FC<PostItemProps> = ({ userId, data }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const [otherMenu, setOtherMenu] = useState(false)

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

  const { deleteUser } = useDeletePost({
    userId: currentUser.id,
  })

  const editPostModal = useEditPostModal()

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation()

      router.push(`/users?userId=${data.user.id}`)
    },
    [router, data.user.id]
  )

  const goToPost = useCallback(() => {
    router.push(`/posts?postId=${data.id}`)
  }, [router, data.id])

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation()

      if (!currentUser) {
        loginModal.onOpen()
      }

      toggleLike()
    },
    [loginModal, currentUser, toggleLike]
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data?.createdAt])

  const handleDelete = useCallback(
    (e: any) => {
      e.stopPropagation()
      if (data.userId !== currentUser.id) {
        toast.error('Not allowed')
        return
      }
      deleteUser()

      router.push('/')
      toast.success('Post deleted')
    },
    [otherMenu]
  )

  return (
    <div
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition w-full'
      onClick={goToPost}
    >
      <div className='flex flex-row items-start gap-3 '>
        <Avatar userId={data.user.id} />
        <div className='w-full'>
          <div className='flex flex-row space-between items-center w-full'>
            <div className='flex flex-row items-center gap-2'>
              <p
                onClick={goToUser}
                className='text-white font-semibold cursor-pointer hover:underline'
              >
                {data.user.name}
              </p>
              <span
                onClick={goToUser}
                className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
              >
                @{data.user.username}
              </span>
              <span className='text-neutral-500 text-sm'>{createdAt}</span>
            </div>
            <div className='ml-auto relative'>
              <BsThreeDotsVertical
                size={20}
                color='gray'
                onClick={() => setOtherMenu((prev) => !prev)}
              />
              {otherMenu && (
                <div className='absolute mt-3 mr-10 p-2 rounded-md bg-slate-400 flex flex-col'>
                  <span
                    className='text-semibold p-2 hover:bg-slate-800 hover:text-white rounded-md'
                    onClick={editPostModal.onOpen}
                  >
                    Edit
                  </span>
                  <span
                    className='text-red-700 text-semibold p-2 hover:text-red-600 hover:bg-slate-800 rounded-md'
                    onClick={handleDelete}
                  >
                    Delete
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
            >
              {hasLiked ? (
                <AiFillHeart size={20} color='red' />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
