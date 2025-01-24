import Link from 'next/link'

import Logo from '@/assets/images/logo.svg'
import { APP_NAME } from '@/lib/constants'

import { Menu } from './menu'

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
        <Menu />
      </div>
    </header>
  )
}
