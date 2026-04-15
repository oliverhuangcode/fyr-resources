interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.min(100, Math.round((completed / total) * 100))

  return (
    <div>
      <p className="text-muted text-sm mb-2">
        {completed} / {total} lessons complete
      </p>
      <div className="bg-surface border border-subtle rounded-full h-2 overflow-hidden">
        <div
          className="bg-accent h-2 rounded-full transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  )
}
