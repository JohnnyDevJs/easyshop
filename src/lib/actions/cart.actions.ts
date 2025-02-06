'use server'

import { CartItemProps } from '@/types'

export async function addItemToCart(data: CartItemProps) {
  const { item } = data
  return {
    success: true,
    message: `${item.name} adicionado ao carrinho`,
  }
}
