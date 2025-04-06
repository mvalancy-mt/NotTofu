'use client'

import React from 'react'
import { ComputerDesktopIcon, KeyIcon, DocumentDuplicateIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import PageTemplate from '@/components/PageTemplate'

interface Station {
  id: string
  name: string
  apiKey: string
  procedures: string[]
  status: 'online' | 'offline' | 'busy'
  lastActive: string
  weeklyRuns: number
  yield: number
}

const mockStations: Station[] = [
  {
    id: 'STA1',
    name: 'Production Station 1',
    apiKey: 'sta_prod_1234',
    procedures: ['FVT1', 'CAL2'],
    status: 'online',
    lastActive: '2 minutes ago',
    weeklyRuns: 342,
    yield: 98.5
  },
  {
    id: 'STA2',
    name: 'Calibration Station',
    apiKey: 'sta_cal_5678',
    procedures: ['CAL1', 'CAL2'],
    status: 'busy',
    lastActive: 'Just now',
    weeklyRuns: 156,
    yield: 99.1
  }
]

export default function StationsPage() {
  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Test Stations</h1>
              <p className="mt-2 text-sm text-gray-700">
                Deploy your test stations either in-house or at your suppliers
              </p>
            </div>
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Station
            </button>
          </div>

          {/* Stations Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {mockStations.map((station) => (
              <div
                key={station.id}
                className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ComputerDesktopIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {station.name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {station.id}</p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${station.status === 'online' ? 'bg-green-100 text-green-800' : 
                          station.status === 'busy' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {station.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6 border-t border-gray-100 pt-4">
                  <div>
                    <div className="flex items-center">
                      <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">Procedures</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {station.procedures.join(', ')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">Weekly Runs</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {station.weeklyRuns.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                    <button className="ml-2 text-sm text-indigo-600 hover:text-indigo-900">
                      Manage API Key
                    </button>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Last active: </span>
                    <span className="font-medium text-gray-900">{station.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  )
} 