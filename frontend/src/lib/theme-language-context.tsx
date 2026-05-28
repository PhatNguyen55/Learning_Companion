'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ThemeLanguageContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  lang: string
  setLang: (lang: string) => void
  toggleLang: () => void
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(
  undefined
)

export function ThemeLanguageProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [lang, setLangState] = useState('vi')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    const savedLang = localStorage.getItem('lang') || 'vi'
    setTheme(savedTheme)
    setLangState(savedLang)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('lang', lang)
  }, [lang, mounted])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const toggleLang = () => setLangState((l) => (l === 'en' ? 'vi' : 'en'))
  const setLang = (newLang: string) => setLangState(newLang)

  return (
    <ThemeLanguageContext.Provider
      value={{ theme, toggleTheme, lang, setLang, toggleLang }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  )
}

export function useThemeLang() {
  const context = useContext(ThemeLanguageContext)
  if (!context) {
    throw new Error('useThemeLang must be used within ThemeLanguageProvider')
  }
  return context
}