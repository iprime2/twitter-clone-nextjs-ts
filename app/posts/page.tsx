'use client'

import { FC } from 'react'
import { useSearchParams } from 'next/navigation'
import usePost from '@/hooks/usePost'
import { ClipLoader } from 'react-spinners'
import Header from '@/components/layout/Header'
import PostItem from '@/components/Posts/PostItem'
import Form from '@/components/Form'
import CommentFeed from '@/components/Posts/CommentFeed'

interface pageProps {}

const PostView: FC<pageProps> = ({}) => {
  const searchParams = useSearchParams()
  const postId = searchParams?.get('postId')

  const { data: fetchedPost, isLoading } = usePost(postId as string)
  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost} userId={fetchedPost.userId} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView
