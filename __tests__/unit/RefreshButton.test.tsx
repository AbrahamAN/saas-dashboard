import {render , screen , fireEvent } from '@testing-library/react'
import {describe,test, expect,vi} from 'vitest'
import { RefreshButton } from '@/app/users/components/RefreshButton'


describe('RefreshButton',() => {

    test('renderiza el boton con texto "Actulizar"' ,() => {
        render(<RefreshButton loading={false} onRefresh={vi.fn()} />)
        expect(screen.getByRole('button',{name: /Actualizar/i })).toBeInTheDocument()
    })

    test('muestra "Actulizando..." cuando loading es true', () => {
        render(<RefreshButton loading={true} onRefresh={vi.fn()}/>)
        expect(screen.getByText('Actualizando...')).toBeInTheDocument()
    })

    test('el boton esta desabilitado cuando loading es true', () => {
        render(<RefreshButton loading={true} onRefresh={vi.fn()}/>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    test('el boton no esta desabilitado cuando loading es FALSE', () => {
        render(<RefreshButton loading={false} onRefresh={vi.fn()}/>)
        expect(screen.getByRole('button')).toBeEnabled()
    })

    test('llama a onRefresh cuando se hace click', () => {
        const onRefresh = vi.fn()
        render(<RefreshButton onRefresh={onRefresh} loading={false} />)
        fireEvent.click(screen.getByRole('button'))
        expect(onRefresh).toHaveBeenCalledTimes(1)
      })

      test('No llama a onRefresh cuando esta desabilitado', () => {
        const onRefresh = vi.fn()
        render(<RefreshButton loading={true} onRefresh={onRefresh}/>)
        fireEvent.click(screen.getByRole('button'))
        expect(onRefresh).not.toHaveBeenCalled()
      })

})