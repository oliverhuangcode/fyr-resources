'use client'

import Link from 'next/link'
import type { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
  isCompleted: boolean
}

export function LessonCard({ lesson, isCompleted }: LessonCardProps) {
  return (
    <Link href={`/lessons/${lesson.id}`} className="block group">
      <div
        className={`bg-surface border rounded-lg p-5 transition-colors ${
          isCompleted
            ? 'border-accent'
            : 'border-subtle group-hover:border-accent'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                Stage {lesson.stage}
              </span>
            </div>
            <h3 className="font-semibold text-base text-primary mb-1">
              {lesson.title}
            </h3>
            <p className="text-muted text-sm line-clamp-2">{lesson.description}</p>
          </div>

          {isCompleted && (
            <span className="flex-shrink-0 text-accent text-sm font-medium">
              ✓
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
