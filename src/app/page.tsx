'use client'

import Dashboard from '@/components/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <Dashboard />
      </main>
    </ProtectedRoute>
  )
} 