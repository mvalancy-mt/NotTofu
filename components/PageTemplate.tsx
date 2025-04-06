'use client'

import React from 'react'

interface PageTemplateProps {
  children: React.ReactNode
}

export default function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div className="py-6">
      {children}
    </div>
  )
} 