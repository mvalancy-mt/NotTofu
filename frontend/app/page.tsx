'use client'

import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from './config'
import {
  HomeIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  ServerIcon,
} from '@heroicons/react/24/outline'

export default function Home() {
  const navLinks = [
    { 
      href: '/runs', 
      label: 'Test Runs', 
      icon: ClipboardDocumentListIcon, 
      description: 'View and manage test runs, check results and analyze failures'
    },
    { 
      href: '/procedures', 
      label: 'Procedures', 
      icon: DocumentTextIcon, 
      description: 'Create and manage test procedures and test steps'
    },
    { 
      href: '/stations', 
      label: 'Stations', 
      icon: ComputerDesktopIcon, 
      description: 'Configure test stations and manage station settings'
    },
    { 
      href: '/analytics', 
      label: 'Analytics', 
      icon: ChartBarIcon, 
      description: 'View test analytics, charts, and performance metrics'
    },
    { 
      href: '/docs', 
      label: 'Documentation', 
      icon: BookOpenIcon, 
      description: 'Browse platform documentation and guides'
    },
    { 
      href: '/settings', 
      label: 'Settings', 
      icon: Cog6ToothIcon, 
      description: 'Configure application settings and preferences'
    },
    { 
      href: '/status', 
      label: 'API Status', 
      icon: ServerIcon, 
      description: 'Check backend API connection status and server information'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Image 
            src="/Logo.png" 
            alt="NotTofu Logo" 
            width={150} 
            height={150} 
            className="rounded-full border-4 border-blue-100 shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">NotTofu Test Management Platform</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Simplify your testing workflow with our comprehensive test management solution.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
          >
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-md p-2 mr-4 group-hover:bg-blue-200 transition-colors">
                {link.icon && <link.icon className="h-6 w-6 text-blue-600" />}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{link.label}</h2>
            </div>
            <p className="text-gray-600">{link.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Backend API</h2>
        <p className="text-gray-600 mb-2">
          Make sure the backend server is running before using the application.
        </p>
        <div className="bg-gray-100 rounded p-2 font-mono text-sm">
          {API_URL}
        </div>
      </div>
    </div>
  )
} 