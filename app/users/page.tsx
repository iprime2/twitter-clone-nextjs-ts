'use client'

import Header from '@/components/layout/Header'
import UserHero from '@/components/users/UserHero'
import useUser from '@/hooks/useUser'
import { useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import UserBio from '@/components/users/UserBio'
import PostFeed from '@/components/Posts/PostFeed'

const UserView = () => {
  const searchParams = useSearchParams()
  const userId = searchParams?.get('userId')

  const { data: fetchedUser, isLoading } = useUser(userId as string)

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  )
}

export default UserView
