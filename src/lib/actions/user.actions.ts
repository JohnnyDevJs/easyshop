'use server'

import { hashSync } from 'bcrypt-ts-edge'
import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn, signOut } from '@/auth'
import { prisma } from '@/db/prisma'
import { getUserByEmail } from '@/lib/queries/users'
import { signInFormSchema, signUpFormSchema } from '@/lib/validators'

type SignInFormFields = z.infer<typeof signInFormSchema>
type SignUpFormFields = z.infer<typeof signUpFormSchema>

export async function signInUser(data: SignInFormFields) {
  const validatedFields = signInFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email) {
    return { success: false, message: 'Este e-mail não está cadastrado' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: true, message: 'Certo' }
  } catch (error) {
    console.log('ERROR', error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Credenciais inválidas',
          }

        default:
          return {
            success: false,
            message: 'Algo deu errado',
          }
      }
    }

    return { success: false, message: 'Erro inesperado ao tentar fazer login' }
  }
}

export async function signOutUser() {
  await signOut()
}

export async function signUpUser(formData: SignUpFormFields) {
  const validatedFields = signUpFormSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields.' }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = hashSync(password, 10)
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { success: false, message: 'Este e-mail já está cadastrado.' }
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      success: true,
      message: 'Cadastro realizado com sucesso.',
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)

    return {
      success: false,
      message: 'Algo deu errado.',
    }
  }
}
