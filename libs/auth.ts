import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async session(res) {
  //     const { token, session } = res
  //     if (token) {
  //       session.user.id = token.id
  //       session.user.name = token.name
  //       session.user.email = token.email
  //       session.user.image = token.picture
  //     }

  //     return session
  //   },
  //   async jwt({ token, user }) {
  //     const dbUser = await prisma.user.findFirst({
  //       where: {
  //         email: token.email,
  //       },
  //     })

  //     if (!dbUser) {
  //       token.id = user!.id
  //       return token
  //     }

  //     return {
  //       id: dbUser.id,
  //       email: dbUser.email,
  //       name: dbUser.name,
  //       picture: dbUser.image,
  //     }
  //   },
  // },
}
