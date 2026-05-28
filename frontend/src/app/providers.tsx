'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { AuthProvider } from '@/lib/auth-context'
import { ThemeLanguageProvider } from '@/lib/theme-language-context'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeLanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeLanguageProvider>
  )
}