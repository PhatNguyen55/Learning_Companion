'use client'

import { Sun, Moon, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeLang } from '@/lib/theme-language-context'
import { UserMenu } from './user-menu'

const LANGUAGES = [
  { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
]

export default function TopBar() {
  const { theme, toggleTheme, lang, setLang } = useThemeLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="flex items-center gap-2">   
      {/* Language picker */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
        >
          <span className="text-base leading-none">{current.flag}</span>
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
              className="absolute right-0 top-10 w-44 rounded-xl border border-border bg-popover shadow-lg py-1 z-50"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-muted transition-colors ${
                    lang === l.code
                      ? 'text-primary font-semibold'
                      : 'text-foreground'
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-muted-foreground" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-amber-400" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* User menu */}
      <UserMenu />
    </div>
  )
}