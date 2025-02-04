import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_URL_INTERNAL: z.string().url(),
  LATEST_PRODUCTS_LIMIT: z.number().default(Number),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
