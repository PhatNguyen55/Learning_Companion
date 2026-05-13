'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Minh Anh',
    role: 'University Student',
    text: 'I upload photos from my daily life and learn English naturally. It\'s like having a personal tutor available 24/7!',
    avatar: 'MA',
  },
  {
    name: 'Thu Hà',
    role: 'Office Worker',
    text: 'The scene-based learning approach is genius. I take photos at coffee shops and learn business English vocabulary.',
    avatar: 'TH',
  },
  {
    name: 'Đức Anh',
    role: 'High School Student',
    text: 'Flashcards with spaced repetition helped me memorize 500+ new words in just 2 months. My IELTS score improved from 5.5 to 7.0!',
    avatar: 'ĐA',
  },
  {
    name: 'Linh Chi',
    role: 'Freelancer',
    text: 'The writing feedback is incredibly detailed. It\'s like having an English teacher check my essays instantly.',
    avatar: 'LC',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Loved by Learners</p>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold tracking-tight">
            What our learners
            <br />
            <span className="text-primary italic">are saying.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}