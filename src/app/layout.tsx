import '@/assets/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Store',
  description:
    'Sua loja fácil, onde comprar é simples, rápido e sem complicação.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'antialiased')}>{children}</body>
    </html>
  )
}
