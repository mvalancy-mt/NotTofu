'use client'

import Link from 'next/link'
import { DocumentTextIcon, ClockIcon, ComputerDesktopIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const testRuns = [
  {
    id: '1001',
    timestamp: '2023-05-01T10:24:00Z',
    duration: '45 min',
    status: 'success',
    station: 'STA1',
    procedure: 'FVT1',
    procedureName: 'Final Verification Test'
  },
  {
    id: '1000',
    timestamp: '2023-05-01T09:12:00Z',
    duration: '47 min',
    status: 'success',
    station: 'STA1',
    procedure: 'ICT2',
    procedureName: 'In-Circuit Test'
  },
  {
    id: '999',
    timestamp: '2023-04-30T16:30:00Z',
    duration: '52 min',
    status: 'failure',
    station: 'STA2',
    procedure: 'ICT2',
    procedureName: 'In-Circuit Test'
  },
  {
    id: '998',
    timestamp: '2023-04-30T14:15:00Z',
    duration: '48 min',
    status: 'success',
    station: 'STA2',
    procedure: 'FCT3',
    procedureName: 'Functional Circuit Test'
  },
  {
    id: '997',
    timestamp: '2023-04-30T11:42:00Z',
    duration: '50 min',
    status: 'success',
    station: 'STA1',
    procedure: 'FVT1',
    procedureName: 'Final Verification Test'
  }
]

export default function TestRunsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Test Runs</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all test runs across your stations.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-base font-semibold leading-6 text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="col-span-1">
              <label htmlFor="station" className="block text-sm font-medium text-gray-700">
                Station
              </label>
              <select
                id="station"
                name="station"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Stations</option>
                <option value="STA1">STA1</option>
                <option value="STA2">STA2</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="procedure" className="block text-sm font-medium text-gray-700">
                Procedure
              </label>
              <select
                id="procedure"
                name="procedure"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Procedures</option>
                <option value="FVT1">Final Verification Test</option>
                <option value="ICT2">In-Circuit Test</option>
                <option value="FCT3">Functional Circuit Test</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Statuses</option>
                <option value="success">Success</option>
                <option value="failure">Failure</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                id="date-range"
                name="date-range"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Test Runs Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
          <h2 className="text-base font-semibold leading-6 text-gray-900">Recent Test Runs</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Run ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Timestamp
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Procedure
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Station
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Duration
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testRuns.map((run) => (
                  <tr key={run.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-0">
                      <Link href={`/runs/${run.id}`}>{run.id}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {new Date(run.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <DocumentTextIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {run.procedureName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ComputerDesktopIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {run.station}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{run.duration}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {run.status === 'success' ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          <CheckCircleIcon className="mr-1 h-4 w-4 text-green-400" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                          <XCircleIcon className="mr-1 h-4 w-4 text-red-400" />
                          Failure
                        </span>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link href={`/runs/${run.id}`} className="text-blue-600 hover:text-blue-900">
                        View<span className="sr-only">, run {run.id}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 