import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

export default function DownloadDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <Link href="/docs" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to Documentation
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Download Documentation</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="mb-6 text-gray-500">
            You can download all NotTofu documentation for offline reading. Select from the options below:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-md">
              <DocumentArrowDownIcon className="h-8 w-8 text-indigo-500 mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Complete Documentation (PDF)</h3>
                <p className="text-sm text-gray-500">All user and technical documentation in a single PDF</p>
              </div>
              <a 
                href="#" 
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
            
            <div className="flex items-center p-4 border border-gray-200 rounded-md">
              <DocumentArrowDownIcon className="h-8 w-8 text-indigo-500 mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">User Guides Only (PDF)</h3>
                <p className="text-sm text-gray-500">Just the end-user documentation</p>
              </div>
              <a 
                href="#" 
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
            
            <div className="flex items-center p-4 border border-gray-200 rounded-md">
              <DocumentArrowDownIcon className="h-8 w-8 text-indigo-500 mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Technical Documentation (PDF)</h3>
                <p className="text-sm text-gray-500">Documentation for developers and system administrators</p>
              </div>
              <a 
                href="#" 
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
            
            <div className="flex items-center p-4 border border-gray-200 rounded-md">
              <DocumentArrowDownIcon className="h-8 w-8 text-indigo-500 mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Markdown Source Files</h3>
                <p className="text-sm text-gray-500">All documentation in Markdown format (.zip)</p>
              </div>
              <a 
                href="#" 
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 p-4 rounded-md">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Need specific documentation?</h2>
        <p className="text-sm text-gray-500">
          If you need documentation for a specific topic that isn't included here, please check our 
          <a href="https://github.com/scuba/code/tofu/tree/main/docs" className="text-indigo-600 hover:text-indigo-500 mx-1">
            GitHub repository
          </a>
          or contact support.
        </p>
      </div>
    </div>
  )
} 