'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Model Insights', href: '/model-insights' },
    { name: 'Handwriting', href: '/handwriting' },
    { name: 'Data Processing', href: '/data-processing' },
    { name: 'NLP', href: '/nlp' },
  ]

  // Add admin menu item if user is admin
  if (session?.user?.role === 'ADMIN') {
    menuItems.push({ name: 'Admin', href: '/admin' })
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pl-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
           <h1 className="pl-8 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
            Script Sure AI
           </h1>
          </div>

          {/* User Info */}
          {status === 'authenticated' && session?.user && (
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full mt-1">
                    {session.user.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-500/20 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sign Out Button */}
          {status === 'authenticated' && (
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Sign In Link */}
          {status === 'unauthenticated' && (
            <div className="p-4 border-t border-gray-800">
              <Link
                href="/auth/signin"
                className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 