import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lessons } from '@/data/lessons'
import { tracks } from '@/data/tracks'
import { ResourceLink } from '@/components/ResourceLink'
import { MarkLessonComplete } from '@/components/MarkLessonComplete'

export function generateStaticParams() {
  return lessons.map(l => ({ id: l.id }))
}

interface LessonPageProps {
  params: { id: string }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons.find(l => l.id === params.id)
  if (!lesson) notFound()

  const track = tracks.find(t => t.id === lesson.trackId)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href={`/tracks/${lesson.trackId}`}
          className="text-muted hover:text-primary text-sm transition-colors"
        >
          ← {track ? track.title : 'Back to Track'}
        </Link>
      </div>

      {/* Metadata + Title */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-muted text-xs font-medium uppercase tracking-wide">
            Stage {lesson.stage}
          </span>
          <span className="text-muted text-xs">{lesson.duration}</span>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">{lesson.title}</h1>
        <p className="text-muted">{lesson.description}</p>
      </div>

      {/* Skills */}
      {lesson.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-3">You&apos;ll learn</h2>
          <ul className="space-y-2">
            {lesson.skills.map((skill, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-primary">
                <span className="text-accent mt-0.5" aria-hidden="true">•</span>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Resources */}
      {lesson.resources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-3">Resources</h2>
          <div className="space-y-3">
            {lesson.resources.map((resource, i) => (
              <ResourceLink key={i} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* Checkpoint */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-3">Self-check</h2>
        <div className="bg-surface border border-subtle rounded-lg p-5">
          <p className="text-muted">{lesson.checkpoint}</p>
        </div>
      </section>

      {/* Mark Complete */}
      <div className="pt-4 border-t border-subtle">
        <MarkLessonComplete lessonId={lesson.id} />
      </div>
    </div>
  )
}
