'use client'

import { Upload, Sparkles, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'Upload a scene or photo',
    desc: 'Take a photo of anything — a street, a menu, a classroom — or upload from your gallery.',
    color: 'bg-primary',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'AI creates your lesson',
    desc: 'Our AI identifies objects, context, and generates vocabulary, grammar points, and conversations.',
    color: 'bg-accent',
  },
  {
    num: '03',
    icon: GraduationCap,
    title: 'Learn & practice',
    desc: 'Study with flashcards, take quizzes, practice speaking — all tailored to your scene.',
    color: 'bg-green-500',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Simple Process</p>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold tracking-tight">
            Three steps to
            <br />
            <span className="text-primary italic">start learning.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
              )}
              <div className="bg-card border rounded-2xl p-8 text-center relative hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold text-muted-foreground tracking-widest">STEP {step.num}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}