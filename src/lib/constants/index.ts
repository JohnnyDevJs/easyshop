import { env } from '@/env'

export const APP_NAME = env.NEXT_PUBLIC_APP_NAME
export const APP_DESCRIPTION = env.NEXT_PUBLIC_APP_DESCRIPTION
export const SERVER_URL = env.NEXT_PUBLIC_SERVER_URL
export const LATEST_PRODUCTS_LIMIT = Number(env.LATEST_PRODUCTS_LIMIT) || 4
