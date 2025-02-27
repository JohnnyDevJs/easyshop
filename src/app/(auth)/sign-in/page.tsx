import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import Logo from '@/assets/images/logo.svg'
import { auth } from '@/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { SignInForm } from './_components/signin-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>
}) {
  const { callbackUrl } = await searchParams

  const session = await auth()

  if (session) return redirect(callbackUrl || '/')

  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Logo width={50} height={50} />
          </Link>

          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Faça login em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
