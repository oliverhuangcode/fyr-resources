'use client'

import { useState, useEffect } from 'react'
import { lessons } from '@/data/lessons'
import { tracks } from '@/data/tracks'

const COMPLETED_LESSONS_KEY = 'completedLessons'
const UNLOCKED_LESSONS_KEY = 'unlockedLessons'
const COMPLETED_TICKETS_KEY = 'completedTickets'

function getStage1LessonIds(): string[] {
  return lessons.filter(l => l.stage === 1).map(l => l.id)
}

function getNextLessonId(lessonId: string): string | null {
  for (const track of tracks) {
    const idx = track.lessons.indexOf(lessonId)
    if (idx !== -1 && idx < track.lessons.length - 1) {
      return track.lessons[idx + 1]
    }
  }
  return null
}

function readArray(key: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeArray(key: string, value: string[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or blocked — silently fail
  }
}

export function useProgress() {
  const stage1Ids = getStage1LessonIds()

  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>(stage1Ids)
  const [completedTickets, setCompletedTickets] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readArray(UNLOCKED_LESSONS_KEY)
    const unlocked = stored.length > 0 ? stored : stage1Ids
    setCompletedLessons(readArray(COMPLETED_LESSONS_KEY))
    setUnlockedLessons(unlocked)
    setCompletedTickets(readArray(COMPLETED_TICKETS_KEY))
    setHydrated(true)
  // stage1Ids is derived from module-level data — stable across renders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function completeLesson(lessonId: string) {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev
      const next = [...prev, lessonId]
      writeArray(COMPLETED_LESSONS_KEY, next)
      return next
    })
    setUnlockedLessons(prev => {
      const nextLessonId = getNextLessonId(lessonId)
      if (!nextLessonId || prev.includes(nextLessonId)) return prev
      const next = [...prev, nextLessonId]
      writeArray(UNLOCKED_LESSONS_KEY, next)
      return next
    })
  }

  function completeTicket(ticketId: string) {
    setCompletedTickets(prev => {
      if (prev.includes(ticketId)) return prev
      const next = [...prev, ticketId]
      writeArray(COMPLETED_TICKETS_KEY, next)
      return next
    })
  }

  function isLessonUnlocked(lessonId: string): boolean {
    return unlockedLessons.includes(lessonId)
  }

  function isLessonCompleted(lessonId: string): boolean {
    return completedLessons.includes(lessonId)
  }

  function isTicketCompleted(ticketId: string): boolean {
    return completedTickets.includes(ticketId)
  }

  return {
    completedLessons,
    unlockedLessons,
    completedTickets,
    hydrated,
    completeLesson,
    completeTicket,
    isLessonUnlocked,
    isLessonCompleted,
    isTicketCompleted,
  }
}
