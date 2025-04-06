import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tofu Test Management',
  description: 'Modern test management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-full bg-gray-50">
        <div className="min-h-screen">
          <Navigation />
          {/* Main content */}
          <div className="lg:pl-64">
            <main className="min-h-screen">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
} 