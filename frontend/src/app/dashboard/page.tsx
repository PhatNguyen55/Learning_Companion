'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Layers,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Camera,
  BookText,
  Brain,
  PenTool,
  Mic,
  Headphones,
  Flame,
} from 'lucide-react'
import Link from 'next/link'
import EngagementWidget from '@/components/app/engagement-widget'
import DailyChallenges from '@/components/app/daily-challenges'
import StreakReminder from '@/components/app/streak-reminder'
import Heatmap from '@/components/app/heatmap'
import LearningTimeline from '@/components/app/learning-timeline'
import { format } from 'date-fns'

const quickActions = [
  {
    path: '/dashboard/scene',
    icon: Camera,
    label: 'Scene Learning',
    desc: 'Upload a photo',
    color: 'bg-primary/10 text-primary',
  },
  {
    path: '/dashboard/vocabulary',
    icon: BookText,
    label: 'Vocabulary',
    desc: 'Learn new words',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    path: '/dashboard/grammar',
    icon: Brain,
    label: 'Grammar',
    desc: 'Practice grammar',
    color: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    path: '/dashboard/writing',
    icon: PenTool,
    label: 'Writing',
    desc: 'Write & get feedback',
    color: 'bg-green-500/10 text-green-600',
  },
  {
    path: '/dashboard/speaking',
    icon: Mic,
    label: 'Speaking',
    desc: 'Practice speaking',
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    path: '/dashboard/listening',
    icon: Headphones,
    label: 'Listening',
    desc: 'Listening drills',
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    path: '/dashboard/flashcards',
    icon: Layers,
    label: 'Flashcards',
    desc: 'Review cards',
    color: 'bg-pink-500/10 text-pink-600',
  },
  {
    path: '/dashboard/quiz',
    icon: HelpCircle,
    label: 'Quiz',
    desc: 'Test knowledge',
    color: 'bg-amber-500/10 text-amber-600',
  },
]

type ActivityType =
  | 'scene'
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'listening'
  | 'flashcard'
  | 'quiz'
  | 'dictation'
  | 'review'

interface LearningHistory {
  id: string
  title: string
  activity_type: ActivityType
  score?: number
  created_date: string
}

interface QuizResult {
  id: string
  score: number
  created_date: string
}

