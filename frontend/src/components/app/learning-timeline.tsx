'use client';

import React, { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format, isToday, isYesterday } from 'date-fns';
import {
  Camera,
  BookText,
  Brain,
  PenTool,
  Mic,
  Headphones,
  Layers,
  HelpCircle,
  BookOpen,
  FileAudio,
  RotateCcw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Type definitions
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
  | 'review';

type MilestoneType = 'streak' | 'milestone' | 'achievement';

interface ActivityRecord {
  id: string;
  activity_type: ActivityType;
  title: string;
  created_date: string;
  details?: string;
  score?: number;
  time_spent?: number;
}

interface QuizResult {
  score?: number;
}

interface Milestone {
  icon: string;
  text: string;
  type: MilestoneType;
}

// Activity icons mapping
const activityIcons: Record<ActivityType, LucideIcon> = {
  scene: Camera,
  vocabulary: BookText,
  grammar: Brain,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
  listening: Headphones,
  flashcard: Layers,
  quiz: HelpCircle,
  dictation: FileAudio,
  review: RotateCcw,
};

// Activity color mapping
const activityColors: Record<ActivityType, string> = {
  scene: 'bg-primary/10 text-primary',
  vocabulary: 'bg-blue-500/10 text-blue-600',
  grammar: 'bg-cyan-500/10 text-cyan-600',
  reading: 'bg-emerald-500/10 text-emerald-600',
  writing: 'bg-green-500/10 text-green-600',
  speaking: 'bg-orange-500/10 text-orange-600',
  listening: 'bg-purple-500/10 text-purple-600',
  flashcard: 'bg-pink-500/10 text-pink-600',
  quiz: 'bg-amber-500/10 text-amber-600',
  dictation: 'bg-rose-500/10 text-rose-600',
  review: 'bg-gray-500/10 text-gray-600',
};

function getMilestones(
  history: ActivityRecord[],
  quizResults: QuizResult[],
  streak: number
): Milestone[] {
  const milestones: Milestone[] = [];
  if (streak >= 7)
    milestones.push({
      icon: '🔥',
      text: `${streak}-Day Streak!`,
      type: 'streak',
    });
  if (history.length >= 10)
    milestones.push({
      icon: '📚',
      text: '10 buổi học hoàn thành',
      type: 'milestone',
    });
  if (history.length >= 50)
    milestones.push({
      icon: '🏆',
      text: '50 buổi học - Xuất sắc!',
      type: 'milestone',
    });
  if (quizResults.length > 0) {
    const best = Math.max(...quizResults.map((q) => q.score || 0));
    if (best >= 90)
      milestones.push({
        icon: '⭐',
        text: `Điểm Quiz cao nhất: ${best}%`,
        type: 'achievement',
      });
  }
  return milestones;
}

function dateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  if (isToday(d)) return 'Hôm nay';
  if (isYesterday(d)) return 'Hôm qua';
  return format(d, 'EEEE, dd/MM/yyyy');
}

interface LearningTimelineProps {
  history?: ActivityRecord[];
  quizResults?: QuizResult[];
  streak?: number;
  onViewAll?: () => void;
  showAll?: boolean;
}

export default function LearningTimeline({
  history = [],
  quizResults = [],
  streak = 0,
  onViewAll,
  showAll: initialShowAll = false,
}: LearningTimelineProps) {
  const [showAll, setShowAll] = useState(initialShowAll);

  const milestones = useMemo(
    () => getMilestones(history, quizResults, streak),
    [history, quizResults, streak]
  );

  const grouped = useMemo(() => {
    const g: Record<string, ActivityRecord[]> = {};
    history.forEach((h) => {
      const key = h.created_date
        ? format(new Date(h.created_date), 'yyyy-MM-dd')
        : 'unknown';
      if (!g[key]) g[key] = [];
      g[key].push(h);
    });
    const all = Object.entries(g).sort((a, b) =>
      b[0].localeCompare(a[0])
    );
    return showAll ? all : all.slice(0, 3);
  }, [history, showAll]);

  const hasMore = useMemo(() => {
    const g: Record<string, ActivityRecord[]> = {};
    history.forEach((h) => {
      const key = h.created_date
        ? format(new Date(h.created_date), 'yyyy-MM-dd')
        : 'unknown';
      if (!g[key]) g[key] = [];
      g[key].push(h);
    });
    return Object.keys(g).length > 3;
  }, [history]);

  const handleViewAll = () => {
    setShowAll(true);
    onViewAll?.();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Dòng Thời Gian</h2>
        {hasMore && !showAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewAll}
            className="text-xs"
          >
            Xem thêm →
          </Button>
        )}
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 px-3 py-1.5 text-xs gap-1.5">
                <span>{m.icon}</span> {m.text}
              </Badge>
            </motion.div>
          ))}
        </div>
      )}

      {/* Timeline entries */}
      {grouped.length > 0 ? (
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6 ml-10">
            {grouped.map(([date, items], gi) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: gi * 0.06 }}
              >
                {/* Dot */}
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary border-2 border-background mt-1.5" />

                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  {dateLabel(date)}
                </p>
                <div className="space-y-2">
                  {items.map((item) => {
                    const Icon = activityIcons[item.activity_type] || BookOpen;
                    const colorClass =
                      activityColors[item.activity_type] ||
                      'bg-muted text-muted-foreground';
                    return (
                      <Card key={item.id} className="!p-3 !flex !flex-row !items-center !gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.title}
                          </p>
                          {item.details && (
                            <p className="text-xs text-muted-foreground truncate">
                              {item.details}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.score != null && (
                            <Badge variant="outline" className="text-xs">
                              {item.score}%
                            </Badge>
                          )}
                          {item.time_spent && (
                            <span className="text-xs text-muted-foreground">
                              {item.time_spent}m
                            </span>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">Chưa có hoạt động nào</p>
          <p className="text-sm mt-1">
            Bắt đầu học để xây dựng hành trình của bạn!
          </p>
        </Card>
      )}
    </div>
  );
}