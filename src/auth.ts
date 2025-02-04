import { PrismaAdapter } from '@auth/prisma-adapter'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig, Session } from 'next-auth'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@/db/prisma'

export const config = {
  pages: {
    signIn: 'sign-in',
    error: 'sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === null) return null

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        })

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          )

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      trigger,
      token,
    }: {
      session: Session
      trigger?: 'update'
      token: JWT
    }) {
      if (session.user) {
        session.user.id = token.sub || ''

        if (trigger === 'update') {
          session.user.name = token.name
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
