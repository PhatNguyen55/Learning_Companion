import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="border-t bg-card py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">LinguaSnap</span>
          </Link>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 LinguaSnap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}