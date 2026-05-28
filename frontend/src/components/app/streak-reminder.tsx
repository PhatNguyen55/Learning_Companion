'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, X } from 'lucide-react'
import { startOfDay } from 'date-fns'

const MESSAGES = [
  'Đừng để chuỗi ngày học của bạn bị gián đoạn! Chỉ 10 phút thôi 🔥',
  'Hôm nay bạn chưa học bài nào. Một bài ngắn cũng đủ duy trì thói quen! 💪',
  'Streak của bạn đang chờ! Hãy học một chút để giữ vững phong độ 🎯',
  'Mỗi ngày một ít, tiến bộ mỗi ngày. Bắt đầu nào! ✨',
]

interface HistoryItem {
  created_date: string
}

export default function StreakReminder({ history = [] }: { history: HistoryItem[] }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const today = startOfDay(new Date()).getTime()
    const hasToday = history.some(
      (h) => startOfDay(new Date(h.created_date)).getTime() === today
    )
    if (!hasToday && history.length > 0) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [history, dismissed])

  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-streak/30 shadow-xl shadow-streak/10">
            <div className="w-9 h-9 rounded-full bg-streak/15 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-streak" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Nhắc nhở học tập
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {msg}
              </p>
            </div>
            <button
              onClick={() => {
                setVisible(false)
                setDismissed(true)
              }}
              className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center shrink-0 mt-0.5"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}