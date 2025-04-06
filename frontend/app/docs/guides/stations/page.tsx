import React from 'react'
import Link from 'next/link'
import { ComputerDesktopIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function StationsGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/docs" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to Documentation
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-8">
          <div className="flex items-center mb-6">
            <ComputerDesktopIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Stations Guide</h1>
          </div>

          <div className="prose max-w-none">
            <h2>What are Stations?</h2>
            <p>
              In NotTofu, stations represent the physical or virtual testing environments where your test procedures are executed. 
              Each station can have unique configurations, capabilities, and resources that make it suitable for specific types of tests.
            </p>

            <h2>Managing Stations</h2>
            <h3>Viewing Stations</h3>
            <p>
              The Stations page provides an overview of all configured testing stations in your environment. 
              From this page, you can:
            </p>
            <ul>
              <li>See station status (online/offline/busy)</li>
              <li>View station capabilities and specifications</li>
              <li>Monitor recent activity and test runs</li>
              <li>Access detailed station information</li>
            </ul>

            <h3>Adding a New Station</h3>
            <ol>
              <li>Navigate to the <strong>Stations</strong> page from the main navigation.</li>
              <li>Click the <strong>Add Station</strong> button in the top-right corner.</li>
              <li>Fill in the required information:
                <ul>
                  <li><strong>Name:</strong> A unique identifier for the station</li>
                  <li><strong>Description:</strong> Details about the station's purpose and capabilities</li>
                  <li><strong>Type:</strong> Select the appropriate station type</li>
                  <li><strong>Location:</strong> Physical or network location</li>
                  <li><strong>Capabilities:</strong> Specific features or hardware available on this station</li>
                </ul>
              </li>
              <li>Click <strong>Create Station</strong> to add it to your environment.</li>
            </ol>

            <h3>Configuring Stations</h3>
            <p>
              Each station can be configured with specific parameters and settings:
            </p>
            <ul>
              <li><strong>Hardware Configuration:</strong> Specify connected instruments, devices, and resources</li>
              <li><strong>Software Configuration:</strong> Set up required software, drivers, and tools</li>
              <li><strong>Access Control:</strong> Define which users or teams can access this station</li>
              <li><strong>Scheduling:</strong> Configure availability windows and reservation rules</li>
            </ul>

            <h2>Station Details</h2>
            <p>
              The Station Details page provides comprehensive information about a specific station:
            </p>
            <ul>
              <li><strong>Status and Health:</strong> Current operational status and diagnostic information</li>
              <li><strong>Configuration:</strong> Detailed hardware and software setup</li>
              <li><strong>History:</strong> Log of test runs and maintenance activities</li>
              <li><strong>Performance Metrics:</strong> Utilization, success rates, and other KPIs</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Regularly verify station calibration and configuration</li>
              <li>Document station capabilities thoroughly</li>
              <li>Implement a maintenance schedule for each station</li>
              <li>Monitor station utilization to optimize resource allocation</li>
              <li>Keep station software and firmware updated</li>
            </ul>

            <h2>Troubleshooting</h2>
            <h3>Common Issues</h3>
            <ul>
              <li><strong>Connection Problems:</strong> Verify network connectivity and ensure the station is powered on</li>
              <li><strong>Configuration Errors:</strong> Check for mismatches between required and available resources</li>
              <li><strong>Hardware Failures:</strong> Run diagnostic tests to identify faulty components</li>
              <li><strong>Software Issues:</strong> Verify that all required software is installed and properly configured</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Need More Help?</h3>
              <p className="text-blue-700">
                If you're experiencing issues with station setup or management, 
                contact our support team at <a href="mailto:support@nottofu.com" className="underline">support@nottofu.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 