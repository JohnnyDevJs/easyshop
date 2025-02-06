'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import Spinner from '@/assets/images/spinner.svg'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { signInFormSchema } from '@/lib/validators'

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const emailFromParams = searchParams.get('email') || ''

  const signInValuesFromParams = {
    email: emailFromParams,
  }

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInValuesFromParams,
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signInForm

  async function handleSignIn(data: SignInFormData) {
    try {
      const response = await signInWithCredentials(data)

      if (response?.error) {
        toast.error(response.error)
        return
      }

      router.push('/')
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer login.')
      console.error(error)
    }
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit(handleSignIn)} noValidate>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu e-mail"
                    {...field}
                    autoFocus={!emailFromParams}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                    autoFocus={!!emailFromParams}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} className="w-full" variant="default">
            {isSubmitting ? (
              <span className="[&>svg]:animate-spin [&>svg]:duration-300">
                <Spinner />
              </span>
            ) : (
              'Login'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/sign-up" target="_self" className="link text-store">
              Inscreva-se
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
