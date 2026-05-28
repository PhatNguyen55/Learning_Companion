'use client'

import { useState, useRef, useEffect } from 'react'
import { LogOut, User, Bell, ChevronDown, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const NOTIFICATIONS = [
  {
    id: 1,
    text: 'You have words due for review!',
    time: 'Now',
    icon: '🔔',
    unread: true,
  },
  {
    id: 2,
    text: 'Keep your streak going today 🔥',
    time: '1h ago',
    icon: '🔥',
    unread: true,
  },
]

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'menu' | 'notifications'>('menu')
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // TODO: Fetch từ API
  const user = {
    full_name: 'User Name',
    email: 'user@example.com',
  }

  useEffect(() => {
    setMounted(true)
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  if (!mounted) return null

  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 h-8 rounded-lg border border-border bg-card hover:bg-muted px-1.5 pr-2 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
          {initials}
        </div>
        <span className="text-xs font-medium hidden sm:block max-w-[80px] truncate">
          {user?.full_name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-64 rounded-2xl border border-border bg-popover shadow-xl z-50 overflow-hidden"
          >
            {/* User header */}
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab('menu')}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  tab === 'menu'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setTab('notifications')}
                className={`flex-1 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  tab === 'notifications'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bell className="w-3 h-3" />
                Thông báo
                <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] flex items-center justify-center font-bold">
                  {NOTIFICATIONS.filter((n) => n.unread).length}
                </span>
              </button>
            </div>

            {tab === 'menu' && (
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  Hồ sơ cá nhân
                </Link>
                <Link
                  href="/dashboard/review"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  SRS Review
                </Link>
                <div className="mx-3 my-1 h-px bg-border" />
                <button
                  onClick={() => {
                    // TODO: Call logout API
                    localStorage.removeItem('auth_token')
                    window.location.href = '/'
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="py-1">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex gap-3 hover:bg-muted transition-colors ${
                      n.unread ? 'bg-primary/5' : ''
                    }`}
                  >
                    <span className="text-lg leading-none shrink-0">
                      {n.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs leading-relaxed">{n.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {n.time}
                      </p>
                    </div>
                    {n.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}