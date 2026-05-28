import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinguaSnap - Learning Companion',
  description: 'AI-powered English learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}