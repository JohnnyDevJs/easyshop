import { PrismaAdapter } from '@auth/prisma-adapter'
import { compareSync } from 'bcrypt-ts-edge'
// import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
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
        session.user.id = token.sub

        if (typeof token.role === 'string') {
          session.user.role = token.role
        }

        session.user.name = token.name

        if (trigger === 'update') {
          session.user.name = token.name
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }
      return token
    },
    authorized({ request }) {
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)

        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })

        response.cookies.set('sessionCartId', sessionCartId)

        return response
      } else {
        return true
      }
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
