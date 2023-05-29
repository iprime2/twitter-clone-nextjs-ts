import serverAuth from '@/libs/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end()
  }
 
console.log(req.body)
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res)
      const { body } = req.body
  console.log('hello from above')
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      })
        console.log('hello from below')

      return res.status(200).json(post)
    }

    if (req.method === 'GET') {
      const { userId } = req.query
      let posts

      if (userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
        

      }
      return res.status(200).json(posts)
    }
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
