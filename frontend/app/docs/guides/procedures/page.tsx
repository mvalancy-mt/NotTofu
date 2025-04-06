import React from 'react'
import Link from 'next/link'
import { DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ProceduresGuidePage() {
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
            <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Procedures Guide</h1>
          </div>

          <div className="prose max-w-none">
            <h2>Understanding Test Procedures</h2>
            <p>
              Test procedures in NotTofu define the sequence of operations, measurements, and criteria used to validate a product or system. 
              They serve as the blueprint for test execution and ensure consistency and repeatability across multiple test runs.
            </p>

            <h2>Procedure Structure</h2>
            <p>Each test procedure is organized into a hierarchical structure:</p>
            <ul>
              <li><strong>Procedure:</strong> The top-level container for all test activities</li>
              <li><strong>Phases:</strong> Major sections of the test, often representing distinct functional areas</li>
              <li><strong>Steps:</strong> Individual test operations within each phase</li>
              <li><strong>Measurements:</strong> Specific data points collected during test execution</li>
              <li><strong>Criteria:</strong> Pass/fail conditions for each measurement</li>
            </ul>

            <h2>Creating a Procedure</h2>
            <ol>
              <li>Navigate to the <strong>Procedures</strong> page from the main navigation.</li>
              <li>Click the <strong>New Procedure</strong> button in the top-right corner.</li>
              <li>Provide basic information:
                <ul>
                  <li><strong>Name:</strong> A descriptive title for the procedure</li>
                  <li><strong>Description:</strong> Details about the procedure's purpose and scope</li>
                  <li><strong>Version:</strong> Version number for tracking changes</li>
                  <li><strong>Category:</strong> Classification for organizing procedures</li>
                </ul>
              </li>
              <li>Click <strong>Create</strong> to initialize the procedure.</li>
            </ol>

            <h2>Defining Test Phases</h2>
            <p>
              After creating a procedure, you can define its phases:
            </p>
            <ol>
              <li>In the procedure editor, click <strong>Add Phase</strong>.</li>
              <li>Enter a name and description for the phase.</li>
              <li>Set phase parameters such as:
                <ul>
                  <li><strong>Order:</strong> Sequence position within the procedure</li>
                  <li><strong>Execution Mode:</strong> Automatic, manual, or hybrid</li>
                  <li><strong>Dependencies:</strong> Previous phases that must be completed first</li>
                  <li><strong>Timeout:</strong> Maximum allowed execution time</li>
                </ul>
              </li>
              <li>Click <strong>Save Phase</strong> to add it to the procedure.</li>
            </ol>

            <h2>Adding Test Steps</h2>
            <p>
              Each phase consists of one or more test steps:
            </p>
            <ol>
              <li>Select a phase and click <strong>Add Step</strong>.</li>
              <li>Configure the step properties:
                <ul>
                  <li><strong>Name:</strong> Descriptive title for the step</li>
                  <li><strong>Type:</strong> Action, measurement, verification, or decision</li>
                  <li><strong>Execution Details:</strong> Commands, scripts, or manual instructions</li>
                  <li><strong>Expected Outcome:</strong> What constitutes successful completion</li>
                </ul>
              </li>
              <li>Set any step-specific parameters based on the selected type.</li>
              <li>Click <strong>Save Step</strong> to add it to the phase.</li>
            </ol>

            <h2>Defining Measurements and Criteria</h2>
            <p>
              For measurement steps, you can define:
            </p>
            <ul>
              <li><strong>Measurement Type:</strong> Numeric, boolean, string, or enum</li>
              <li><strong>Units:</strong> Applicable units of measurement</li>
              <li><strong>Pass Criteria:</strong> Conditions that determine if the measurement passes:
                <ul>
                  <li>Range limits (min/max values)</li>
                  <li>Exact match requirements</li>
                  <li>Pattern matching for strings</li>
                  <li>Custom evaluation expressions</li>
                </ul>
              </li>
              <li><strong>Resolution:</strong> Required measurement precision</li>
              <li><strong>Sampling:</strong> Single reading or multiple samples</li>
            </ul>

            <h2>Procedure Validation</h2>
            <p>
              Before using a procedure for actual testing, you should validate it:
            </p>
            <ol>
              <li>Click the <strong>Validate</strong> button in the procedure editor.</li>
              <li>Review any reported issues or warnings.</li>
              <li>Fix any structural or logical problems identified.</li>
              <li>Consider running a test execution in a development environment.</li>
            </ol>

            <h2>Version Control</h2>
            <p>
              NotTofu provides version control for procedures:
            </p>
            <ul>
              <li>Each saved change creates a new revision.</li>
              <li>You can view the complete revision history.</li>
              <li>Compare any two versions to see the differences.</li>
              <li>Revert to a previous version if needed.</li>
              <li>Create formal releases with major/minor version numbers.</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Design procedures to be modular and reusable</li>
              <li>Include detailed descriptions for each phase and step</li>
              <li>Define clear pass/fail criteria for all measurements</li>
              <li>Validate procedures thoroughly before using in production</li>
              <li>Document any special requirements or prerequisites</li>
              <li>Use consistent naming conventions</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Need More Help?</h3>
              <p className="text-blue-700">
                For additional guidance on creating effective test procedures, 
                contact our support team at <a href="mailto:support@nottofu.com" className="underline">support@nottofu.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 