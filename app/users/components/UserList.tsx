'use client'

import UserCard from './UserCard'
import { ErrorMessage } from './ErrorMessage'
import { useUsers } from '@/lib/hooks/useUsers'
import { useMemo, useState } from 'react'
import { SearchBar } from './SearchBar'
import { RefreshButton } from './RefreshButton'


export default function UserList() {
  const { users, loading, error,refecth } = useUsers()
  const [search, setSearch] = useState('')
  
    const filteredUsers = useMemo(() => {
        if(!search.trim()) return users
        const query = search.toLowerCase()

        return users.filter(user => 
          user.name.toLocaleLowerCase().includes(query) ||
          user.email.toLocaleLowerCase().includes(query)
        )

    },[search, users])

  if(loading) return <p className="text-center text-gray-600">Cargando usuarios...</p>
  if(error) return <ErrorMessage error={error} onRetry={refecth} />


  return (
    <div>
      {/* Header con buscador  y boton de refetch */}
      <div className='flex flex-col sm:flex-row gap-3 mb-6'>
            <div className='flex-1'>
              <SearchBar
                value={search}
                onChange={setSearch}
              />
            </div>
            <RefreshButton
               loading={loading}
               onRefresh={refecth}
            /> 
      </div>
      {/* Contador  */}

      <p className="text-gray-600 mb-6">
        {search ?
        `${filteredUsers.length} resultados ${filteredUsers.length !== 1 ? 's' : ''} para "${search}"`
        : `Total: ${users.length} usuario${users.length !== 1 ? 's' : ''}` }
      </p>
      {filteredUsers.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-gray-400 text-lg'> no se encontraron usuarios</p>
            <button
              onClick={() => setSearch('')}
              className='mt-4 text-blue-600 hover:underline text-sm'>
                  Limpiar busqueda
            </button>
          </div>
       ): (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) 
      }
    </div>
  )
}