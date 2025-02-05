'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn, signOut } from '@/auth'
import { getUserByEmail } from '@/lib/queries/users'
import { signInFormSchema } from '@/lib/validators'

export type SignInFormFields = z.infer<typeof signInFormSchema>

export async function signInWithCredentials(formData: SignInFormFields) {
  const validatedFields = signInFormSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email) {
    return { error: 'Este e-mail não está cadastrado.' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Credenciais inválidas.',
          }

        default:
          return {
            error: 'Algo deu errado.',
          }
      }
    }
  }
}

export async function signOutUser() {
  await signOut()
}
