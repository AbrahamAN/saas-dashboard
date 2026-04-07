import { useState,useEffect } from 'react'

interface User{
    id: number;
    name: string;
    email: string;
}

interface UseUsersReturn {
    users: User[];
    loading: boolean;
    error: string | null;
}

export function useUsers(): UseUsersReturn {

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      const controller = new AbortController()

      fetch('http://localhost:3000/api/users', {
        signal: controller.signal
      })
      .then(res => {
        if(!res.ok) throw new Error('Error al cargar los usuarios')
          return res.json()
      })
      .then((data:User[])=> {
        setUsers(data)
        setLoading(false)
      })
      .catch((error:Error)=> {
        setError(error.message)
        setLoading(false)
      })
    return () => controller.abort()
  
    },[])

    return {
        users,
        loading,
        error
    }
}