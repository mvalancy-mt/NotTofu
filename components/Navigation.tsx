'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  ChartBarIcon,
  PlayIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import Logo from './Logo'

const navigation = [
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Test Runs', href: '/runs', icon: PlayIcon },
  { name: 'Stations', href: '/stations', icon: ComputerDesktopIcon },
  { name: 'Procedures', href: '/procedures', icon: BeakerIcon },
  { name: 'Documentation', href: '/docs', icon: BookOpenIcon },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Account', href: '/account', icon: UserCircleIcon },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <Logo size={32} />
              <span className="text-xl font-semibold text-gray-900">NotTofu</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                            ${isActive
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          <item.icon
                            className={`h-5 w-5 shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">Settings</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      >
                        <item.icon
                          className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        {/* Add mobile menu here */}
      </div>
    </>
  )
} 