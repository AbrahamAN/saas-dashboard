'use client'

import ErrorBoundary from '@/components/ErrorBoundary'
import UserList from './components/UserList'

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
      <ErrorBoundary>
        <UserList />
      </ErrorBoundary>
    </div>
  )
}       