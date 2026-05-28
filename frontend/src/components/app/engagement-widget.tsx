'use client'

import { useMemo } from 'react'
import { Flame, Zap, Star, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { format, subDays, startOfDay, eachDayOfInterval, isSameDay } from 'date-fns'

const XP_MAP: Record<string, number> = {
  scene: 50,
  vocabulary: 20,
  grammar: 30,
  reading: 30,
  writing: 40,
  speaking: 40,
  listening: 30,
  flashcard: 10,
  quiz: 60,
}

const LEVELS = [
  { name: 'Beginner', minXP: 0, maxXP: 200 },
  { name: 'Elementary', minXP: 200, maxXP: 500 },
  { name: 'Pre-Intermediate', minXP: 500, maxXP: 1000 },
  { name: 'Intermediate', minXP: 1000, maxXP: 2000 },
  { name: 'Upper-Intermediate', minXP: 2000, maxXP: 3500 },
  { name: 'Advanced', minXP: 3500, maxXP: 5000 },
  { name: 'Proficient', minXP: 5000, maxXP: Infinity },
]

interface HistoryItem {
  id: string
  activity_type: string
  created_date: string
}

function computeStreak(history: HistoryItem[]) {
  if (!history.length) return 0
  const days = new Set(
    history.map((h) => new Date(h.created_date).toDateString())
  )
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (days.has(d.toDateString())) streak++
    else if (i > 0) break
  }
  return streak
}

function computeXP(history: HistoryItem[]) {
  return history.reduce((sum, h) => sum + (XP_MAP[h.activity_type] || 20), 0)
}

function getLevel(xp: number) {
  return LEVELS.findLast((l) => xp >= l.minXP) || LEVELS[0]
}

function MiniHeatmap({ history }: { history: HistoryItem[] }) {
  const activityMap = useMemo(() => {
    const m: Record<string, number> = {}
    history.forEach((h) => {
      const k = format(new Date(h.created_date), 'yyyy-MM-dd')
      m[k] = (m[k] || 0) + 1
    })
    return m
  }, [history])

  const today = new Date()
  const days = eachDayOfInterval({ start: subDays(today, 34), end: today })
  const maxAct = Math.max(...Object.values(activityMap), 1)

  const firstDow = days[0].getDay()
  const padCount = firstDow === 0 ? 6 : firstDow - 1
  const grid = [...Array(padCount).fill(null), ...days]
  const weeks = []
  for (let i = 0; i < grid.length; i += 7) weeks.push(grid.slice(i, i + 7))

  const getColor = (count: number) => {
    if (!count) return 'bg-muted'
    const r = count / maxAct
    if (r >= 0.75) return 'bg-primary'
    if (r >= 0.5) return 'bg-primary/70'
    if (r >= 0.25) return 'bg-primary/40'
    return 'bg-primary/20'
  }

  return (
    <div className="flex gap-0.5">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="w-2 h-2" />
            const key = format(day, 'yyyy-MM-dd')
            const count = activityMap[key] || 0
            const isToday = isSameDay(day, today)
            return (
              <motion.div
                key={di}
                whileHover={{ scale: 1.4 }}
                title={`${format(day, 'MMM d')}: ${count}`}
                className={`w-2 h-2 rounded-sm cursor-pointer ${getColor(count)} ${
                  isToday
                    ? 'ring-1 ring-primary ring-offset-1 ring-offset-background'
                    : ''
                }`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function EngagementWidget({ history = [] }: { history: HistoryItem[] }) {
  const streak = computeStreak(history)
  const totalXP = computeXP(history)
  const level = getLevel(totalXP)
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1]
  const progress = nextLevel
    ? Math.round(
        ((totalXP - level.minXP) / (nextLevel.minXP - level.minXP)) * 100
      )
    : 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="p-4 bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 overflow-hidden">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Streak */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame
                className={`w-5 h-5 ${
                  streak > 0 ? 'text-orange-500' : 'text-muted-foreground'
                }`}
              />
            </div>
            <div>
              <p className="text-xl font-bold leading-none">{streak}</p>
              <p className="text-[11px] text-muted-foreground">
                Day streak{streak >= 3 ? ' 🔥' : ''}
              </p>
            </div>
          </div>

          <div className="w-px h-8 bg-border hidden sm:block" />

          {/* XP */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold leading-none">
                {totalXP.toLocaleString()}
              </p>
              <p className="text-[11px] text-muted-foreground">Total XP</p>
            </div>
          </div>

          <div className="w-px h-8 bg-border hidden sm:block" />

          {/* Level + progress */}
          <div className="flex items-center gap-2.5 flex-1 min-w-[160px]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold truncate">{level.name}</p>
                <p className="text-[11px] text-muted-foreground ml-2 shrink-0">
                  {nextLevel ? `${progress}%` : 'Max'}
                </p>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              {nextLevel && (
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {nextLevel.minXP - totalXP} XP → {nextLevel.name}
                </p>
              )}
            </div>
          </div>

        </div>
      </Card>
    </motion.div>
  )
}