import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Preloader from '@/components/Preloader'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SCRIPT SURE AI',
  description: 'Advanced AI platform for data processing and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-black text-gray-100 min-h-screen flex`}
      >
        <AuthProvider>
          <Preloader />
          <div className="flex h-screen w-full">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 pt-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
} 