import { FormErrors } from '@/lib/types/users'

export function validateCreateUserFields(name: string, email: string): FormErrors {
  const errors: FormErrors = {}

  if (!name.trim()) {
    errors.name = 'El nombre  es requerido'
  } else if (name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!email.trim()) {
    errors.email = 'El email es requerido'
  } else if (!email.includes('@')) {
    errors.email = 'El email no es valido'
  }

  return errors
}
