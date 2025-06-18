'use client'

import Dashboard from '@/components/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import DebugEnv from '@/components/DebugEnv'

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <DebugEnv />
        <Dashboard />
      </main>
    </ProtectedRoute>
  )
} 