'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { CartItemProps } from '@/types'

import { convertToPlainObject, round2 } from '../utils'
import { cartItemSchema, insertCartSchema } from '../validators'

const calPrice = (items: CartItemProps[]) => {
  const itemsPrice = round2(
      items.reduce((acc, { item }) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

export async function addItemToCart(data: CartItemProps) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value

    if (!sessionCartId) throw new Error('Cart session not found')

    const session = await auth()
    const userId = session?.user.id ? (session.user.id as string) : undefined

    const cart = await getMyCart()

    const item = cartItemSchema.parse(data.item)

    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    })

    if (!product) throw new Error('Product not found')

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calPrice([{ item }]),
      })

      await prisma.cart.create({
        data: newCart,
      })

      revalidatePath(`/product/${product.slug}`)
    }

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
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('Cart session not found')

  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  })

  if (!cart) return undefined

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItemProps[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}
