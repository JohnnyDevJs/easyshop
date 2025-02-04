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
    .min(1, { message: 'Digite um endereço de e-mail.' })
    .email('Endereço de e-mail inválido.'),
  password: z
    .string()
    .min(1, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
})
