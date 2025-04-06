import { redirect } from 'next/navigation'
import { 
  BeakerIcon, 
  ClipboardDocumentListIcon, 
  CubeIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

export default function WelcomePage() {
  return (
    <div className="bg-gray-50 h-full">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 py-6">Welcome to NotTofu</h1>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BeakerIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Create an API key
                      </dt>
                      <dd>
                        <div className="text-xs font-medium text-gray-900">
                          Connect your testing software with the NotTofu backend
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-xs">
                  <a href="/api-keys" className="font-medium text-blue-700 hover:text-blue-900">
                    Create key
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ClipboardDocumentListIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Train in simulator
                      </dt>
                      <dd>
                        <div className="text-xs font-medium text-gray-900">
                          Practice with the NotTofu interface using simulated data
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-xs">
                  <a href="/simulator" className="font-medium text-blue-700 hover:text-blue-900">
                    Start simulator
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CubeIcon className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Explore the cockpit
                      </dt>
                      <dd>
                        <div className="text-xs font-medium text-gray-900">
                          Check out the main features of the NotTofu dashboard
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-xs">
                  <a href="/dashboard" className="font-medium text-blue-700 hover:text-blue-900">
                    View dashboard
                  </a>
                </div>
              </div>
            </div>
            
            {/* Card 4 - Documentation */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpenIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Read the docs
                      </dt>
                      <dd>
                        <div className="text-xs font-medium text-gray-900">
                          Access user guides and technical documentation
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-xs">
                  <a href="/docs" className="font-medium text-blue-700 hover:text-blue-900">
                    View documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 