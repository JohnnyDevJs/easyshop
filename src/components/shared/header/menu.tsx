import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ModeToggle } from './mode-toggle'

export function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden w-full max-w-xs gap-1 md:flex">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> Carrinho
          </Link>
        </Button>

        <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> Entrar
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <div className="flex w-full items-center justify-between">
              <ModeToggle />

              <div className="space-x-2">
                <Button asChild variant="secondary">
                  <Link href="/cart">
                    <ShoppingCart /> Carrinho
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-in">
                    <UserIcon /> Entrar
                  </Link>
                </Button>
              </div>
            </div>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
