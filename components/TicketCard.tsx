import Link from 'next/link'
import type { Ticket } from '@/types'

interface TicketCardProps {
  ticket: Ticket
}

const DIFFICULTY_BADGE: Record<Ticket['difficulty'], string> = {
  starter: 'border border-subtle text-muted text-xs px-2 py-0.5 rounded',
  intermediate: 'border border-accent text-accent text-xs px-2 py-0.5 rounded',
  advanced: 'border border-accent text-accent text-xs font-semibold px-2 py-0.5 rounded',
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <div className="bg-surface border border-subtle rounded-lg p-5 hover:border-accent transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-muted text-xs uppercase tracking-wide mb-1">Ticket</p>
            <p className="text-primary font-medium">{ticket.title}</p>
          </div>
          <span className={DIFFICULTY_BADGE[ticket.difficulty]} aria-label={`Difficulty: ${ticket.difficulty}`}>
            {ticket.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
