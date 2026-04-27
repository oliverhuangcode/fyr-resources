import { notFound } from 'next/navigation'
import Link from 'next/link'
import { tickets } from '@/data/tickets'
import { tracks } from '@/data/tracks'
import { MarkTicketComplete } from '@/components/MarkTicketComplete'
import type { Ticket } from '@/types'

const TASK_LABELS = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

export function generateStaticParams() {
  return tickets.map(t => ({ id: t.id }))
}

const DIFFICULTY_BADGE: Record<Ticket['difficulty'], string> = {
  starter: 'border border-subtle text-muted text-xs px-2 py-0.5 rounded',
  intermediate: 'border border-accent text-accent text-xs px-2 py-0.5 rounded',
  advanced: 'border border-accent text-accent text-xs font-semibold px-2 py-0.5 rounded',
}

interface TicketPageProps {
  params: Promise<{ id: string }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { id } = await params
  const ticket = tickets.find(t => t.id === id)
  if (!ticket) notFound()

  const track = tracks.find(t => t.id === ticket.trackId)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href={`/tracks/${ticket.trackId}`}
          className="text-muted hover:text-primary text-sm transition-colors"
        >
          ← {track ? track.title : 'Back to Track'}
        </Link>
      </div>

      {/* Title + Badges */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">{ticket.title}</h1>
        <div className="flex items-center gap-2 flex-shrink-0">
          {ticket.type === 'project' && (
            <span className="border border-subtle text-muted text-xs px-2 py-0.5 rounded">
              guided project
            </span>
          )}
          <span className={DIFFICULTY_BADGE[ticket.difficulty]}>
            {ticket.difficulty}
          </span>
        </div>
      </div>

      {/* Context */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-3">
          {ticket.type === 'project' ? 'What you\'ll build' : 'Context'}
        </h2>
        <p className="text-muted">{ticket.context}</p>
      </section>

      {/* Concepts (project-type only) */}
      {ticket.type === 'project' && ticket.concepts && ticket.concepts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-3">Concepts you'll encounter</h2>
          <ul className="space-y-2">
            {ticket.concepts.map((concept, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span aria-hidden="true">•</span>
                {concept}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tasks (project-type) */}
      {ticket.type === 'project' && ticket.tasks && ticket.tasks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-4">Tasks</h2>
          <div className="space-y-4">
            {ticket.tasks.map((task, i) => (
              <div key={i} className="bg-surface border border-subtle rounded-lg p-5">
                <p className="text-xs text-muted uppercase tracking-wide mb-1">
                  {TASK_LABELS[i] ?? `Task ${i + 1}`}
                </p>
                <p className="text-primary font-medium mb-2">{task.title}</p>
                <p className="text-muted text-sm mb-4">{task.description}</p>
                <div className="border-t border-subtle pt-3">
                  <p className="text-xs text-muted uppercase tracking-wide mb-1">Checkpoint</p>
                  <p className="text-sm text-primary">{task.checkpoint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Requirements (ticket-type only) */}
      {ticket.type !== 'project' && ticket.requirements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-3">Requirements</h2>
          <ol className="space-y-2 list-decimal list-inside">
            {ticket.requirements.map((req, i) => (
              <li key={i} className="text-primary text-sm">
                {req}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Stretch Goals */}
      {ticket.stretchGoals.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted mb-3">Stretch Goals</h2>
          <ul className="space-y-2">
            {ticket.stretchGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span aria-hidden="true">•</span>
                {goal}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Definition of Done */}
      <section className="mb-8">
        <div className="bg-surface border border-subtle rounded-lg p-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Definition of Done
          </h2>
          <p className="text-muted text-sm">{ticket.definitionOfDone}</p>
        </div>
      </section>

      {/* Mark Complete */}
      <div className="pt-4 border-t border-subtle">
        <MarkTicketComplete ticketId={ticket.id} />
      </div>
    </div>
  )
}
