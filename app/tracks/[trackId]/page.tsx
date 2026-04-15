import { notFound } from 'next/navigation'
import { tracks } from '@/data/tracks'
import { lessons } from '@/data/lessons'
import { tickets } from '@/data/tickets'
import { LessonList } from '@/components/LessonList'
import { TicketCard } from '@/components/TicketCard'

export function generateStaticParams() {
  return tracks.map(t => ({ trackId: t.id }))
}

interface TrackPageProps {
  params: Promise<{ trackId: string }>
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { trackId } = await params
  const track = tracks.find(t => t.id === trackId)
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
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-primary mb-4">Tickets</h2>
          <div className="space-y-3">
            {track.tickets.map(ticketId => {
              const ticket = tickets.find(t => t.id === ticketId)
              if (!ticket) return null
              return <TicketCard key={ticketId} ticket={ticket} />
            })}
          </div>
        </section>
      )}

      {track.courseResources.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">Go further</h2>
          <p className="text-muted text-sm mb-6">
            Full courses and references worth bookmarking as you work through this track.
          </p>
          <div className="space-y-3">
            {track.courseResources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-surface border border-subtle rounded-lg p-5 hover:border-accent transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-primary font-semibold text-sm group-hover:text-accent transition-colors mb-1">
                      {resource.title}
                    </p>
                    <p className="text-muted text-sm leading-relaxed">{resource.description}</p>
                  </div>
                  <span className="text-muted group-hover:text-accent transition-colors flex-shrink-0 text-sm" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
