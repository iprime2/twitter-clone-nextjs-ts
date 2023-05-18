'use client'

import { FC } from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import SidebarLogo from '@/components/layout/SidebarLogo'
import SidebarItem from '@/components/layout/SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { data: currentUser } = useCurrentUser()
  console.log(currentUser)
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notification',
      href: '/notification',
      icon: BsBellFill,
      auth: true,
    },
    {
      label: 'Profile',
      href: '/users/:id',
      icon: FaUser,
      auth: true,
    },
  ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label='logout'
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
