'use client'

import { Suspense } from 'react'
import Loading from '../loading'

export default function RunsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </Suspense>
  )
} 