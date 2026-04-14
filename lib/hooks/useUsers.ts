import { useState, useEffect, useCallback } from 'react'
import { AppError, createError } from '@/lib/types/errors'

interface User {
  id: number
  name: string
  email: string
}

interface UseUsersReturn {
  users: User[]
  loading: boolean
  error: AppError | null
  refecth: () => void
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers]     = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<AppError | null>(null)
  const [attempt, setAttempt] = useState(0) // controla el retry

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/users', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw { statusCode: res.status }
        return res.json()
      })
      .then((data: User[]) => {
        setUsers(data)
        setLoading(false)
        setError(null)
      })
      .catch(err => {
        if (err.name === 'AbortError') return

        const appError = createError(
          err instanceof Error ? err : new Error('Server error'),
          err.statusCode
        )
        setError(appError)
        setLoading(false)
      })

    return () => controller.abort()
  }, [attempt]) // re-ejecuta cuando attempt cambia

  // retry incrementa attempt → dispara el useEffect de nuevo
  const refecth = useCallback(() => {
    setLoading(true)
    setAttempt(prev => prev + 1)
  }, [])

  return { users, loading, error, refecth }
}