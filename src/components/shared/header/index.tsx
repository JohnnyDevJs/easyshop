import { ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'

import Logo from '@/assets/images/logo.svg'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Logo width="38" height="38" />
            <span className="text-md ml-3 hidden font-bold lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="space-x-2">
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
        </div>
      </div>
    </header>
  )
}
