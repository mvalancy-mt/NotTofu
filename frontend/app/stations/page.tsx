'use client'

import Link from 'next/link'
import { PlusIcon, KeyIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const stations = [
  { 
    id: 'STA1', 
    name: 'Production Line A', 
    status: 'active', 
    linkedProcedures: 2, 
    successRate: '95%',
    lastRun: 'Today, 10:24 AM'
  },
  { 
    id: 'STA2', 
    name: 'Supplier Facility', 
    status: 'active', 
    linkedProcedures: 1, 
    successRate: '88%',
    lastRun: 'Yesterday, 15:42 PM'
  }
]

export default function StationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Stations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Deploy your test stations either in-house or at your suppliers.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
          Create Station
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stations.map((station) => (
          <div key={station.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{station.id}</h3>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{station.name}</p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <KeyIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>API Key: ••••••••</span>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Regenerate
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <DocumentTextIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>{station.linkedProcedures} linked procedure{station.linkedProcedures !== 1 ? 's' : ''}</span>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Manage
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <ChartBarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{station.successRate} weekly success rate</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-gray-500">Last run:</p>
                  <p className="font-medium text-gray-900">{station.lastRun}</p>
                </div>
                <Link
                  href={`/stations/${station.id}`}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 