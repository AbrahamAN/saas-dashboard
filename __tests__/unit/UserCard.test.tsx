import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import UserCard from '@/app/users/components/UserCard'

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
  }

  test('renderiza nombre del usuario', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
  })

  test('renderiza email del usuario', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
  })

  test('renderiza botón Ver', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByRole('button', { name: /Ver/i })).toBeInTheDocument()
  })

  test('renderiza botón Eliminar', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument()
  })

  test('tiene data-testid user-card', () => {
    const { container } = render(<UserCard user={mockUser} />)
    expect(container.querySelector('[data-testid="user-card"]')).toBeInTheDocument()
  })
})