'use client'

import { useState } from 'react'
import type { SelfCheckPrompt } from '@/types'
import { parseInline } from '@/utils/parseInline'

export function SelfCheckItem({ prompt }: { prompt: SelfCheckPrompt }) {
  const [open, setOpen] = useState(false)

  const answerParagraphs = prompt.answer.split('\n\n')

  return (
    <div className="bg-surface border border-subtle rounded-lg overflow-hidden">
      <div className="p-5">
        <p className="text-primary text-sm leading-relaxed">{parseInline(prompt.question)}</p>
        <button
          onClick={() => setOpen(o => !o)}
          className="mt-3 text-xs text-muted hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <span>{open ? '▲' : '▼'}</span>
          {open ? 'Hide answer' : 'Show answer'}
        </button>
      </div>
      {open && (
        <div className="border-t border-subtle px-5 py-4 space-y-2">
          {answerParagraphs.map((para, i) => (
            <p key={i} className="text-muted text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
              {parseInline(para)}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
