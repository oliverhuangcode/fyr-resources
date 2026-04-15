import Link from 'next/link'
import { tracks } from '@/data/tracks'
import { TrackCard } from '@/components/TrackCard'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">MAC Learn</h1>
        <p className="text-muted text-lg mb-8">
          A self-paced backend curriculum for MAC members.
        </p>
        <Link
          href="/tracks"
          className="inline-block bg-accent text-base font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          Browse Tracks
        </Link>
      </section>

      <section>
        <h2 className="text-primary font-semibold text-xl mb-6">Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  )
}
