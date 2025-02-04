import { Metadata } from 'next'
import Link from 'next/link'

import Logo from '@/assets/images/logo.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CredentialsSignInForm } from './_components/credentials-signin-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
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
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
