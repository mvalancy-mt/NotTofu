'use client'

import React from 'react'
import { BeakerIcon, ClockIcon, DocumentCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface TestPhase {
  id: string
  name: string
  description: string
  duration: string
  measurements: number
  limits: number
}

interface Procedure {
  id: string
  name: string
  description: string
  version: string
  last_updated: string
  phases: TestPhase[]
  total_runs: number
  success_rate: number
}

const mockProcedures: Procedure[] = [
  {
    id: 'PROC-001',
    name: 'Board A Production Test',
    description: 'Full production test sequence for Board A',
    version: '2.1.0',
    last_updated: '2 days ago',
    total_runs: 1250,
    success_rate: 98.5,
    phases: [
      {
        id: 'PH-001',
        name: 'Power-up Test',
        description: 'Verify power rails and current consumption',
        duration: '2m',
        measurements: 8,
        limits: 12
      },
      {
        id: 'PH-002',
        name: 'Digital Interface Test',
        description: 'Test all digital interfaces and communication',
        duration: '5m',
        measurements: 15,
        limits: 20
      },
      {
        id: 'PH-003',
        name: 'RF Performance',
        description: 'Measure RF parameters and calibrate',
        duration: '8m',
        measurements: 25,
        limits: 30
      }
    ]
  },
  {
    id: 'PROC-002',
    name: 'Power Supply Calibration',
    description: 'Calibration procedure for power supply modules',
    version: '1.5.0',
    last_updated: '5 days ago',
    total_runs: 850,
    success_rate: 95.2,
    phases: [
      {
        id: 'PH-004',
        name: 'Voltage Calibration',
        description: 'Calibrate voltage output levels',
        duration: '10m',
        measurements: 12,
        limits: 15
      },
      {
        id: 'PH-005',
        name: 'Current Limit Test',
        description: 'Verify current limiting functionality',
        duration: '6m',
        measurements: 8,
        limits: 10
      }
    ]
  }
]

export default function ProceduresPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Test Procedures</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Manage and monitor your test procedures
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              New Procedure
            </button>
          </div>

          {/* Procedures List */}
          <div className="space-y-6">
            {mockProcedures.map((procedure) => (
              <div key={procedure.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="p-6">
                  {/* Procedure Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {procedure.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {procedure.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        v{procedure.version}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Updated {procedure.last_updated}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <DocumentCheckIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {procedure.total_runs.toLocaleString()} total runs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                        {procedure.success_rate}% success rate
                      </span>
                    </div>
                  </div>

                  {/* Phases */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Test Phases</h3>
                    <div className="mt-3 space-y-3">
                      {procedure.phases.map((phase) => (
                        <div
                          key={phase.id}
                          className="flex items-start space-x-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                        >
                          <div className="flex-shrink-0">
                            <BeakerIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {phase.name}
                              </p>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 text-gray-400" />
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                  {phase.duration}
                                </span>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {phase.description}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                {phase.measurements} measurements
                              </span>
                              <span className="text-gray-300 dark:text-gray-600">•</span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {phase.limits} limits
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 