import { z } from 'zod'

import { formatNumberWithDecimal } from './utils'

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'O preço deve ter exatamente casas decimais',
  )

export const insertProductSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  slug: z.string().min(1, 'O slug é obrigatório.'),
  category: z.string().min(1, 'A categoria é obrigatório.'),
  brand: z.string().min(1, 'A marca é obrigatória.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  stock: z.coerce.number(),
  images: z
    .array(z.string())
    .min(1, 'É necessário fornecer pelo menos uma imagem.'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
})

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe seu e-mail.' })
    .email('Digite um e-mail válido.')
    .trim(),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Informe seu nome completo.' })
      .refine((name) => name.trim().split(/\s+/).length > 1, {
        message: 'Informe pelo menos um nome e um sobrenome.',
      }),
    email: z
      .string()
      .min(1, { message: 'Informe seu e-mail.' })
      .email('Digite um e-mail válido.')
      .trim(),
    password: z
      .string()
      .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem.',
    path: ['confirmPassword'],
  })
