'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './globals.css'
import { Inter } from 'next/font/google'
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
import Logo from '@/components/Logo'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/runs', label: 'Test Runs', icon: ClipboardDocumentListIcon },
    { href: '/procedures', label: 'Procedures', icon: DocumentTextIcon },
    { href: '/stations', label: 'Stations', icon: ComputerDesktopIcon },
    { href: '/analytics', label: 'Analytics', icon: ChartBarIcon },
    { href: '/docs', label: 'Documentation', icon: BookOpenIcon },
    { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
    { href: '/status', label: 'API Status', icon: ServerIcon },
  ]
  
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>NotTofu Test Management</title>
        <meta name="description" content="Test management platform" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center">
                    <Logo size={28} />
                    <span className="ml-2 text-lg font-bold text-blue-600">NotTofu</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Removed duplicate API Status and Home buttons */}
              </div>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
} 