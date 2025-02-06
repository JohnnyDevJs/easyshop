'use client'

import { Plus } from 'lucide-react'
//import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { addItemToCart } from '@/lib/actions/cart.actions'
import { CartItemProps } from '@/types'

export function AddToCart({ item }: CartItemProps) {
  //const router = useRouter()

  async function handleAddToCart() {
    const response = await addItemToCart({ item })

    if (!response.success) {
      toast.error(response.message)

      return
    }

    toast.success(response.message)
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Adicionar ao carrinho
    </Button>
  )
}
