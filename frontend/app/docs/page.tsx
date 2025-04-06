'use client'

import React, { useState } from 'react'
import { BookOpenIcon, CodeBracketIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('user')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h1>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('user')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
              ${activeTab === 'user' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <UserIcon className={`mr-2 h-5 w-5 ${activeTab === 'user' ? 'text-indigo-600' : 'text-gray-400'}`} />
            User Documentation
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
              ${activeTab === 'technical' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <CodeBracketIcon className={`mr-2 h-5 w-5 ${activeTab === 'technical' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Technical Documentation
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'user' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Getting Started */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Getting Started</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to start using NotTofu for your test management needs.
              </p>
              <a 
                href="/docs/guides/getting-started" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read guide →
              </a>
            </div>
          </div>

          {/* Test Runs */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Test Runs</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to create, manage, and analyze test runs.
              </p>
              <a 
                href="/docs/guides/test-runs" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read guide →
              </a>
            </div>
          </div>

          {/* Stations */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Stations</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to configure and manage test stations.
              </p>
              <a 
                href="/docs/guides/stations" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read guide →
              </a>
            </div>
          </div>

          {/* Procedures */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Procedures</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to create and manage test procedures.
              </p>
              <a 
                href="/docs/guides/procedures" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read guide →
              </a>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Analytics</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to use NotTofu's analytics features.
              </p>
              <a 
                href="/docs/guides/analytics" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read guide →
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">FAQ</h2>
              <p className="text-sm text-gray-500 mb-4">
                Find answers to frequently asked questions.
              </p>
              <a 
                href="/docs/guides/faq" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View FAQ →
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* System Architecture */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">System Architecture</h2>
              <p className="text-sm text-gray-500 mb-4">
                Overview of the NotTofu system architecture and components.
              </p>
              <a 
                href="/docs/technical" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Interactive Diagrams →
              </a>
            </div>
          </div>

          {/* Frontend Architecture */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Frontend Architecture</h2>
              <p className="text-sm text-gray-500 mb-4">
                Details about the frontend components, structure, and design.
              </p>
              <a 
                href="/docs/technical#frontend-architecture" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Interactive Diagrams →
              </a>
            </div>
          </div>

          {/* Entity Relationships */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Entity Relationships</h2>
              <p className="text-sm text-gray-500 mb-4">
                Documentation of the data models and their relationships.
              </p>
              <a 
                href="/docs/technical#data-model" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Interactive Diagrams →
              </a>
            </div>
          </div>

          {/* API Flows */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">API Flows</h2>
              <p className="text-sm text-gray-500 mb-4">
                Documentation of the API endpoints and usage patterns.
              </p>
              <a 
                href="/docs/technical#api-flow" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Interactive Diagrams →
              </a>
            </div>
          </div>

          {/* Development Roadmap */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Development Roadmap</h2>
              <p className="text-sm text-gray-500 mb-4">
                Check out our development roadmap and upcoming features.
              </p>
              <a 
                href="/docs/technical#roadmap" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Interactive Diagrams →
              </a>
            </div>
          </div>

          {/* Contributing */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Contributing</h2>
              <p className="text-sm text-gray-500 mb-4">
                Learn how to contribute to the NotTofu project.
              </p>
              <a 
                href="https://github.com/scuba/code/tofu#contributing" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Documentation */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentation Resources</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              All documentation for NotTofu is available both in the application and on GitHub. 
              You can browse the documentation here or access the source files directly.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://github.com/scuba/code/tofu/tree/main/docs" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <CodeBracketIcon className="mr-2 h-5 w-5" />
                View All Documentation on GitHub
              </a>
              <a 
                href="/docs/download" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <BookOpenIcon className="mr-2 h-5 w-5" />
                Download All Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 