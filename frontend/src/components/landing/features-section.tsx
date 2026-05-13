'use client'

import { Camera, BookOpen, PenTool, Mic, Headphones, Layers, Brain, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: Camera, title: 'Scene Learning', desc: 'Upload any photo and learn English from real-life scenes with AI-powered explanations.', color: 'bg-primary/10 text-primary' },
  { icon: BookOpen, title: 'Vocabulary Builder', desc: 'Build your word bank with contextual learning, definitions, and example sentences.', color: 'bg-blue-500/10 text-blue-600' },
  { icon: PenTool, title: 'Writing Practice', desc: 'Write essays and get instant AI feedback with corrections and improvement tips.', color: 'bg-green-500/10 text-green-600' },
  { icon: Mic, title: 'Speaking Skills', desc: 'Practice conversations and pronunciation with AI-guided speaking exercises.', color: 'bg-orange-500/10 text-orange-600' },
  { icon: Headphones, title: 'Listening Drills', desc: 'Sharpen your ear with comprehension exercises and real-world audio scenarios.', color: 'bg-purple-500/10 text-purple-600' },
  { icon: Layers, title: 'Smart Flashcards', desc: 'Auto-generated flashcards with spaced repetition for long-term memory.', color: 'bg-pink-500/10 text-pink-600' },
  { icon: Brain, title: 'Grammar Mastery', desc: 'Interactive grammar lessons that adapt to your level and learning pace.', color: 'bg-cyan-500/10 text-cyan-600' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Track your learning journey with detailed analytics and streaks.', color: 'bg-amber-500/10 text-amber-600' },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Everything You Need</p>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold tracking-tight">
            A complete toolkit to
            <br />
            <span className="text-primary italic">master English.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From scene-based learning to AI-powered writing feedback — all the tools to take your English to the next level.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-card border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}