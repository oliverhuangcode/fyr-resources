import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'MAC Learn',
  description: 'Backend curriculum for MAC members — build practical skills step by step.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} bg-base text-primary min-h-screen`}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
