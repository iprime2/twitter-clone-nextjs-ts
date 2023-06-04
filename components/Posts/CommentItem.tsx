import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useMemo, useState } from 'react'
import Avatar from '../Avatar'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import useDeletePost from '@/hooks/useDeletePost'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditComment from '@/hooks/useEditComment'

interface CommentItemProps {
  data: Record<string, any>
  commentId: String
}

const CommentItem: FC<CommentItemProps> = ({ data, commentId }) => {
  const router = useRouter()
  const [otherMenu, setOtherMenu] = useState(false)
  const { data: currentUser } = useCurrentUser()
  const editComment = useEditComment()

  const { deleteUser } = useDeletePost({
    userId: currentUser?.id,
  })

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation()

      router.push(`/users?userId=${data.user.id}`)
    },
    [router, data]
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
    <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
      <div className='flex flex-row items-start gap-3 '>
        <Avatar userId={data.user.id} />
        <div className=' w-full'>
          <div className='flex flex-row space-between '>
            <div className='flex flex-row items-center gap-2'>
              <p className='text-white font-semibold cursor-pointer hover:underline'>
                {data.user.name}
              </p>
              <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
                @{data.user.username}
              </span>
              <span className='text-neutral-500 text-sm'>{createdAt}</span>
            </div>
            <div className='relative ml-auto'>
              <BsThreeDotsVertical
                size={20}
                color='gray'
                onClick={() => setOtherMenu((prev) => !prev)}
              />
              {otherMenu && (
                <div className='absolute mt-3 mr-20 p-2 rounded-md bg-slate-400 flex flex-col'>
                  <span
                    className='text-semibold p-2 hover:bg-slate-800 hover:text-white rounded-md'
                    onClick={editComment.onOpen}
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
        </div>
      </div>
    </div>
  )
}

export default CommentItem
