'use client'

import Modal from '@/components/Modal'
import Header from '@/components/layout/Header'

import { FC } from 'react'
import Form from '@/components/Form'
import PostFeed from '@/components/Posts/PostFeed'

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Header label='Home' />
      <Form placeholder='Whats Happening?' />
      <PostFeed userId='' />
    </>
  )
}

export default Home
