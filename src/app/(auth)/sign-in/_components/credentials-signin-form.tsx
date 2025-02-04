'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValues } from '@/config/auth-config'

export function CredentialsSignInForm() {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <Button className="w-full" variant="default">
            Login
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/sign-up" target="_self" className="link text-store">
            Cadastrar
          </Link>
        </div>
      </div>
    </form>
  )
}
