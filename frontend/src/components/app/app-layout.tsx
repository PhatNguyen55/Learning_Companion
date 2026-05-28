'use client'

import { ReactNode } from 'react'
import AppSidebar from './app-sidebar'
import TopBar from './top-bar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-end gap-3 px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
          <TopBar />
        </header>
        <main className="flex-1">
          <div className="p-6 lg:p-8 pt-6 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}