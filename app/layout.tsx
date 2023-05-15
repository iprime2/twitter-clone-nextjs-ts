import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

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
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
