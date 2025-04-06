'use client'

import {
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function ProceduresPage() {
  // Mock data for procedures
  const procedures = [
    {
      id: 'FVT1',
      name: 'Final Verification Test',
      description: 'Complete system verification for product release',
      lastUpdated: '2023-05-01',
      runCount: 156,
      successRate: '94%',
      avgDuration: '45 min',
      author: 'Quality Team',
    },
    {
      id: 'TVB1',
      name: 'Thermal Validation Basic',
      description: 'Basic thermal performance validation',
      lastUpdated: '2023-04-15',
      runCount: 89,
      successRate: '97%',
      avgDuration: '30 min',
      author: 'Engineering',
    },
    {
      id: 'PBT1',
      name: 'Power Board Test',
      description: 'Validation suite for power distribution boards',
      lastUpdated: '2023-04-10',
      runCount: 212,
      successRate: '91%',
      avgDuration: '25 min',
      author: 'Hardware Team',
    },
    {
      id: 'CAL1',
      name: 'Sensor Calibration',
      description: 'Calibration procedure for all sensor types',
      lastUpdated: '2023-03-28',
      runCount: 305,
      successRate: '99%',
      avgDuration: '15 min',
      author: 'Production',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">Test Procedures</h1>
          <p className="mt-2 text-sm text-gray-500">
            A list of all test procedures available in NotTofu.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none"
          >
            Add procedure
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {procedures.map((procedure) => (
          <div
            key={procedure.id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{procedure.name}</h3>
              </div>
              <div className="mt-1.5 text-xs font-medium text-gray-500">{procedure.id}</div>
              <p className="mt-3 text-sm text-gray-500">{procedure.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Run Count</p>
                  <p className="mt-1 flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900">{procedure.runCount}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Success Rate</p>
                  <p className="mt-1 flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900">{procedure.successRate}</span>
                    <span className="ml-1 text-xs text-gray-500">avg</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Duration</p>
                  <p className="mt-1 flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900">{procedure.avgDuration}</span>
                    <span className="ml-1 text-xs text-gray-500">avg</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Last Updated</p>
                  <p className="mt-1 flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900">{procedure.lastUpdated}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href={`/procedures/${procedure.id}`}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View procedure
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 