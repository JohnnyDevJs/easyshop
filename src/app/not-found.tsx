import Link from 'next/link'

import Logo from '@/assets/images/logo.svg'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo width="38" height="38" />
      <div className="w-1/3 rounded-lg p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold">Página não encontrada.</h1>
        <p className="text-destructive">
          Não foi possível localizar a página da solicitação.
        </p>
        <Button variant="outline" className="ml-2 mt-4" asChild>
          <Link href="/">Voltar para Página inicial</Link>
        </Button>
      </div>
    </div>
  )
}
