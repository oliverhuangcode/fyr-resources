'use client'

import { useState, useEffect } from 'react'

const COMPLETED_LESSONS_KEY = 'completedLessons'
const COMPLETED_TICKETS_KEY = 'completedTickets'

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
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [completedTickets, setCompletedTickets] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setCompletedLessons(readArray(COMPLETED_LESSONS_KEY))
    setCompletedTickets(readArray(COMPLETED_TICKETS_KEY))
    setHydrated(true)
  }, [])

  function completeLesson(lessonId: string) {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev
      const next = [...prev, lessonId]
      writeArray(COMPLETED_LESSONS_KEY, next)
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

  function isLessonCompleted(lessonId: string): boolean {
    return completedLessons.includes(lessonId)
  }

  function isTicketCompleted(ticketId: string): boolean {
    return completedTickets.includes(ticketId)
  }

  return {
    completedLessons,
    completedTickets,
    hydrated,
    completeLesson,
    completeTicket,
    isLessonCompleted,
    isTicketCompleted,
  }
}
