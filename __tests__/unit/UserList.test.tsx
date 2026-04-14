import {render , screen , waitFor} from '@testing-library/react'
import {describe, test , expect, vi ,beforeEach } from 'vitest'
import UserList from '@/app/users/components/UserList'



const mockUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@test.com' },
    { id: 2, name: 'Bob Smith',     email: 'bob@test.com'   },
  ]
  

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok:true,
        json: () => Promise.resolve(mockUsers)
    } as Response)
})  



describe('UserList', () => {

    test('muestra "Cargando..." mientras fetchea', () => {
        render(<UserList/>)
        expect(screen.getByText(/Cargando/i)).toBeInTheDocument()
    })


    test('muestra usuarios después del fetch', async () => {
        render(<UserList />)
        await waitFor(() => {
          expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
          expect(screen.getByText('Bob Smith')).toBeInTheDocument()
        })
      })
    

    test('muestra el total de usuarios', async () => {
        render(<UserList/>)
        await waitFor(() => {
            expect(screen.getByText(/Total:/i)).toBeInTheDocument()
        })
    })

    test('muestra error cuando el servidor muestre !ok' , async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok:false,
        } as Response)
        render(<UserList/>)
        await waitFor(() => {
            expect(screen.getByText(/Error/i)).toBeInTheDocument()
        })
    })
})