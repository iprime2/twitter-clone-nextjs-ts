import serverAuth from '@/libs/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  try {
    const { postId } = req.body
    console.log(req.body)

    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    return res.status(200).json('The Post has been deleted')
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
