'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DocumentTextIcon, ClockIcon, ComputerDesktopIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import ApiStatus from './status'
import { API_URL, API_ENDPOINTS, DATA_REFRESH_INTERVAL, API_REQUEST_TIMEOUT } from '../config'

// Define the test run interface
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

export default function TestRunsPage() {
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch test runs from the backend
  const fetchTestRuns = async () => {
    try {
      setLoading(true);
      const apiEndpoint = `${API_URL}${API_ENDPOINTS.testRuns}`;
      console.log(`Fetching test runs from ${apiEndpoint}...`);
      
      const response = await fetch(apiEndpoint, {
        cache: 'no-store', // Prevent caching
        signal: AbortSignal.timeout(API_REQUEST_TIMEOUT) // Set timeout
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching test runs: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Received test runs:', data.length);
      
      // Normalize data to ensure it matches our expected format
      const normalizedData = data.map((run: any) => ({
        id: run.id,
        name: run.name || 'Unnamed Test',
        uut_id: run.uut_id || 'No Device ID',
        uut_serial: run.uut_serial || 'No Serial',
        status: (run.status || 'unknown').toLowerCase(),
        created_at: run.created_at || new Date().toISOString(),
        updated_at: run.updated_at || new Date().toISOString(),
        meta_data: run.meta_data || {}
      }));
      
      // Sort by most recent first
      normalizedData.sort((a: TestRun, b: TestRun) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setTestRuns(normalizedData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch test runs:', err);
      setError(`Failed to load test runs. Please check that the backend server is running at ${API_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch test runs on component mount and set up auto-refresh interval
  useEffect(() => {
    fetchTestRuns();
    
    // Set up auto-refresh interval
    const refreshInterval = setInterval(() => {
      fetchTestRuns();
    }, DATA_REFRESH_INTERVAL);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Function to format timestamp
  const formatDateTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid date';
    }
  };

  // Function to get status display elements
  const getStatusDisplay = (status: string) => {
    const statusText = status.toUpperCase();
    
    if (statusText === 'PASSED' || statusText === 'PENDING') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="mr-1 h-4 w-4" />
          {statusText}
        </span>
      );
    } else if (statusText === 'RUNNING') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <ClockIcon className="mr-1 h-4 w-4" />
          {statusText}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircleIcon className="mr-1 h-4 w-4" />
          {statusText}
        </span>
      );
    }
  };

  return (
    <div className="p-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Test Runs</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all test runs across your stations.
        </p>
      </div>
      
      {/* API Status */}
      <ApiStatus />

      {/* Filters */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="col-span-1">
              <label htmlFor="station" className="block text-sm font-medium text-gray-700">
                Station
              </label>
              <select
                id="station"
                name="station"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-base"
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
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-base"
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
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-base"
              >
                <option value="">All Statuses</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div className="col-span-1 flex items-end">
              <button
                type="button"
                onClick={fetchTestRuns}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Runs Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900">Recent Test Runs</h2>
          <button 
            onClick={fetchTestRuns} 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">{error}</div>
        ) : testRuns.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No test runs found.</div>
        ) : (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Run ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Device ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Serial Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {testRuns.map((run) => (
                    <tr key={run.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600">
                        <Link href={`/runs/${run.id}`}>{run.id}</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {run.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {run.uut_id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {run.uut_serial}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {formatDateTime(run.created_at)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {getStatusDisplay(run.status)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                        <Link href={`/runs/${run.id}`} className="text-blue-600 hover:text-blue-900">
                          View<span className="sr-only">, {run.id}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 