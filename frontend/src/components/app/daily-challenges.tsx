'use client'

import { useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Zap, CheckCircle2, Trophy, Star, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'sonner'
// import { api } from '@/lib/api'

interface Task {
  id: string
  label: string
  activity_type: string
  xp: number
  icon: string
  link: string
  completed?: boolean
  completed_at?: string
}

interface DailyChallenge {
  id: string
  date: string
  tasks: Task[]
  all_completed: boolean
  bonus_xp_claimed: boolean
  badge_earned?: string
}

interface LearningHistory {
  created_date: string
  activity_type: string
}

const TASK_POOL: Task[] = [
  { id: 't1', label: 'Học 10 từ vựng mới', activity_type: 'vocabulary', xp: 30, icon: '📚', link: '/dashboard/vocabulary' },
  { id: 't2', label: 'Hoàn thành 1 bài Grammar', activity_type: 'grammar', xp: 25, icon: '✏️', link: '/dashboard/grammar' },
  { id: 't3', label: 'Ôn lại Flashcard (5 thẻ)', activity_type: 'flashcard', xp: 20, icon: '🃏', link: '/dashboard/flashcards' },
  { id: 't4', label: 'Làm 1 bài Quiz', activity_type: 'quiz', xp: 40, icon: '🧠', link: '/dashboard/quiz' },
  { id: 't5', label: 'Luyện Writing 1 đoạn', activity_type: 'writing', xp: 35, icon: '🖊️', link: '/dashboard/writing' },
  { id: 't6', label: 'Nghe 1 bài Listening', activity_type: 'listening', xp: 30, icon: '🎧', link: '/dashboard/listening' },
  { id: 't7', label: 'Luyện Speaking 5 phút', activity_type: 'speaking', xp: 35, icon: '🎤', link: '/dashboard/speaking' },
  { id: 't8', label: 'Đọc 1 bài Reading', activity_type: 'reading', xp: 30, icon: '📖', link: '/dashboard/reading' },
  { id: 't9', label: 'Thực hành Dictation', activity_type: 'dictation', xp: 25, icon: '🎙️', link: '/dashboard/dictation' },
  { id: 't10', label: 'Ôn SRS Review (5 thẻ)', activity_type: 'flashcard', xp: 20, icon: '🔁', link: '/dashboard/review' },
]

const BADGES = ['⚡ Tia Chớp', '🔥 Bốc Lửa', '🌟 Siêu Sao', '💎 Kim Cương', '🏆 Vô Địch', '🚀 Tên Lửa']

function pickDailyTasks(dateStr: string): Task[] {
  // Deterministic pick based on date so tasks are same all day
  const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0)
  const pool = [...TASK_POOL]
  const picked: Task[] = []
  let s = seed
  while (picked.length < 3 && pool.length > 0) {
    const idx = s % pool.length
    picked.push(pool.splice(idx, 1)[0])
    s = (s * 31 + 7) % 997
  }
  return picked
}

interface DailyChallengesProps {
  history?: LearningHistory[]
}

