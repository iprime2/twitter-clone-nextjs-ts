'use client'

import useLoginModal from '@/hooks/useLoginModal'
import { FC, useCallback, useState } from 'react'
import Input from '@/components/Input'
import Modal from '../Modal'
import useRegisterModal from '@/hooks/useRegisterModal'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>()

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='E-mail'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>Create an account!</p>
      <span
        onClick={onToggle}
        className='text-white cursor-pointer hover:underline'
      >
        Sign Up
      </span>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
