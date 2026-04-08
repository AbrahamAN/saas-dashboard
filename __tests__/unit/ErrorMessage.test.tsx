    import { render, screen, fireEvent } from '@testing-library/react'
    import { describe, test, expect, vi } from 'vitest'
    import { AppError } from '@/lib/types/errors'
    import { ErrorMessage } from '@/app/users/components/ErrorMessage'


    describe('ErrorMessage' , () => {


        test('muestra el mensaje de error ', () => {
            const error: AppError = {
                type:'network',
                message:'Sin conexion. verifica tu internet.'
            }
            render(<ErrorMessage error={error} />)
            expect(screen.getByText('Sin conexion. verifica tu internet.')).toBeInTheDocument()
        })

        test('muestra el título correcto para error de red', () => {
            const error:AppError = {
                type:'network',
                message:'Sin conexion.'
            }
            render(<ErrorMessage error={error} />);
            expect(screen.getByText('Sin conexión')).toBeInTheDocument()
        })

        test('muestra el título correcto para error de servidor', () => {
            const error: AppError = {
                type: 'server',
                message: 'Error del servidor'
            }
            render(<ErrorMessage error={error} />)
            expect(screen.getByRole('heading', { name: 'Error del servidor' })).toBeInTheDocument()
        })

    

        test('muestra el codigo de error cuando existe' , () => {
            const error:AppError = {
                type:'server',
                message:'Error.',
                statusCode:500
            }
            render(<ErrorMessage error={error}/>)
            expect(screen.getByText(/500/)).toBeInTheDocument()
        })

        test('muestra el botón de retry cuando se pasa onRetry' , () => {
            const error: AppError = {
                type:'network',
                message:'Sin conexión.'
            }
            const onRetry = vi.fn()
            render(<ErrorMessage error={error} onRetry={onRetry}/>)
            expect(screen.getByRole('button',{name:/Reintentar/i})).toBeInTheDocument()
        })

        
        

        test('NO muestra botón de retry si no se pasa onRetry' , () => {
            const error: AppError = { type: 'network', message:'Sin conexión'}
            render(<ErrorMessage error={error} />)
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })
       

        test('llama a onRetry cuando se hace click en el boton', () => {
            const error:AppError = {type:'network' , message:'Error.'}
            const onRetry = vi.fn()
            render(<ErrorMessage error={error} onRetry={onRetry}/>)
            fireEvent.click(screen.getByRole('button',{name:/Reintentar/i}))
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })

        test('tiene role="alert" para accesibilidad', () => {
            const error: AppError = { type: 'unknown', message: 'Error.' }
            render(<ErrorMessage error={error} />)
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })
        

        
    })

        


