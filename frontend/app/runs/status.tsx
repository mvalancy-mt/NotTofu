'use client'

import { useState, useEffect } from 'react'
import { API_URL, API_ENDPOINTS, API_STATUS_CHECK_INTERVAL, API_REQUEST_TIMEOUT } from '../config'

export default function ApiStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [testRuns, setTestRuns] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const checkApiStatus = async () => {
    try {
      setStatus('loading')
      const apiEndpoint = `${API_URL}${API_ENDPOINTS.testRuns}`
      console.log(`Checking API status at ${apiEndpoint}`)
      
      const response = await fetch(apiEndpoint, { 
        // Add cache: 'no-store' to prevent caching
        cache: 'no-store',
        // Set a timeout for the fetch request
        signal: AbortSignal.timeout(API_REQUEST_TIMEOUT)
      })
      
      if (response.ok) {
        const data = await response.json()
        setTestRuns(data.length)
        setStatus('connected')
        setMessage('API is connected and functioning correctly')
        setLastUpdated(new Date().toLocaleTimeString())
        setRetryCount(0) // Reset retry count on success
      } else {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`)
      }
    } catch (err) {
      console.error('API status check failed:', err)
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Unknown error occurred')
      setRetryCount(prev => prev + 1)
    }
  }

  useEffect(() => {
    checkApiStatus()
    
    // Check periodically 
    const interval = setInterval(() => {
      checkApiStatus()
    }, API_STATUS_CHECK_INTERVAL)
    
    return () => clearInterval(interval)
  }, [])

  // Auto-retry with increasing backoff if in error state
  useEffect(() => {
    if (status === 'error' && retryCount < 5) {
      const timeout = setTimeout(() => {
        console.log(`Auto-retrying connection (attempt ${retryCount + 1})`)
        checkApiStatus()
      }, Math.min(1000 * retryCount, 10000))
      
      return () => clearTimeout(timeout)
    }
  }, [status, retryCount])

  return (
    <div className="mt-4 mb-6 p-4 border rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`
            w-3 h-3 rounded-full mr-2
            ${status === 'connected' ? 'bg-green-500' : 
              status === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}
          `}></div>
          <h3 className="text-sm font-medium text-gray-700">
            Backend API Status: {status === 'connected' ? 'Connected' : 
              status === 'loading' ? 'Checking...' : 'Error'}
          </h3>
        </div>
        {lastUpdated && (
          <span className="text-xs text-gray-500">Last checked: {lastUpdated}</span>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-600">
        {message && <p>{message}</p>}
        {testRuns !== null && (
          <p className="mt-1">Found {testRuns} test runs in the database.</p>
        )}
      </div>
      
      {status === 'error' && (
        <div className="mt-2">
          <p className="text-xs text-gray-700 mb-2">
            Make sure the backend server is running on port 8000.
            <br />
            You can start it with: <code className="bg-gray-200 px-1">cd app && python -m uvicorn main:app --reload --port 8000</code>
          </p>
          <button 
            onClick={checkApiStatus}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Retry connection manually
          </button>
        </div>
      )}
    </div>
  )
} 