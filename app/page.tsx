import Modal from '@/components/Modal'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

export default function Home() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header label='Home' />
    </>
  )
}
