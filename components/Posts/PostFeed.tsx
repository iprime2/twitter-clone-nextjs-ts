import usePosts from '@/hooks/usePosts'
import { FC } from 'react'
import PostItem from './PostItem'

interface PostFeedProps {
  userId?: string
}

const PostFeed: FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string)

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId as string} key={post.id} data={post} />
      ))}
    </>
  )
}

export default PostFeed
