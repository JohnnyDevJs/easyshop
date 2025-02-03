import { z } from 'zod'

import { insertProductSchema } from '@/lib/validators'

export type ProductProps = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}
