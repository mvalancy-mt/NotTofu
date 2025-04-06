import React from 'react'
import Link from 'next/link'
import { QuestionMarkCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function FAQGuidePage() {
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
            <QuestionMarkCircleIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>

          <div className="prose max-w-none">
            <div className="space-y-8">
              {/* General Questions */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">General Questions</h2>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">What is NotTofu?</h3>
                    <p className="mt-2">
                      NotTofu is a comprehensive test management platform designed to streamline and automate the testing process. 
                      It helps teams manage test procedures, execute test runs across different stations, collect and analyze test data, 
                      and generate insightful reports.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Is NotTofu cloud-based or can it be self-hosted?</h3>
                    <p className="mt-2">
                      NotTofu is available in both cloud-hosted and self-hosted versions. The cloud option provides quick setup with no 
                      infrastructure management, while the self-hosted version gives you complete control over your data and environment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How secure is my test data in NotTofu?</h3>
                    <p className="mt-2">
                      Security is a top priority for NotTofu. The platform implements industry-standard security measures including 
                      data encryption (both in transit and at rest), role-based access control, audit logging, and regular security updates. 
                      Our self-hosted option also allows you to implement your own security policies.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Account & Setup */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">Account & Setup</h2>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How do I create a new account?</h3>
                    <p className="mt-2">
                      For the cloud version, visit our website and click "Get Started" to create an account. For self-hosted installations, 
                      follow the setup instructions provided in our documentation to deploy the platform and create your initial admin account.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How can I add users to my organization?</h3>
                    <p className="mt-2">
                      Administrators can add users by navigating to Settings → Users → Add User. You can either create accounts manually 
                      or invite users via email. Each user can be assigned specific roles and permissions based on their responsibilities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">What are the system requirements for running NotTofu?</h3>
                    <p className="mt-2">
                      For the cloud version, you only need a modern web browser (Chrome, Firefox, Safari, or Edge). 
                      For the self-hosted version, requirements depend on your expected usage volume, but typical installations 
                      require a server with 4+ CPU cores, 8GB+ RAM, and 50GB+ storage. Detailed specifications are available in our 
                      installation guide.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Features & Usage */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">Features & Usage</h2>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Can I import my existing test procedures into NotTofu?</h3>
                    <p className="mt-2">
                      Yes, NotTofu supports importing test procedures from various formats including Excel, CSV, XML, and JSON. 
                      There's also an API available for programmatic imports from other test management systems.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How does NotTofu handle automated vs. manual testing?</h3>
                    <p className="mt-2">
                      NotTofu supports both automated and manual testing workflows. For automated testing, it provides API endpoints 
                      and integrations with popular automation frameworks. For manual testing, it offers intuitive interfaces for 
                      testers to record observations, upload files, and document results.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Can I customize the reports and dashboards?</h3>
                    <p className="mt-2">
                      Absolutely! NotTofu provides extensive customization options for reports and dashboards. You can create 
                      custom visualizations, configure metrics calculations, set up filtered views, and design templates that 
                      match your organization's reporting needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Is there a limit to the number of test runs I can store?</h3>
                    <p className="mt-2">
                      Storage limits depend on your subscription plan for the cloud version or your available storage for self-hosted 
                      installations. We offer various archiving options to help manage historical data while maintaining access to 
                      important records.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Troubleshooting */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">Troubleshooting</h2>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">I'm having trouble connecting a test station. What should I check?</h3>
                    <p className="mt-2">
                      First, verify network connectivity between the station and the NotTofu server. Check that the station agent is 
                      installed and running correctly. Ensure the station has the correct authentication credentials. If problems persist, 
                      check the logs on both the station and server for specific error messages.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Why are my test run results showing as pending?</h3>
                    <p className="mt-2">
                      Results may show as pending if the test execution is still in progress, if there was a communication issue 
                      between the test station and the server, or if the test process was interrupted. Check the detailed run logs 
                      for any error messages or connectivity issues.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How can I restore a previous version of a test procedure?</h3>
                    <p className="mt-2">
                      Navigate to the procedure details page, click on the "Versions" tab, locate the version you want to restore, 
                      and click "Restore this version." You can preview any version before restoring it to verify it's the correct one.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Integration & API */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">Integration & API</h2>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Does NotTofu integrate with CI/CD pipelines?</h3>
                    <p className="mt-2">
                      Yes, NotTofu offers integrations with popular CI/CD tools including Jenkins, GitHub Actions, CircleCI, and GitLab CI. 
                      These integrations allow you to trigger test runs, report results, and incorporate testing metrics into your 
                      deployment pipeline.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Is there an API for custom integrations?</h3>
                    <p className="mt-2">
                      NotTofu provides a comprehensive REST API that gives you programmatic access to virtually all platform features. 
                      This API is fully documented and includes example code for common languages and frameworks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Can NotTofu connect to our existing data storage systems?</h3>
                    <p className="mt-2">
                      NotTofu can integrate with various data storage systems including SQL databases, object storage services, 
                      and data warehouses. For specialized needs, custom data connectors can be developed using our API.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Can't find what you're looking for?</h3>
              <p className="text-blue-700">
                If your question isn't answered here, please contact our support team at 
                <a href="mailto:support@nottofu.com" className="underline ml-1">support@nottofu.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 