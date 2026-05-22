import Link from 'next/link'
import type { Track } from '@/types'

interface TrackCardProps {
  track: Track
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <Link href={`/tracks/${track.id}`} className="block h-full">
      <div className="h-full flex flex-col bg-surface border border-subtle rounded-lg p-6 hover:border-accent transition-colors">
        <div className="text-4xl mb-3" aria-hidden="true">{track.icon}</div>
        <h2 className="text-primary font-bold text-xl mb-2">{track.title}</h2>
        <p className="text-muted text-sm mb-4 flex-1">{track.description}</p>
        <div className="flex gap-4 text-muted text-sm">
          <span>{track.lessons.length} lessons</span>
          <span>{track.tickets.length} tickets</span>
        </div>
      </div>
    </Link>
  )
}
