'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  highlighted: string
}

export function CodeBlock({ code, highlighted }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group">
      <pre className="bg-surface border border-subtle rounded-lg p-5 overflow-x-auto">
        <code
          className="text-sm text-primary font-mono leading-relaxed whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs font-mono rounded border border-subtle bg-base text-muted opacity-0 group-hover:opacity-100 hover:border-accent hover:text-accent transition-all"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
