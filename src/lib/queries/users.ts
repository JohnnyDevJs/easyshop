'use server'

import { User } from 'next-auth'

import { prisma } from '@/db/prisma'

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user
}
