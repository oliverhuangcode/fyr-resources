'use client'

import { useProgress } from '@/hooks/useProgress'

interface MarkTicketCompleteProps {
  ticketId: string
}

export function MarkTicketComplete({ ticketId }: MarkTicketCompleteProps) {
  const { completeTicket, isTicketCompleted, hydrated } = useProgress()

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

  const completed = isTicketCompleted(ticketId)

  if (completed) {
    return (
      <span className="text-accent font-semibold text-base" aria-live="polite">
        ✓ Completed
      </span>
    )
  }

  return (
    <button
      onClick={() => completeTicket(ticketId)}
      className="bg-accent text-base font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
      aria-label="Mark this ticket as complete"
    >
      Mark Complete
    </button>
  )
}
