'use client'

import { useProgress } from '@/hooks/useProgress'

interface MarkLessonCompleteProps {
  lessonId: string
}

export function MarkLessonComplete({ lessonId }: MarkLessonCompleteProps) {
  const { completeLesson, isLessonCompleted, hydrated } = useProgress()

  if (!hydrated) {
    return (
      <button
        disabled
        className="border border-subtle text-muted font-semibold px-6 py-3 rounded-md opacity-50 cursor-not-allowed"
        aria-label="Loading..."
      >
        Mark Complete
      </button>
    )
  }

  const completed = isLessonCompleted(lessonId)

  if (completed) {
    return (
      <span className="text-accent font-semibold text-base" aria-live="polite">
        ✓ Completed
      </span>
    )
  }

  return (
    <button
      onClick={() => completeLesson(lessonId)}
      className="bg-accent text-base font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
      aria-label="Mark this lesson as complete"
    >
      Mark Complete
    </button>
  )
}
