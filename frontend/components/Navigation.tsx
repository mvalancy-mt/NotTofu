'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BeakerIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import Logo from './Logo'

const navigation = [
  { name: 'Test Runs', href: '/runs', icon: ClipboardDocumentListIcon },
  { name: 'Procedures', href: '/procedures', icon: DocumentTextIcon },
  { name: 'Stations', href: '/stations', icon: ComputerDesktopIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: UserGroupIcon },
  { name: 'Documentation', href: '/docs', icon: BookOpenIcon },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="flex items-center">
                <Logo size={24} />
                <span className="ml-2 text-lg font-semibold text-gray-900">NotTofu</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 