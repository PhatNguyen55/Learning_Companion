'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight, Upload, Sparkles, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered English Learning
            </div>

            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Learn English
              <br />
              <span className="text-primary italic">From Real Life</span>
              <br />
              Scenes.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Upload any photo or scene and let AI transform it into a rich English lesson — vocabulary, grammar, conversations, and more.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-8 text-base h-12 gap-2">
                  Start Learning Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12">
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Free to start
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Vietnamese support
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl border shadow-2xl shadow-primary/5 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Upload a scene</p>
                    <p className="text-xs text-muted-foreground">Drop an image to start learning</p>
                  </div>
                </div>

                <div className="aspect-video rounded-2xl bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Drop image here or click to browse</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WEBP</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      V
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vocabulary</p>
                      <p className="text-xs text-muted-foreground">15 new words extracted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-xs font-bold text-accent-foreground">
                      G
                    </div>
                    <div>
                      <p className="text-sm font-medium">Grammar Points</p>
                      <p className="text-xs text-muted-foreground">3 patterns identified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-600">
                      C
                    </div>
                    <div>
                      <p className="text-sm font-medium">Conversation</p>
                      <p className="text-xs text-muted-foreground">AI-generated dialogue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}