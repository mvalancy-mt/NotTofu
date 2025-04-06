'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ClockIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  BeakerIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

// Mock data for a single test run
const getTestRun = (id: string) => {
  return {
    id,
    timestamp: '2023-05-01T10:24:00Z',
    duration: '45 min',
    status: id === '999' ? 'failure' : 'success',
    station: {
      id: 'STA1',
      name: 'Production Line A',
    },
    procedure: {
      id: 'FVT1',
      name: 'Final Verification Test',
    },
    serialNumber: 'SN-12345',
    operator: 'John Doe',
    phases: [
      {
        id: 'phase-1',
        name: 'Initialization',
        status: 'success',
        duration: '5 min',
        measurements: [
          { name: 'System Power', value: '12.1V', expected: '12.0V ± 0.2V', status: 'success' },
          { name: 'Boot Time', value: '15s', expected: '< 20s', status: 'success' },
        ],
      },
      {
        id: 'phase-2',
        name: 'Calibration',
        status: 'success',
        duration: '15 min',
        measurements: [
          { name: 'Temperature', value: '25.2°C', expected: '25.0°C ± 2.0°C', status: 'success' },
          { name: 'Pressure', value: '1013 hPa', expected: '1010-1020 hPa', status: 'success' },
        ],
      },
      {
        id: 'phase-3',
        name: 'Performance Test',
        status: id === '999' ? 'failure' : 'success',
        duration: '25 min',
        measurements: [
          { name: 'Output Power', value: id === '999' ? '9.2W' : '10.1W', expected: '> 10W', status: id === '999' ? 'failure' : 'success' },
          { name: 'Efficiency', value: '87%', expected: '> 85%', status: 'success' },
          { name: 'Noise Level', value: id === '999' ? '55dB' : '42dB', expected: '< 45dB', status: id === '999' ? 'failure' : 'success' },
        ],
      },
    ],
    logs: [
      { timestamp: '2023-05-01T10:00:00Z', level: 'info', message: 'Test initialized' },
      { timestamp: '2023-05-01T10:01:00Z', level: 'info', message: 'Phase 1 started' },
      { timestamp: '2023-05-01T10:06:00Z', level: 'info', message: 'Phase 1 completed' },
      { timestamp: '2023-05-01T10:06:30Z', level: 'info', message: 'Phase 2 started' },
      { timestamp: '2023-05-01T10:21:30Z', level: 'info', message: 'Phase 2 completed' },
      { timestamp: '2023-05-01T10:22:00Z', level: 'info', message: 'Phase 3 started' },
      ...(id === '999' ? [
        { timestamp: '2023-05-01T10:35:00Z', level: 'warning', message: 'Output power below threshold' },
        { timestamp: '2023-05-01T10:40:00Z', level: 'error', message: 'Noise level exceeded limit' },
        { timestamp: '2023-05-01T10:45:00Z', level: 'error', message: 'Phase 3 failed' },
      ] : [
        { timestamp: '2023-05-01T10:47:00Z', level: 'info', message: 'Phase 3 completed' },
      ]),
    ],
  }
}

export default function TestRunDetail() {
  const params = useParams()
  const router = useRouter()
  const runId = params.id as string
  const testRun = getTestRun(runId)
  
  const [expandedPhases, setExpandedPhases] = useState<{[key: string]: boolean}>({
    'phase-1': true,
    'phase-2': true,
    'phase-3': true,
  })
  
  const togglePhase = (phaseId: string) => {
    setExpandedPhases({
      ...expandedPhases,
      [phaseId]: !expandedPhases[phaseId],
    })
  }

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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Test Run {runId}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(testRun.timestamp).toLocaleString()} · {testRun.duration}
            </p>
          </div>
          {testRun.status === 'success' ? (
            <span className="ml-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" />
              Success
            </span>
          ) : (
            <span className="ml-4 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <XCircleIcon className="mr-1 h-4 w-4 text-red-500" />
              Failure
            </span>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Test Phases section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Test Phases</h2>
              <p className="mt-1 text-sm text-gray-500">
                Detailed results for each phase of the test.
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {testRun.phases.map((phase) => (
                <div key={phase.id} className="bg-white">
                  <div 
                    className="flex cursor-pointer items-center justify-between px-4 py-5 sm:px-6"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="flex items-center">
                      {phase.status === 'success' ? (
                        <CheckCircleIcon className="mr-3 h-5 w-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="mr-3 h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{phase.name}</h3>
                        <p className="text-xs text-gray-500">{phase.duration}</p>
                      </div>
                    </div>
                    <div>
                      {expandedPhases[phase.id] ? (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedPhases[phase.id] && (
                    <div className="bg-gray-50 px-4 py-5 sm:px-6">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Measurement
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Value
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Expected
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {phase.measurements.map((measurement, idx) => (
                              <tr key={idx}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                  {measurement.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {measurement.value}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {measurement.expected}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  {measurement.status === 'success' ? (
                                    <span className="inline-flex items-center text-green-700">
                                      <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" />
                                      Pass
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center text-red-700">
                                      <XCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                                      Fail
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Logs section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Test Logs</h2>
              <p className="mt-1 text-sm text-gray-500">
                Detailed log messages from the test execution.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <pre className="text-xs font-mono bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                  {testRun.logs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`py-1 ${
                        log.level === 'error' 
                          ? 'text-red-600' 
                          : log.level === 'warning' 
                            ? 'text-amber-600' 
                            : 'text-gray-700'
                      }`}
                    >
                      [{new Date(log.timestamp).toLocaleTimeString()}] [{log.level.toUpperCase()}] {log.message}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Test information section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Test Information</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="space-y-4">
                <div className="flex items-center">
                  <dt className="flex items-center text-sm font-medium text-gray-500 w-1/3">
                    <ComputerDesktopIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Station
                  </dt>
                  <dd className="text-sm text-gray-900 w-2/3">
                    <Link href={`/stations/${testRun.station.id}`} className="text-blue-600 hover:text-blue-800">
                      {testRun.station.id} - {testRun.station.name}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm font-medium text-gray-500 w-1/3">
                    <DocumentTextIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Procedure
                  </dt>
                  <dd className="text-sm text-gray-900 w-2/3">
                    <Link href={`/procedures/${testRun.procedure.id}`} className="text-blue-600 hover:text-blue-800">
                      {testRun.procedure.id} - {testRun.procedure.name}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm font-medium text-gray-500 w-1/3">
                    <InformationCircleIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Serial No.
                  </dt>
                  <dd className="text-sm text-gray-900 w-2/3">
                    {testRun.serialNumber}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm font-medium text-gray-500 w-1/3">
                    <BeakerIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Operator
                  </dt>
                  <dd className="text-sm text-gray-900 w-2/3">
                    {testRun.operator}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm font-medium text-gray-500 w-1/3">
                    <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Duration
                  </dt>
                  <dd className="text-sm text-gray-900 w-2/3">
                    {testRun.duration}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Actions section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Actions</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Export Results (CSV)
                </button>
                <button
                  type="button"
                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Download Raw Data
                </button>
                <button
                  type="button"
                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Share Report
                </button>
              </div>
            </div>
          </div>

          {/* Summary section */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Summary</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-5">
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 text-center">
                  <dt className="truncate text-sm font-medium text-gray-500">Success Rate</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {testRun.status === 'success' ? '100%' : '67%'}
                  </dd>
                  <dd className="mt-2 text-sm text-gray-500">
                    {testRun.status === 'success' ? 
                      'All measurements passed' : 
                      '2 out of 3 phases passed'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 