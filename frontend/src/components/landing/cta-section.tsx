'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative bg-primary rounded-3xl p-12 md:p-16 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
              Ready to transform how
              <br />
              you learn English?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Join thousands of learners who are mastering English through real-life scenes and AI-powered lessons.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="mt-8 rounded-full px-8 text-base h-12 gap-2">
                Start Learning Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}