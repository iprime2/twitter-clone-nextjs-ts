import serverAuth from '@/libs/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end()
  }

  try {
    // const { postId } = req.query
    const { body, postId } = req.body

    if (!postId) {
      throw new Error('Missing Post Id')
    }

    if (!body) {
      throw new Error('Missing tweet!')
    }

    const updatedUser = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        body,
      },
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
