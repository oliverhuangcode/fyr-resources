'use client'

import type { Lesson } from '@/types'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'
import { LessonCard } from '@/components/LessonCard'

interface LessonListProps {
  lessons: Lesson[]
}

export function LessonList({ lessons }: LessonListProps) {
  const { isLessonCompleted, hydrated } = useProgress()

  const completedCount = lessons.filter(l => isLessonCompleted(l.id)).length

  if (!hydrated) {
    return (
      <div>
        <div className="h-8 bg-surface border border-subtle rounded mb-6 animate-pulse" />
        <div className="space-y-3">
          {lessons.map(l => (
            <div key={l.id} className="h-24 bg-surface border border-subtle rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <ProgressBar completed={completedCount} total={lessons.length} />
      </div>
      <div className="space-y-3">
        {lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={isLessonCompleted(lesson.id)}
          />
        ))}
      </div>
    </div>
  )
}
