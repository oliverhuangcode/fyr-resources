import React from 'react'

/**
 * Renders a plain-text string with inline markdown-style formatting:
 * - `code` → <code> with accent styling
 * - **bold** → <strong>
 */
export function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="bg-[#1a1a1a] border border-subtle rounded px-1.5 py-0.5 font-mono text-accent text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}
