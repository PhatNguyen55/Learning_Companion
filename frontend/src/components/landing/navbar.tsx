'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { BookOpen, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">LinguaSnap</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Testimonials
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="rounded-full px-5">
              Start Learning Free
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <div className="px-6 py-4 space-y-3">
              <a 
                href="#features" 
                className="block text-sm py-2" 
                onClick={() => setMobileOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block text-sm py-2" 
                onClick={() => setMobileOpen(false)}
              >
                How it works
              </a>
              <a 
                href="#testimonials" 
                className="block text-sm py-2" 
                onClick={() => setMobileOpen(false)}
              >
                Testimonials
              </a>
              <Link href="/dashboard" className="block">
                <Button className="w-full rounded-full">
                  Start Learning Free
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}