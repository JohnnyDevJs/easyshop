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

import { SignUpForm } from './_components/signup-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function SignUpPage({
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

          <CardTitle className="text-center">Criar uma conta</CardTitle>
          <CardDescription className="text-center">
            Insira suas informações abaixo para se inscrever
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}
