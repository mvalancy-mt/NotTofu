import React from 'react'
import Link from 'next/link'

export default function GettingStartedGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <Link href="/docs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to Documentation
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Getting Started with NotTofu</h1>
      
      <div className="prose prose-indigo prose-lg max-w-none">
        <h2>Welcome to NotTofu</h2>
        <p>
          NotTofu is a modern test management platform designed to help you track, manage, and analyze your testing workflow. 
          This guide will help you get up and running with the platform quickly.
        </p>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>Test Runs Management</strong> - Create, track, and analyze test runs</li>
          <li><strong>Station Configuration</strong> - Configure and manage test stations</li>
          <li><strong>Procedure Management</strong> - Define and maintain test procedures</li>
          <li><strong>Data Analytics</strong> - Gain insights from your test data</li>
        </ul>
        
        <h2>Navigation</h2>
        <p>
          NotTofu has a simple navigation structure:
        </p>
        <ul>
          <li><strong>Analytics</strong> - Overview of your testing metrics</li>
          <li><strong>Test Runs</strong> - List and details of test executions</li>
          <li><strong>Stations</strong> - Configuration of test stations</li>
          <li><strong>Procedures</strong> - Management of test procedures</li>
          <li><strong>Documentation</strong> - User and technical documentation</li>
        </ul>
        
        <h2>Your First Steps</h2>
        <ol>
          <li>
            <strong>Explore the Dashboard</strong>
            <p>Start by visiting the Analytics page to get an overview of your testing activities.</p>
          </li>
          <li>
            <strong>View Test Runs</strong>
            <p>Browse existing test runs to understand the data structure and workflow.</p>
          </li>
          <li>
            <strong>Configure a Station</strong>
            <p>Set up a test station that represents your physical testing environment.</p>
          </li>
          <li>
            <strong>Define a Procedure</strong>
            <p>Create a test procedure that defines the steps and measurements to collect.</p>
          </li>
        </ol>
        
        <h2>Creating a Test Run</h2>
        <p>
          To create a new test run:
        </p>
        <ol>
          <li>Navigate to the Test Runs page</li>
          <li>Click the "New Test Run" button</li>
          <li>Select a station and procedure</li>
          <li>Fill in the required information</li>
          <li>Start the test run</li>
        </ol>
        
        <h2>Viewing Test Results</h2>
        <p>
          After a test run is complete:
        </p>
        <ol>
          <li>Navigate to the Test Runs page</li>
          <li>Find your test run in the list</li>
          <li>Click on the run to view details</li>
          <li>Explore phases, measurements, and statistics</li>
        </ol>
        
        <h2>Next Steps</h2>
        <p>
          Once you're familiar with the basics, you can:
        </p>
        <ul>
          <li>Set up advanced filtering for test runs</li>
          <li>Create custom dashboards for your data</li>
          <li>Integrate with your existing testing tools</li>
          <li>Set up automated reporting</li>
        </ul>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
          <p className="mt-2">
            If you have any questions or need assistance, check out our other guides or contact support.
          </p>
          <div className="mt-4">
            <Link href="/docs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Browse all documentation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 