'use client'

import AppLayout from '@/components/app/app-layout'
import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}