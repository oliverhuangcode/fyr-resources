import type { Resource } from '@/types'

interface ResourceLinkProps {
  resource: Resource
}

const TYPE_BADGE: Record<Resource['type'], string> = {
  video: 'bg-accent text-base text-xs font-medium px-2 py-0.5 rounded',
  reading: 'border border-subtle text-muted text-xs px-2 py-0.5 rounded',
  interactive: 'border border-subtle text-accent text-xs px-2 py-0.5 rounded',
}

const TYPE_LABEL: Record<Resource['type'], string> = {
  video: 'Video',
  reading: 'Reading',
  interactive: 'Interactive',
}

export function ResourceLink({ resource }: ResourceLinkProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 bg-surface border border-subtle rounded-lg p-4 hover:border-accent transition-colors"
    >
      <span className="text-primary text-sm font-medium">{resource.title}</span>
      <span className={TYPE_BADGE[resource.type]} aria-label={`Type: ${TYPE_LABEL[resource.type]}`}>
        {TYPE_LABEL[resource.type]}
      </span>
    </a>
  )
}
