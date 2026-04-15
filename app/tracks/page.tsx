import { tracks } from '@/data/tracks'
import { TrackCard } from '@/components/TrackCard'

export default function TracksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">All Tracks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map(track => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
