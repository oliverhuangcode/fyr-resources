'use client'

import Link from 'next/link'
import type { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
  isUnlocked: boolean
  isCompleted: boolean
}

export function LessonCard({ lesson, isUnlocked, isCompleted }: LessonCardProps) {
  const isLocked = !isUnlocked && !isCompleted

  return (
    <Link href={`/lessons/${lesson.id}`} className="block">
      <div
        className={`bg-surface border rounded-lg p-5 transition-colors ${
          isLocked
            ? 'border-subtle opacity-60'
            : isCompleted
            ? 'border-accent'
            : 'border-subtle hover:border-accent'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-muted text-xs font-medium uppercase tracking-wide">
                Stage {lesson.stage}
              </span>
              <span className="text-muted text-xs">{lesson.duration}</span>
            </div>
            <h3
              className={`font-semibold text-base mb-1 ${
                isLocked ? 'text-muted' : 'text-primary'
              }`}
            >
              {lesson.title}
            </h3>
            <p className="text-muted text-sm line-clamp-2">{lesson.description}</p>
          </div>

          <div className="flex-shrink-0">
            {isCompleted ? (
              <span className="text-accent text-sm font-medium">✓ Done</span>
            ) : isLocked ? (
              <span className="text-muted text-xs">Locked</span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  )
}
