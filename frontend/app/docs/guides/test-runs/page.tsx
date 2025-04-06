import React from 'react'
import Link from 'next/link'
import { ClipboardDocumentListIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function TestRunsGuidePage() {
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
            <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Test Runs Guide</h1>
          </div>

          <div className="prose max-w-none">
            <h2>Overview</h2>
            <p>
              Test runs are at the core of NotTofu's functionality. They represent the execution of test procedures across different stations and provide a comprehensive view of your testing process.
            </p>

            <h2>Creating a New Test Run</h2>
            <ol>
              <li>Navigate to the <strong>Test Runs</strong> page from the main navigation.</li>
              <li>Click the <strong>New Test Run</strong> button in the top-right corner.</li>
              <li>Fill in the required information:
                <ul>
                  <li><strong>Name:</strong> A descriptive name for the test run</li>
                  <li><strong>Description:</strong> Optional details about the purpose of the run</li>
                  <li><strong>Procedure:</strong> Select the test procedure to execute</li>
                  <li><strong>Station:</strong> Select the station where the test will run</li>
                </ul>
              </li>
              <li>Click <strong>Create Test Run</strong> to initiate the test.</li>
            </ol>

            <h2>Viewing Test Run Details</h2>
            <p>
              After creating a test run or selecting an existing one from the list, you'll be taken to the Test Run Details page where you can:
            </p>
            <ul>
              <li>See overall test status and progress</li>
              <li>View individual test phases and their results</li>
              <li>Access detailed measurements and values</li>
              <li>Download test reports in various formats</li>
            </ul>

            <h2>Managing Test Runs</h2>
            <p>From the main Test Runs page, you can:</p>
            <ul>
              <li><strong>Filter</strong> runs by status, date, procedure, or station</li>
              <li><strong>Sort</strong> runs by various criteria</li>
              <li><strong>Archive</strong> completed runs to keep your workspace organized</li>
              <li><strong>Export</strong> run data for external analysis</li>
            </ul>

            <h2>Analyzing Results</h2>
            <p>
              NotTofu provides several tools to help you analyze test results:
            </p>
            <ul>
              <li><strong>Pass/Fail Summary:</strong> Quick overview of test outcomes</li>
              <li><strong>Phase Breakdown:</strong> Detailed view of each test phase</li>
              <li><strong>Measurement Analysis:</strong> Graphs and tables showing key measurements</li>
              <li><strong>Comparison View:</strong> Compare multiple test runs side by side</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Use clear, consistent naming conventions for test runs</li>
              <li>Include relevant details in the description field</li>
              <li>Archive completed runs regularly to maintain organization</li>
              <li>Use tags to categorize runs for easier filtering and searching</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Need More Help?</h3>
              <p className="text-blue-700">
                If you have additional questions or need assistance with test runs, 
                contact our support team at <a href="mailto:support@nottofu.com" className="underline">support@nottofu.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 