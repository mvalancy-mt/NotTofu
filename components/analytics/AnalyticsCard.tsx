'use client'

import React from 'react'

interface AnalyticsCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  color: 'indigo' | 'green' | 'purple'
}

export default function AnalyticsCard({ 
  title, 
  value, 
  description, 
  icon, 
  color = 'indigo' 
}: AnalyticsCardProps) {
  const colorClasses = {
    indigo: 'text-indigo-600 dark:text-indigo-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400'
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-6 w-6 ${colorClasses[color]}`}>
              {icon}
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
} 