'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  KeyIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

const linkedProcedures = [
  { id: 'FVT1', name: 'Final Verification Test', lastRun: '2 hours ago', status: 'success' },
  { id: 'ICT2', name: 'In-Circuit Test', lastRun: '1 day ago', status: 'success' },
]

const recentRuns = [
  { id: '1001', timestamp: '2023-05-01T10:24:00Z', duration: '45 min', status: 'success' },
  { id: '1000', timestamp: '2023-05-01T09:12:00Z', duration: '47 min', status: 'success' },
  { id: '999', timestamp: '2023-04-30T16:30:00Z', duration: '52 min', status: 'failure' },
]

export default function StationDetails() {
  const params = useParams()
  const router = useRouter()
  const stationId = params.id as string

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center">
          <button 
            type="button"
            onClick={() => router.back()}
            className="mr-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Station {stationId}</h1>
            <p className="mt-1 text-sm text-gray-500">Production Line A</p>
          </div>
          <span className="ml-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Active
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          {/* API Key section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">API Key</h2>
              <p className="mt-1 text-sm text-gray-500">
                Use this key to authenticate test runs from this station.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <KeyIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="font-mono">••••••••••••••••••••••••••••••</span>
                </div>
                <div className="space-x-3">
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Show
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent runs section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Recent Runs</h2>
              <p className="mt-1 text-sm text-gray-500">
                The most recent test runs from this station.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-hidden">
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
                        Duration
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentRuns.map((run) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Linked procedures section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Linked Procedures</h2>
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ul role="list" className="divide-y divide-gray-100">
                {linkedProcedures.map((procedure) => (
                  <li key={procedure.id} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <DocumentTextIcon className="h-12 w-12 flex-none rounded-full bg-gray-50 p-2 text-gray-400" />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{procedure.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">ID: {procedure.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {procedure.status === 'success' ? (
                          <span className="inline-flex items-center text-green-700">
                            <CheckCircleIcon className="mr-1 h-4 w-4 text-green-400" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-700">
                            <XCircleIcon className="mr-1 h-4 w-4 text-red-400" />
                            Failure
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Last run {procedure.lastRun}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Performance section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Performance</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 text-center">
                  <dt className="truncate text-sm font-medium text-gray-500">Weekly Success Rate</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">95%</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 text-center">
                  <dt className="truncate text-sm font-medium text-gray-500">Total Runs</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">1,024</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 