'use client'

import Modal from '@/components/Modal'
import Header from '@/components/layout/Header'

import { FC } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import Form from '@/components/Form'
import PostFeed from '@/components/Posts/PostFeed'

interface HomeProps {
  session: Session | null
}

const Home: FC<HomeProps> = ({ session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Header label='Home' />
        <Form placeholder='Whats Happening?' />
        <PostFeed />
      </SessionProvider>
    </>
  )
}

export default Home
