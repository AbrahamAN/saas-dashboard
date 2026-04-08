'use client'

import UserCard from './UserCard'
import { ErrorMessage } from './ErrorMessage'
import { useUsers } from '@/lib/hooks/useUsers'


export default function UserList() {
  const { users, loading, error,retry } = useUsers()
  

  if(loading) return <p className="text-center text-gray-600">Cargando usuarios...</p>
  if(error) return <ErrorMessage error={error} onRetry={retry} />


  return (
    <div>
      <p className="text-gray-600 mb-6">
        Total de usuarios: <strong>{users.length}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}