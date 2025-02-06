import { z } from 'zod'

import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from '@/lib/validators'

export type ProductProps = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}

export type CartProps = z.infer<typeof insertCartSchema>
export type CartItemProps = {
  item: z.infer<typeof cartItemSchema>
}
