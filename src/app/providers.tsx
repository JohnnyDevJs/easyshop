import { AlertCircle } from 'lucide-react'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme-provider'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster
        richColors
        icons={{
          success: <AlertCircle size={18} />,
          error: <AlertCircle size={18} />,
        }}
        toastOptions={{
          classNames: {
            error: '!bg-rose-500 !border-rose-500 !text-white',
            success: '!bg-store !border-store !text-white',
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}
