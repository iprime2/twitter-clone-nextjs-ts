'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import { FC, useCallback, useState } from 'react'
import Input from '@/components/Input'
import Modal from '../Modal'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>()

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    registerModal.onClose()
    loginModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      // TODO REGISTER AND LOGIN

      registerModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='E-mail'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={password}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={password}
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
      <p>Already have an account?</p>
      <span
        onClick={onToggle}
        className='text-white cursor-pointer hover:underline'
      >
        Sign in
      </span>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
