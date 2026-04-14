import {render,  screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { SearchBar } from '@/app/users/components/SearchBar'


describe('Searchbar' , () => {
    test('renderia el input ' , () => {
        render(<SearchBar onChange={vi.fn()} value=''  />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    test('muestra el placeholder por defecto', () =>{
        render(<SearchBar onChange={vi.fn()} value=''/>)
        expect(screen.getByPlaceholderText('Buscar usuarios...')).toBeInTheDocument()
    })

    test('muestra el plaholder personalizado' , () => {
        render(<SearchBar onChange={vi.fn()} placeholder='placeholder personalizado' value=''/>)
        expect(screen.getByPlaceholderText('placeholder personalizado')).toBeInTheDocument()
    })

    test('muestra el valor actual', () => {
        render(<SearchBar value={'alice'} onChange={vi.fn()}/>)
        expect(screen.getByDisplayValue('alice')).toBeInTheDocument()
    })

    test('llama el onChange cuando el usuario escribe' ,() => {
        const onChange = vi.fn()
        render(<SearchBar onChange={onChange} value=''/>)
        fireEvent.change(screen.getByRole('textbox'), {target:{value:'bob'}})
        expect(onChange).toHaveBeenCalledWith('bob')
    })

    test('mostrar boton para limpiar cuando hay valor' , () => {
        render(<SearchBar  onChange={vi.fn()} value='bob'/>)
        expect(screen.getByRole('button',{name:/Limpiar/i})).toBeInTheDocument()
    })

    test('NO muestra boton para limpiar cuando el valor esta vacio' , () => {
        render(<SearchBar value='' onChange={vi.fn()}/>)
        expect(screen.queryByRole('button' ,{name:/Limpiar/i})).not.toBeInTheDocument()
    })

    test('llama a onChange con string vacio al hacer clikc limpiar ' , () => {
        const onChange = vi.fn()
        render(<SearchBar value='Alice' onChange={onChange}/>)
        fireEvent.click(screen.getByRole('button' , {name:/Limpiar/i}))
        expect(onChange).toHaveBeenCalledWith('')
    })
})