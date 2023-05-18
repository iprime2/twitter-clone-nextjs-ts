'use client'

import Modal from '@/components/Modal'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { FC } from 'react'

interface HomeProps {
  session: Session | null
}

const Home: FC<HomeProps> = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <LoginModal />
      <RegisterModal />
      <Header label='Home' />
    </SessionProvider>
  )
}

export default Home
