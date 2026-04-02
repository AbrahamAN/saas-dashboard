'use client'

import { useState } from 'react'
import UserCard from './UserCard'

interface User {
  id: number
  name: string
  email: string
}

export default function UserList() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@example.com',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
    },
  ])

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