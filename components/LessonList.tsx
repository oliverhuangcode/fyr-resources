'use client'

import type { Lesson, Ticket } from '@/types'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'
import { LessonCard } from '@/components/LessonCard'
import { TicketCard } from '@/components/TicketCard'

interface LessonListProps {
  lessons: Lesson[]
  interleaveTickets?: Ticket[]
}

export function LessonList({ lessons, interleaveTickets = [] }: LessonListProps) {
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
        {lessons.map(lesson => {
          const afterThisStage = interleaveTickets.filter(t => t.afterStage === lesson.stage)
          return (
            <div key={lesson.id}>
              <LessonCard
                lesson={lesson}
                isCompleted={isLessonCompleted(lesson.id)}
              />
              {afterThisStage.map(ticket => (
                <div key={ticket.id} className="mt-3">
                  <TicketCard ticket={ticket} />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
