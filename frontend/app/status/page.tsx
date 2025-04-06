'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API_URL } from '../config'

export default function StatusPage() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [message, setMessage] = useState('Checking backend connection...')
  const [lastChecked, setLastChecked] = useState<string | null>(null)

  const checkConnection = async () => {
    try {
      setStatus('checking')
      setMessage('Checking backend connection...')
      
      console.log(`Checking connection to ${API_URL}...`)
      const response = await fetch(`${API_URL}/`, { 
        cache: 'no-store',
        signal: AbortSignal.timeout(5000)
      })
      
      const data = await response.json()
      setStatus('connected')
      setMessage(`Connected to backend API. ${data.message || ''}`)
      setLastChecked(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Connection error:', error)
      setStatus('error')
      setMessage(`Failed to connect to backend at ${API_URL}. Make sure the backend server is running.`)
      setLastChecked(new Date().toLocaleTimeString())
    }
  }

  useEffect(() => {
    checkConnection()
    
    const interval = setInterval(checkConnection, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NotTofu API Status</h1>
      
      <div className={`p-6 rounded-lg mb-6 ${
        status === 'connected' ? 'bg-green-50 border border-green-200' :
        status === 'checking' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`w-4 h-4 rounded-full mr-3 ${
            status === 'connected' ? 'bg-green-500' :
            status === 'checking' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
          <h2 className="text-lg font-medium">
            {status === 'connected' ? 'Connected' :
             status === 'checking' ? 'Checking Connection...' :
             'Connection Error'}
          </h2>
        </div>
        
        <p className="mb-2">{message}</p>
        
        {lastChecked && (
          <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
        )}
        
        {status === 'error' && (
          <div className="mt-4">
            <button 
              onClick={checkConnection}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Retry Connection
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-4">API Information</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Connection Details</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>API URL: <code className="bg-gray-100 px-1 rounded">{API_URL}</code></li>
              <li>Refresh Interval: <code className="bg-gray-100 px-1 rounded">10 seconds</code></li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Common Issues</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Backend server not running</li>
              <li>Incorrect port configuration</li>
              <li>CORS issues with browser security</li>
              <li>Python module import errors</li>
              <li>Missing dependencies</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-4">Quick Commands</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Start Backend</h3>
            <div className="bg-gray-100 p-2 rounded mb-2">
              <code>run_backend.bat 8000</code> (Windows)
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <code>./run_backend.sh 8000</code> (Linux/macOS)
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Start Frontend</h3>
            <div className="bg-gray-100 p-2 rounded mb-2">
              <code>run_frontend.bat</code> (Windows)
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <code>./run_frontend.sh</code> (Linux/macOS)
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Start Both</h3>
            <div className="bg-gray-100 p-2 rounded mb-2">
              <code>start.bat</code> (Windows)
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <code>./start.sh</code> (Linux/macOS)
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Backup Data</h3>
            <div className="bg-gray-100 p-2 rounded mb-2">
              <code>run_backup.bat</code> (Windows)
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <code>./run_backup.sh</code> (Linux/macOS)
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg border p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Complete Setup Process</h2>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">1. Initial Setup</h3>
          <p className="mb-2">Run the setup script once to install all dependencies:</p>
          <div className="bg-gray-100 p-2 rounded mb-2">
            <code>setup.bat</code> (Windows)
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <code>./setup.sh</code> (Linux/macOS)
          </div>
          <p className="mt-2 text-sm text-gray-600">This will create a Python virtual environment, install dependencies, set up the database, and create convenience scripts.</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">2. Starting the Application</h3>
          <p className="mb-2">Use the start script to launch both backend and frontend:</p>
          <div className="bg-gray-100 p-2 rounded mb-2">
            <code>start.bat</code> (Windows)
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <code>./start.sh</code> (Linux/macOS)
          </div>
          <p className="mt-2 text-sm text-gray-600">This will start the backend API and frontend in separate windows.</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">3. Backing Up Data</h3>
          <p className="mb-2">Use the backup script to create a timestamped backup of your database and logs:</p>
          <div className="bg-gray-100 p-2 rounded mb-2">
            <code>run_backup.bat</code> (Windows)
          </div>
          <div className="bg-gray-100 p-2 rounded mb-2">
            <code>./run_backup.sh</code> (Linux/macOS)
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Backups are stored in <code className="bg-gray-100 px-1 rounded">%APPDATA%\NotTofu\Backups</code> (Windows) or 
            <code className="bg-gray-100 px-1 rounded">~/.nottofu/backups</code> (Linux/macOS).
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">4. Troubleshooting</h3>
          <p className="mb-2">If you encounter Python module errors:</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>Make sure you're running the commands from the project root directory</li>
            <li>Ensure the virtual environment is activated</li>
            <li>Check that all dependencies are installed: <code className="bg-gray-100 px-1 rounded">pip install -r requirements.txt</code></li>
            <li>Verify uvicorn is installed: <code className="bg-gray-100 px-1 rounded">pip install "uvicorn[standard]"</code></li>
          </ul>
          <p className="text-sm text-gray-600">The most common issue is running commands from the wrong directory. Always run commands from the project root, not from inside subdirectories.</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  )
} 