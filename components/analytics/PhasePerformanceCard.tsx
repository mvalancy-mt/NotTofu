'use client'

import React from 'react'

interface PhaseData {
  name: string
  fpy: number
  cpk: number
  status: 'Highly Capable' | 'Capable' | 'Needs Improvement'
}

interface PhasePerformanceCardProps {
  phases: PhaseData[]
}

export default function PhasePerformanceCard({ phases }: PhasePerformanceCardProps) {
  const getStatusColor = (status: PhaseData['status']) => {
    switch (status) {
      case 'Highly Capable':
        return 'text-green-600 dark:text-green-400'
      case 'Capable':
        return 'text-blue-600 dark:text-blue-400'
      case 'Needs Improvement':
        return 'text-yellow-600 dark:text-yellow-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Phase Performance</h2>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.name} className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{phase.name}</h3>
                  <p className={`text-sm ${getStatusColor(phase.status)}`}>
                    Status: {phase.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    FPY: {phase.fpy.toFixed(1)}%
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Cpk: {phase.cpk.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 