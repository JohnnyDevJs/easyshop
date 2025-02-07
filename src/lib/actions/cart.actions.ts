'use server'

import { cookies } from 'next/headers'

import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { CartItemProps } from '@/types'

import { convertToPlainObject } from '../utils'
import { cartItemSchema } from '../validators'

export async function addItemToCart(data: CartItemProps) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value

    if (!sessionCartId) throw new Error('Cart session not found')

    const session = await auth()
    const userId = session?.user.id ? (session.user.id as string) : undefined

    // const cart = await getMyCart()

    const item = cartItemSchema.parse(data.item)

    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    })

    console.log({
      'Session Cart ID': sessionCartId,
      'USER ID': userId,
      'Item Requested': item,
      'Product Found': product,
    })

    return {
      success: true,
      message: `${data.item.name} adicionado ao carrinho`,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      message: errorMessage,
    }
  }
}

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('Cart session not found')

  // Get session and user ID
  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  })

  if (!cart) return undefined

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItemProps[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}
