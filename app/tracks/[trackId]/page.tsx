import { notFound } from 'next/navigation'
import { tracks } from '@/data/tracks'
import { lessons } from '@/data/lessons'
import { tickets } from '@/data/tickets'
import { LessonList } from '@/components/LessonList'
import Link from 'next/link'

export function generateStaticParams() {
  return tracks.map(t => ({ trackId: t.id }))
}

interface TrackPageProps {
  params: { trackId: string }
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = tracks.find(t => t.id === params.trackId)
  if (!track) notFound()

  const trackLessons = track.lessons
    .map(id => lessons.find(l => l.id === id))
    .filter((l): l is NonNullable<typeof l> => l !== undefined)

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <div className="text-4xl mb-3" aria-hidden="true">{track.icon}</div>
        <h1 className="text-3xl font-bold text-primary mb-2">{track.title}</h1>
        <p className="text-muted">{track.description}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-primary mb-4">Lessons</h2>
        <LessonList lessons={trackLessons} />
      </section>

      {track.tickets.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Tickets</h2>
          <div className="space-y-3">
            {track.tickets.map(ticketId => {
              const ticket = tickets.find(t => t.id === ticketId)
              return (
                <Link
                  key={ticketId}
                  href={`/tickets/${ticketId}`}
                  className="block bg-surface border border-subtle rounded-lg p-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-muted text-xs uppercase tracking-wide mb-1">Ticket</p>
                      <p className="text-primary font-medium">
                        {ticket ? ticket.title : ticketId}
                      </p>
                    </div>
                    {ticket && (
                      <span className="text-xs text-muted border border-subtle rounded px-2 py-1 flex-shrink-0">
                        {ticket.difficulty}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
