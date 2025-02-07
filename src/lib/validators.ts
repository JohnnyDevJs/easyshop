import { z } from 'zod'

import { formatNumberWithDecimal } from './utils'

const currency = z.string().refine((value) => {
  const formattedValue = formatNumberWithDecimal(
    Number(value.replace(',', '.')),
  )
  return /^\d+,\d{2}$/.test(formattedValue)
}, 'O preço deve ter exatamente duas casas decimais (ex: 59,99)')

// Schema for inserting products
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

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe seu e-mail.' })
    .email('Digite um e-mail válido.')
    .trim(),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

// Schema for signing up a user
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

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'O produto é obrigatório.'),
  name: z.string().min(1, 'O nome é obrigatório.'),
  slug: z.string().min(1, 'O slug é obrigatório.'),
  qty: z
    .number()
    .int()
    .nonnegative('A quantidade deve ser um número positivo.'),
  image: z.string().min(1, 'A imagem é obrigatória.'),
  price: currency,
})

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'O ID do carrinho da sessão é obrigatório.'),
  userId: z.string().optional().nullable(),
})
