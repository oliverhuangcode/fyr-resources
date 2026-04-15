import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lessons } from '@/data/lessons'
import { tracks } from '@/data/tracks'
import { ResourceLink } from '@/components/ResourceLink'
import { MarkLessonComplete } from '@/components/MarkLessonComplete'
import { SelfCheckItem } from '@/components/SelfCheckItem'
import type { LessonSection } from '@/types'

export function generateStaticParams() {
  return lessons.map(l => ({ id: l.id }))
}

interface LessonPageProps {
  params: Promise<{ id: string }>
}

function ContentSection({ section }: { section: LessonSection }) {
  if (section.type === 'code') {
    return (
      <div className="mb-8">
        {section.heading && (
          <h3 className="text-base font-semibold text-primary mb-3">{section.heading}</h3>
        )}
        <pre className="bg-surface border border-subtle rounded-lg p-5 overflow-x-auto">
          <code className="text-sm text-primary font-mono leading-relaxed whitespace-pre">
            {section.body}
          </code>
        </pre>
      </div>
    )
  }

  if (section.type === 'note') {
    return (
      <div className="mb-8 border-l-2 border-accent pl-5">
        {section.heading && (
          <p className="text-accent text-sm font-semibold mb-2">{section.heading}</p>
        )}
        <p className="text-muted text-sm leading-relaxed">{section.body}</p>
      </div>
    )
  }

  // type === 'text'
  const paragraphs = section.body.split('\n\n')
  return (
    <div className="mb-8">
      {section.heading && (
        <h3 className="text-xl font-semibold text-primary mb-3">{section.heading}</h3>
      )}
      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-primary leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  const lesson = lessons.find(l => l.id === id)
  if (!lesson) notFound()

  const track = tracks.find(t => t.id === lesson.trackId)

  // Find next lesson in track
  const trackObj = tracks.find(t => t.id === lesson.trackId)
  const lessonIds = trackObj?.lessons ?? []
  const currentIndex = lessonIds.indexOf(lesson.id)
  const nextLessonId = currentIndex >= 0 && currentIndex < lessonIds.length - 1
    ? lessonIds[currentIndex + 1]
    : null
  const nextLesson = nextLessonId ? lessons.find(l => l.id === nextLessonId) : null

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-10">
        <Link
          href={`/tracks/${lesson.trackId}`}
          className="text-muted hover:text-primary text-sm transition-colors"
        >
          ← {track ? track.title : 'Back to Track'}
        </Link>
      </div>

      {/* Metadata + Title */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">
            Stage {lesson.stage}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">{lesson.title}</h1>
        <p className="text-muted text-lg leading-relaxed">{lesson.description}</p>
      </div>

      {/* Skills */}
      {lesson.skills.length > 0 && (
        <div className="mb-10 bg-surface border border-subtle rounded-lg p-6">
          <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            What you&apos;ll learn
          </h2>
          <ul className="space-y-2">
            {lesson.skills.map((skill, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-primary">
                <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main content */}
      <div className="mb-10">
        {lesson.content.map((section, i) => (
          <ContentSection key={i} section={section} />
        ))}
      </div>

      {/* Resources */}
      {lesson.resources.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-primary mb-4">Go deeper</h2>
          <div className="space-y-3">
            {lesson.resources.map((resource, i) => (
              <ResourceLink key={i} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* Self-check */}
      {lesson.selfCheck.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-primary mb-2">Before you move on</h2>
          <p className="text-muted text-sm mb-5">
            These aren&apos;t quiz questions — just things worth pausing to think about. If something feels unclear, that&apos;s a signal to re-read or explore the resources.
          </p>
          <div className="space-y-4">
            {lesson.selfCheck.map((prompt, i) => (
              <SelfCheckItem key={i} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {/* Mark complete + next lesson */}
      <div className="pt-6 border-t border-subtle flex items-center justify-between gap-4 flex-wrap">
        <MarkLessonComplete lessonId={lesson.id} />
        {nextLesson && (
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            Next: {nextLesson.title} →
          </Link>
        )}
      </div>
    </div>
  )
}
