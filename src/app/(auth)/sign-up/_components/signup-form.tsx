'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { signUpDefaultValues } from '@/config/auth-config'
import { signUpUser } from '@/lib/actions/user.actions'
import { signUpFormSchema } from '@/lib/validators'

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const router = useRouter()

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpDefaultValues,
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signUpForm

  async function handleSignUp(data: SignUpFormData) {
    try {
      const response = await signUpUser(data)

      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)

      router.push(`/sign-in?email=${data.email}`)
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer o cadastro.')
      console.error(error)
    }
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={handleSubmit(handleSignUp)} noValidate>
        <div className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu e-mail" {...field} />
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
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...field}
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
              'Inscrever-se'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/sign-in" target="_self" className="link text-store">
              Entrar
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
