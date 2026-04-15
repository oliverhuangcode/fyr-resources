'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-subtle bg-base">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-primary font-bold text-lg tracking-tight hover:text-accent transition-colors"
        >
          MAC Learn
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/tracks"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/tracks')
                ? 'text-accent'
                : 'text-muted hover:text-primary'
            }`}
          >
            Tracks
          </Link>
        </div>
      </div>
    </nav>
  )
}
