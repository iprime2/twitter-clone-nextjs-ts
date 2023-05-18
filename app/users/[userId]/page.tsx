'use client'

import Header from '@/components/layout/Header'
import useUser from '@/hooks/useUser'
import useUsers from '@/hooks/useUsers'
import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'
import mockRouter from 'next-router-mock'

const UserView = () => {
  const router = useRouter()
  const {userId} = router.query

  const { data: fetchedUser, isLoading } = useUsers(userId as string)

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label='User Profile' />
    </>
  )
}

export default UserView
