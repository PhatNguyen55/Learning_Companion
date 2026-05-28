'use client'

import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  format,
  subDays,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  getMonth,
} from 'date-fns'

interface LearningHistory {
  created_date: string
}

interface ActivityMap {
  [key: string]: number
}

interface MonthMarker {
  ci: number
  label: string
}

const MONTH_LABELS = [
  'T1',
  'T2',
  'T3',
  'T4',
  'T5',
  'T6',
  'T7',
  'T8',
  'T9',
  'T10',
  'T11',
  'T12',
]

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

interface FullHeatmapProps {
  history?: LearningHistory[]
}

export default function Heatmap({ history = [] }: FullHeatmapProps) {
  const today = new Date()

  // Build activity map from history
  const activityMap = useMemo(() => {
    const m: ActivityMap = {}
    history.forEach((h) => {
      const k = format(new Date(h.created_date), 'yyyy-MM-dd')
      m[k] = (m[k] || 0) + 1
    })
    return m
  }, [history])

  // 26 weeks = ~6 months, aligned to Monday
  const startDate = subDays(today, 26 * 7 - 1)
  const alignedStart = startOfWeek(startDate, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: alignedStart, end: today })

  const maxAct = Math.max(...Object.values(activityMap), 1)
  const totalDays = Object.keys(activityMap).filter((k) => {
    const d = new Date(k)
    return d >= alignedStart && d <= today
  }).length
  const totalActivities = Object.values(activityMap).reduce((a, b) => a + b, 0)

  // Get color intensity based on activity count
  const getColor = (count: number): string => {
    if (!count) return 'bg-muted'
    const r = count / maxAct
    if (r >= 0.75) return 'bg-primary'
    if (r >= 0.5) return 'bg-primary/70'
    if (r >= 0.25) return 'bg-primary/40'
    return 'bg-primary/20'
  }

  // Group into columns of 7 (Mon–Sun)
  const columns: Date[][] = []
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7))
  }

  // Month label markers
  const monthMarkers: MonthMarker[] = []
  let lastMonth: number | null = null
  columns.forEach((col, ci) => {
    const month = getMonth(col[0])
    if (month !== lastMonth) {
      monthMarkers.push({ ci, label: MONTH_LABELS[month] })
      lastMonth = month
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="h-full"
    >
      <Card className="p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-sm">Hoạt Động Học Tập</p>
            <p className="text-xs text-muted-foreground">6 tháng gần nhất</p>
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">{totalDays}</span>{' '}
              ngày
            </span>
            <span>
              <span className="font-semibold text-foreground">
                {totalActivities}
              </span>{' '}
              buổi
            </span>
          </div>
        </div>

        {/* Month labels */}
        <div className="flex gap-[3px] mb-0.5 ml-6">
          {columns.map((_, ci) => {
            const marker = monthMarkers.find((m) => m.ci === ci)
            return (
              <div
                key={ci}
                className="flex-1 text-[9px] text-muted-foreground leading-none min-w-0 truncate"
              >
                {marker ? marker.label : ''}
              </div>
            )
          })}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px] flex-1">
          {/* Day-of-week labels */}
          <div className="flex flex-col gap-[3px] mr-1 shrink-0">
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                className={`flex-1 text-[9px] text-muted-foreground leading-none flex items-center ${
                  [0, 2, 4, 6].includes(i) ? '' : 'opacity-0'
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Columns — stretch to fill */}
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-[3px]">
              {col.map((day, di) => {
                const key = format(day, 'yyyy-MM-dd')
                const count = activityMap[key] || 0
                const isToday = isSameDay(day, today)
                const isFuture = day > today
                return (
                  <motion.div
                    key={di}
                    whileHover={{ scale: 1.4 }}
                    title={`${format(day, 'dd/MM/yyyy')}: ${count} buổi học`}
                    className={`flex-1 rounded-sm cursor-pointer transition-colors min-h-[10px]
                      ${isFuture ? 'opacity-0 pointer-events-none' : getColor(count)}
                      ${
                        isToday
                          ? 'ring-1 ring-primary ring-offset-1 ring-offset-background'
                          : ''
                      }
                    `}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 ml-6">
          <span className="text-[10px] text-muted-foreground">Ít</span>
          {[
            'bg-muted',
            'bg-primary/20',
            'bg-primary/40',
            'bg-primary/70',
            'bg-primary',
          ].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span className="text-[10px] text-muted-foreground">Nhiều</span>
        </div>
      </Card>
    </motion.div>
  )
}