export default function DashboardPage() {
  const [history, setHistory] = useState<LearningHistory[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch từ Python backend
    // const fetchData = async () => {
    //   try {
    //     const [historyRes, quizRes, flashcardsRes] = await Promise.all([
    //       api.get('/api/learning-history'),
    //       api.get('/api/quiz-results'),
    //       api.get('/api/flashcards')
    //     ])
    //     setHistory(historyRes.data)
    //     setQuizResults(quizRes.data)
    //     setFlashcards(flashcardsRes.data)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchData()

    // 🔧 FAKE DATA - Dùng để test LearningTimeline component
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const threeDaysAgo = new Date(today)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    // Tạo dữ liệu học tập giả để test
    const fakeHistory: LearningHistory[] = [
      // Hôm nay
      {
        id: '1',
        title: 'Scene Learning: Coffee Shop',
        activity_type: 'scene',
        score: 85,
        created_date: today.toISOString(),
      },
      {
        id: '2',
        title: 'Vocabulary: Food & Drinks',
        activity_type: 'vocabulary',
        score: 92,
        created_date: today.toISOString(),
      },
      // Hôm qua
      {
        id: '3',
        title: 'Grammar: Present Perfect',
        activity_type: 'grammar',
        score: 78,
        created_date: yesterday.toISOString(),
      },
      {
        id: '4',
        title: 'Speaking Practice',
        activity_type: 'speaking',
        created_date: yesterday.toISOString(),
      },
      {
        id: '5',
        title: 'Flashcard Review: Phrasal Verbs',
        activity_type: 'flashcard',
        created_date: yesterday.toISOString(),
      },
      // 2 ngày trước
      {
        id: '6',
        title: 'Quiz: English Basics',
        activity_type: 'quiz',
        score: 88,
        created_date: twoDaysAgo.toISOString(),
      },
      {
        id: '7',
        title: 'Listening: Podcast Lesson',
        activity_type: 'listening',
        created_date: twoDaysAgo.toISOString(),
      },
      // 3 ngày trước
      {
        id: '8',
        title: 'Writing: Daily Journal',
        activity_type: 'writing',
        created_date: threeDaysAgo.toISOString(),
      },
      {
        id: '9',
        title: 'Reading: Short Story',
        activity_type: 'reading',
        score: 90,
        created_date: threeDaysAgo.toISOString(),
      },
    ]

    // Dữ liệu kết quả quiz giả
    const fakeQuizResults: QuizResult[] = [
      {
        id: 'q1',
        score: 88,
        created_date: twoDaysAgo.toISOString(),
      },
      {
        id: 'q2',
        score: 92,
        created_date: yesterday.toISOString(),
      },
      {
        id: 'q3',
        score: 85,
        created_date: today.toISOString(),
      },
    ]

    // Dữ liệu flashcard giả
    const fakeFlashcards = [
      { id: 'fc1', front: 'Hello', back: 'Xin chào' },
      { id: 'fc2', front: 'Thank you', back: 'Cảm ơn' },
      { id: 'fc3', front: 'Good morning', back: 'Chào buổi sáng' },
      { id: 'fc4', front: 'How are you?', back: 'Bạn khỏe không?' },
      { id: 'fc5', front: 'Nice to meet you', back: 'Rất vui gặp bạn' },
    ]

    // Set fake data vào state
    setHistory(fakeHistory)
    setQuizResults(fakeQuizResults)
    setFlashcards(fakeFlashcards)
    /////
    setLoading(false)
  }, [])

  const stats = [
    {
      label: 'Lessons Completed',
      value: history.length,
      icon: BookOpen,
      color: 'text-primary',
    },
    {
      label: 'Flashcards',
      value: flashcards.length,
      icon: Layers,
      color: 'text-pink-600',
    },
    {
      label: 'Quizzes Taken',
      value: quizResults.length,
      icon: HelpCircle,
      color: 'text-amber-600',
    },
    {
      label: 'Avg Score',
      value:
        quizResults.length > 0
          ? Math.round(
              quizResults.reduce((a, b) => a + (b.score || 0), 0) /
                quizResults.length
            ) + '%'
          : '—',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ]

  const streak = useMemo(() => {
    const days = new Set(history.map(h => new Date(h.created_date).toDateString()));
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (days.has(d.toDateString())) s++;
      else if (i > 0) break;
    }
    return s;
  }, [history]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back! 👋</h1>
        <p className="text-muted-foreground mt-1">
          Continue your English learning journey
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Hôm Nay</h2>
        <span className="text-sm text-muted-foreground">{format(new Date(), 'EEEE, dd/MM/yyyy')}</span>
      </div>

      {/* Engagement Widget */}
      <EngagementWidget history={history} />

      {/* Heatmap + Daily Challenges side by side */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="lg:w-[60%]">
          <Heatmap history={history} />
        </div>
        <div className="lg:w-[40%]">
          <DailyChallenges history={history} />
        </div>
      </div>

      {/* Streak reminder */}
      <StreakReminder history={history} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                <Flame className="w-4 h-4 text-muted-foreground/30" />
              </div>
              <div className="flex1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
            >
              <Link href={action.path}>
                <Card className="relative p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer group h-full flex flex-col">
                  {/* Arrow Icon - Top Right Corner */}
                  <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="w-4.5 h-4.5" />
                  </div>
                  
                  {/* Content - Flexible space */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">{action.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <LearningTimeline history={history} quizResults={quizResults} streak={streak} />
    </div>
  )
}