export default function DailyChallenges({ history = [] }: DailyChallengesProps) {
  const queryClient = useQueryClient()
  const today = format(new Date(), 'yyyy-MM-dd')

  // TODO: Fetch from API
  const { data: challenges = [] } = useQuery<DailyChallenge[]>({
    queryKey: ['daily-challenges'],
    queryFn: async (): Promise<DailyChallenge[]> => {
      try {
        // const response = await api.get('/api/daily-challenges')
        // return response.data || []
        return []
      } catch (error) {
        console.error('Failed to fetch daily challenges:', error)
        return []
      }
    },
  })

  const todayChallenge = challenges.find((c: DailyChallenge) => c.date === today)

  // Auto-detect completions from today's history
  const todayActivityTypes = useMemo(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd')
    return new Set(
      history
        .filter((h) => h.created_date?.startsWith(todayStr))
        .map((h) => h.activity_type)
    )
  }, [history])

  const createMutation = useMutation({
    mutationFn: async (data: Partial<DailyChallenge>) => {
      // const response = await api.post('/api/daily-challenges', data)
      // return response.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['daily-challenges'] }),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DailyChallenge> }) => {
      // const response = await api.patch(`/api/daily-challenges/${id}`, data)
      // return response.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['daily-challenges'] }),
  })

  // Initialize today's challenge if not exists
  useEffect(() => {
    if (challenges.length > 0 && !todayChallenge) {
      const tasks = pickDailyTasks(today)
      createMutation.mutate({
        date: today,
        tasks: tasks.map((t) => ({ ...t, completed: false })),
        all_completed: false,
        bonus_xp_claimed: false,
      })
    }
  }, [challenges, todayChallenge, today])

  // Sync auto-completions from history
  // useEffect(() => {
  //   if (!todayChallenge || todayChallenge.all_completed) return
  //   const tasks = todayChallenge.tasks || []
  //   let changed = false
  //   const updated = tasks.map((t) => {
  //     if (!t.completed && todayActivityTypes.has(t.activity_type)) {
  //       changed = true
  //       return { ...t, completed: true, completed_at: new Date().toISOString() }
  //     }
  //     return t
  //   })
  //   if (!changed) return
  //   const allDone = updated.every((t) => t.completed)
  //   const badge =
  //     allDone && !todayChallenge.all_completed
  //       ? BADGES[Math.floor(Math.random() * BADGES.length)]
  //       : todayChallenge.badge_earned
  //   updateMutation.mutate({
  //     id: todayChallenge.id,
  //     data: { tasks: updated, all_completed: allDone, badge_earned: badge },
  //   })
  //   if (allDone && !todayChallenge.all_completed) {
  //     toast.success(
  //       `🎉 Hoàn thành tất cả thử thách hôm nay! Bạn nhận được danh hiệu ${badge}`
  //     )
  //   }
  // }, [todayActivityTypes, todayChallenge])

  const tasks: Task[] =
    todayChallenge?.tasks ||
    pickDailyTasks(today).map((t: Task) => ({ ...t, completed: false }))
  const completedCount = tasks.filter(
    (t: Task) => t.completed || todayActivityTypes.has(t.activity_type)
  ).length
  const totalXP = tasks.reduce((sum: number, t: Task) => sum + (t.xp || 0), 0)
  const earnedXP = tasks
    .filter((t: Task) => t.completed || todayActivityTypes.has(t.activity_type))
    .reduce((sum: number, t: Task) => sum + (t.xp || 0), 0)
  const allDone = completedCount === tasks.length
  const bonusXP = 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="h-full"
    >
      <Card className="p-5 h-full border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-background overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="font-bold text-sm">Thử Thách Hôm Nay</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-amber-500">
              {/* {earnedXP} */20}
              <span className="text-xs font-normal text-muted-foreground">
                {/* /{totalXP + bonusXP} XP */ 30}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {/* {completedCount}/{tasks.length} nhiệm vụ */ 3/5}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-amber-500 rounded-full"
            initial={{ width: 0 }}
            // animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Tasks */}
        <div className="space-y-2 flex-1">
          {tasks.map((task: Task, i: number) => {
            const done = task.completed || todayActivityTypes.has(task.activity_type)
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={done ? '#' : (task.link || '/dashboard')} onClick={(e) => done && e.preventDefault()}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      done
                        ? 'bg-green-500/8 border-green-500/30 opacity-80'
                        : 'bg-card border-border hover:bg-muted hover:border-amber-500/30 cursor-pointer'
                    }`}
                  >
                    <span className="text-lg leading-none">{task.icon}</span>
                    <p
                      className={`flex-1 text-sm font-medium ${
                        done ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {task.label}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-amber-500">
                        +{task.xp} XP
                      </span>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bonus XP row */}
        <div
          className={`mt-3 flex items-center gap-2 p-2.5 rounded-xl border ${
            allDone
              ? 'border-amber-500/40 bg-amber-500/10'
              : 'border-dashed border-border opacity-60'
          }`}
        >
          <Star
            className={`w-4 h-4 shrink-0 ${
              allDone ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
            }`}
          />
          <p className="text-xs flex-1">
            Hoàn thành cả 3 → nhận thêm{' '}
            <span className="font-bold text-amber-500">+{bonusXP} XP</span> bonus
          </p>
          {allDone && todayChallenge?.badge_earned && (
            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 text-xs">
              {todayChallenge.badge_earned}
            </Badge>
          )}
          {allDone && <Trophy className="w-4 h-4 text-amber-500 shrink-0" />}
        </div>
      </Card>
    </motion.div>
  )
}