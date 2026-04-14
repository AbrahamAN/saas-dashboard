'use client'

import { useCreateUser } from '@/lib/hooks/useCreateUser'
import { FormErrors } from '@/lib/types/users'
import { validateCreateUserFields } from '@/lib/validation/createUserForm'
import { useCallback, useEffect, useState } from 'react'

type CreateUserFormProps = {
  onSuccess?: () => void
}

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const [open, setOpen] = useState(false)
  const { createUser, error, loading } = useCreateUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorForm, setErrorForm] = useState<FormErrors>({})

  const handleClose = useCallback(() => {
    setOpen(false)
    setName('')
    setEmail('')
    setErrorForm({})
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, handleClose])

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
        >
          Nuevo Usuario
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
            aria-label="Cerrar modal"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-user-title"
            className="relative z-10 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id="create-user-title" className="text-xl font-semibold text-gray-900">
                Nuevo usuario
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const validationErrors = validateCreateUserFields(name, email)
                if (Object.keys(validationErrors).length > 0) {
                  setErrorForm(validationErrors)
                  return
                }
                const result = await createUser({ name, email })
                if (result) {
                  onSuccess?.()
                  handleClose()
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="nombre"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorForm.name && <p className="mt-1 text-sm text-red-600">{errorForm.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorForm.email && <p className="mt-1 text-sm text-red-600">{errorForm.email}</p>}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
