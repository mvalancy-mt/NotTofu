'use client'

import React from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface TestRun {
  id: string
  name: string
  status: 'completed' | 'failed' | 'in_progress'
  uut_serial: string
  start_time: string
  duration: string
  phases_completed: number
  total_phases: number
}

const mockTestRuns: TestRun[] = [
  {
    id: 'TR-001',
    name: 'Production Test - Board A',
    status: 'completed',
    uut_serial: 'SN-2024-001',
    start_time: '2024-02-28 09:00:00',
    duration: '45m',
    phases_completed: 12,
    total_phases: 12
  },
  {
    id: 'TR-002',
    name: 'Calibration - RF Module',
    status: 'in_progress',
    uut_serial: 'SN-2024-002',
    start_time: '2024-02-28 10:15:00',
    duration: '30m',
    phases_completed: 6,
    total_phases: 10
  },
  {
    id: 'TR-003',
    name: 'Thermal Test - Power Supply',
    status: 'failed',
    uut_serial: 'SN-2024-003',
    start_time: '2024-02-28 11:00:00',
    duration: '15m',
    phases_completed: 3,
    total_phases: 8
  }
]

export default function TestRunsPage() {
  const getStatusIcon = (status: TestRun['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />
      case 'failed':
        return <XCircleIcon className="h-6 w-6 text-red-500" />
      case 'in_progress':
        return <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-spin" />
    }
  }

  const getStatusClass = (status: TestRun['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'failed':
        return 'bg-red-50 text-red-700 ring-red-600/20'
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Test Runs</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                View and manage your test executions
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              New Test Run
            </button>
          </div>

          {/* Test Runs List */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockTestRuns.map((run) => (
                <li key={run.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="flex-shrink-0">
                        {getStatusIcon(run.status)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{run.name}</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {run.uut_serial}
                          </p>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                            {run.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusClass(run.status)}`}>
                        {run.status.replace('_', ' ')}
                      </span>
                      <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                        {run.phases_completed}/{run.total_phases} phases
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 