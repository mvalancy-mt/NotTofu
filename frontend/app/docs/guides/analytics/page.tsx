import React from 'react'
import Link from 'next/link'
import { ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AnalyticsGuidePage() {
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
            <ChartBarIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Analytics Guide</h1>
          </div>

          <div className="prose max-w-none">
            <h2>Introduction to NotTofu Analytics</h2>
            <p>
              NotTofu's analytics capabilities provide powerful insights into your testing processes, 
              helping you identify trends, optimize procedures, and make data-driven decisions. 
              This guide walks you through the available analytics features and how to leverage them effectively.
            </p>

            <h2>Dashboard Overview</h2>
            <p>
              The Analytics dashboard provides a high-level view of your testing operations:
            </p>
            <ul>
              <li><strong>Summary Metrics:</strong> Key performance indicators at a glance</li>
              <li><strong>Recent Activity:</strong> Latest test runs and their outcomes</li>
              <li><strong>Trending Charts:</strong> Visual representation of important metrics over time</li>
              <li><strong>Quick Filters:</strong> Easily focus on specific time periods, stations, or procedures</li>
            </ul>

            <h2>Test Performance Analysis</h2>
            <h3>Pass/Fail Analysis</h3>
            <p>
              Track test outcomes across different dimensions:
            </p>
            <ul>
              <li><strong>Overall Pass Rate:</strong> Percentage of successful test runs</li>
              <li><strong>Failure Breakdown:</strong> Distribution of failures by phase and step</li>
              <li><strong>Trend Analysis:</strong> Pass rate changes over time</li>
              <li><strong>Comparative Analysis:</strong> Performance across different stations or procedures</li>
            </ul>

            <h3>Time Analysis</h3>
            <p>
              Understand the efficiency of your testing process:
            </p>
            <ul>
              <li><strong>Average Duration:</strong> Time taken to complete test runs</li>
              <li><strong>Phase Timing:</strong> Time distribution across different test phases</li>
              <li><strong>Bottleneck Identification:</strong> Identifying the most time-consuming steps</li>
              <li><strong>Execution Efficiency:</strong> Changes in test duration over time</li>
            </ul>

            <h2>Measurement Analytics</h2>
            <p>
              Gain insights from measurement data collected during test execution:
            </p>
            <ul>
              <li><strong>Statistical Analysis:</strong> Mean, median, standard deviation, etc.</li>
              <li><strong>Distribution Plots:</strong> Visualize the spread of measurement values</li>
              <li><strong>Correlation Analysis:</strong> Identify relationships between different measurements</li>
              <li><strong>Limit Analysis:</strong> Evaluate how close measurements are to pass/fail thresholds</li>
              <li><strong>Trend Monitoring:</strong> Track how measurements change over time</li>
            </ul>

            <h2>Station Analytics</h2>
            <p>
              Monitor and optimize your testing stations:
            </p>
            <ul>
              <li><strong>Utilization:</strong> How effectively each station is being used</li>
              <li><strong>Reliability:</strong> Failure rates and downtime statistics</li>
              <li><strong>Performance Comparison:</strong> Identifying variations between similar stations</li>
              <li><strong>Calibration Tracking:</strong> Monitoring calibration status and drift</li>
            </ul>

            <h2>Custom Reports</h2>
            <p>
              Create personalized analytics views:
            </p>
            <ol>
              <li>Navigate to the <strong>Reports</strong> section of the Analytics page.</li>
              <li>Click <strong>Create New Report</strong>.</li>
              <li>Select from available visualizations:
                <ul>
                  <li>Bar charts, line graphs, pie charts, etc.</li>
                  <li>Data tables with custom columns</li>
                  <li>Statistical summaries</li>
                  <li>Combined views with multiple charts</li>
                </ul>
              </li>
              <li>Configure data sources and filters.</li>
              <li>Arrange and customize the layout.</li>
              <li>Save the report for future use or schedule automated delivery.</li>
            </ol>

            <h2>Exporting and Sharing</h2>
            <p>
              Share insights with stakeholders:
            </p>
            <ul>
              <li><strong>Export Formats:</strong> PDF, CSV, Excel, image files</li>
              <li><strong>Scheduled Reports:</strong> Automatically generate and distribute on a schedule</li>
              <li><strong>Shared Dashboards:</strong> Create dashboards accessible to multiple users</li>
              <li><strong>Embedding:</strong> Include charts in other applications or reports</li>
            </ul>

            <h2>Advanced Analytics</h2>
            <p>
              For power users, NotTofu offers advanced analytics capabilities:
            </p>
            <ul>
              <li><strong>Custom Metrics:</strong> Define your own calculated metrics</li>
              <li><strong>Advanced Filtering:</strong> Complex conditions and exclusions</li>
              <li><strong>Regression Analysis:</strong> Identify factors that influence test outcomes</li>
              <li><strong>Anomaly Detection:</strong> Automatically identify unusual patterns</li>
              <li><strong>Predictive Analytics:</strong> Forecast future trends based on historical data</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Identify key metrics that align with your quality objectives</li>
              <li>Use consistent time periods when comparing data</li>
              <li>Consider statistical significance when interpreting trends</li>
              <li>Create focused dashboards for different user roles</li>
              <li>Regularly review analytics to drive continuous improvement</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Need More Help?</h3>
              <p className="text-blue-700">
                For more information about NotTofu's analytics capabilities, 
                contact our support team at <a href="mailto:support@nottofu.com" className="underline">support@nottofu.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 