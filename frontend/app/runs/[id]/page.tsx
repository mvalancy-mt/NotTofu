'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// Define interfaces for test run and test phase
interface TestRun {
  id: number;
  name: string;
  uut_id: string;
  uut_serial: string;
  status: string;
  created_at: string;
  updated_at: string;
  meta_data?: Record<string, any>;
}

interface TestPhase {
  id: number;
  name: string;
  description: string;
  status: string;
  duration: number;
  measurements: Record<string, any>;
  test_run_id: number;
  created_at: string;
  updated_at: string;
}

export default function TestRunDetailPage({ params }: { params: { id: string } }) {
  const runId = params.id;
  const [testRun, setTestRun] = useState<TestRun | null>(null);
  const [testPhases, setTestPhases] = useState<TestPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch test run details
  const fetchTestRunDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch test run details
      const runResponse = await fetch(`http://localhost:8000/test-runs/${runId}`);
      if (!runResponse.ok) {
        throw new Error(`Error fetching test run: ${runResponse.statusText}`);
      }
      const runData = await runResponse.json();
      setTestRun(runData);
      
      // Fetch test phases for this run
      const phasesResponse = await fetch(`http://localhost:8000/test-runs/${runId}/phases`);
      if (!phasesResponse.ok) {
        throw new Error(`Error fetching test phases: ${phasesResponse.statusText}`);
      }
      const phasesData = await phasesResponse.json();
      setTestPhases(phasesData);
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch test run details:', err);
      setError('Failed to load test run details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch test run details on component mount and set up auto-refresh interval
  useEffect(() => {
    fetchTestRunDetails();
    
    // Set up auto-refresh interval (every 5 seconds)
    const refreshInterval = setInterval(() => {
      fetchTestRunDetails();
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [runId]);

  // Function to format timestamp
  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Function to get status display elements
  const getStatusDisplay = (status: string) => {
    if (status === 'PASSED' || status === 'passed') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="mr-1 h-4 w-4" />
          {status.toUpperCase()}
        </span>
      );
    } else if (status === 'PENDING' || status === 'pending' || status === 'RUNNING' || status === 'running') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <ClockIcon className="mr-1 h-4 w-4" />
          {status.toUpperCase()}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircleIcon className="mr-1 h-4 w-4" />
          {status.toUpperCase()}
        </span>
      );
    }
  };

  // Function to format duration (in seconds)
  const formatDuration = (seconds: number) => {
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link 
          href="/runs" 
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Test Runs
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="px-4 py-5 sm:p-6 text-center text-red-500">{error}</div>
      ) : testRun ? (
        <>
          {/* Test Run Details */}
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-6 text-gray-900">
                  Test Run: {testRun.name}
                </h2>
                {getStatusDisplay(testRun.status)}
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Run ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{testRun.id}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Device ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{testRun.uut_id}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{testRun.uut_serial}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Started</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDateTime(testRun.created_at)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDateTime(testRun.updated_at)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{testRun.status}</dd>
                </div>
                
                {testRun.meta_data && Object.keys(testRun.meta_data).length > 0 && (
                  <div className="sm:col-span-3">
                    <dt className="text-sm font-medium text-gray-500">Metadata</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <pre className="bg-gray-50 p-3 rounded-md overflow-auto">
                        {JSON.stringify(testRun.meta_data, null, 2)}
                      </pre>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Test Phases */}
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h2 className="text-lg font-semibold leading-6 text-gray-900">Test Phases</h2>
            </div>
            
            {testPhases.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500">
                No test phases found for this run.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {testPhases.map((phase) => (
                  <div key={phase.id} className="px-4 py-5 sm:p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-medium text-gray-900">{phase.name}</h3>
                      {getStatusDisplay(phase.status)}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{phase.description}</p>
                    
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <span className="text-xs font-medium text-gray-500">Duration:</span>{' '}
                        <span className="text-sm text-gray-900">{formatDuration(phase.duration)}</span>
                      </div>
                      <div className="sm:col-span-1">
                        <span className="text-xs font-medium text-gray-500">Created:</span>{' '}
                        <span className="text-sm text-gray-900">{formatDateTime(phase.created_at)}</span>
                      </div>
                      <div className="sm:col-span-1">
                        <span className="text-xs font-medium text-gray-500">Updated:</span>{' '}
                        <span className="text-sm text-gray-900">{formatDateTime(phase.updated_at)}</span>
                      </div>
                    </div>

                    {/* Measurements section */}
                    {phase.measurements && Object.keys(phase.measurements).length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Measurements</h4>
                        <div className="bg-gray-50 p-3 rounded overflow-auto">
                          <pre className="text-xs text-gray-700">
                            {JSON.stringify(phase.measurements, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
          Test run not found.
        </div>
      )}
    </div>
  )
} 