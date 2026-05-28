'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Camera,
  BookText,
  PenTool,
  Mic,
  Headphones,
  Layers,
  Brain,
  History,
  Menu,
  X,
  Home,
  HelpCircle,
  User,
  FileAudio,
  RotateCcw,
  BookMarked,
  Map,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/dashboard/scene', icon: Camera, label: 'Scene Learning' },
  { path: '/dashboard/vocabulary', icon: BookText, label: 'Vocabulary' },
  { path: '/dashboard/grammar', icon: Brain, label: 'Grammar' },
  { path: '/dashboard/reading', icon: BookOpen, label: 'Reading' },
  { path: '/dashboard/writing', icon: PenTool, label: 'Writing' },
  { path: '/dashboard/speaking', icon: Mic, label: 'Speaking' },
  { path: '/dashboard/listening', icon: Headphones, label: 'Listening' },
  { path: '/dashboard/flashcards', icon: Layers, label: 'Flashcards' },
  { path: '/dashboard/quiz', icon: HelpCircle, label: 'Quiz' },
  { path: '/dashboard/dictation', icon: FileAudio, label: 'Dictation' },
  { path: '/dashboard/review', icon: RotateCcw, label: 'SRS Review' },
  { path: '/dashboard/notebook', icon: BookMarked, label: 'Sổ Tay' },
  { path: '/dashboard/learning-path', icon: Map, label: 'Lộ Trình' },
  { path: '/dashboard/journey', icon: Sparkles, label: 'Hành Trình' },
  { path: '/dashboard/history', icon: History, label: 'History' },
  { path: '/dashboard/profile', icon: User, label: 'Profile' },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(path)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-base">LinguaSnap</span>}
        </Link>

      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              isActive(item.path)
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-card border shadow-md flex items-center justify-center ml-auto"
      >
        <PanelLeftOpen className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[260px] bg-card border-r z-50"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center ml-auto"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r bg-card h-screen sticky top-0 transition-all duration-300 ease-in-out relative group',
          collapsed ? 'w-[72px]' : 'w-[260px]'
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
          'absolute top-4 z-50 hidden lg:flex h-7 w-7 rounded-lg border bg-background/90 backdrop-blur shadow-md items-center justify-center transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95',

          collapsed
            ? '-right-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
            : 'right-4 opacity-100'
        )}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        <SidebarContent />
      </aside>
    </>
  )
}