import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal'
import { Toaster } from 'react-hot-toast'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter | Dashboard',
  description: 'Twitter Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <EditModal />
          <Toaster />
          <LoginModal />
          <RegisterModal />

          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  )
}
