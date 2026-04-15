'use client'

import { useState } from 'react'
import type { SelfCheckPrompt } from '@/types'

export function SelfCheckItem({ prompt }: { prompt: SelfCheckPrompt }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-surface border border-subtle rounded-lg overflow-hidden">
      <div className="p-5">
        <p className="text-primary text-sm leading-relaxed">{prompt.question}</p>
        <button
          onClick={() => setOpen(o => !o)}
          className="mt-3 text-xs text-muted hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <span>{open ? '▲' : '▼'}</span>
          {open ? 'Hide answer' : 'Show answer'}
        </button>
      </div>
      {open && (
        <div className="border-t border-subtle px-5 py-4">
          <p className="text-muted text-sm leading-relaxed">{prompt.answer}</p>
        </div>
      )}
    </div>
  )
}
