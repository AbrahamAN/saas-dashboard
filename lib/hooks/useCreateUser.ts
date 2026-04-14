import { useState } from "react"
import { CreateUserInput } from "../types/users"


export const useCreateUser = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    const createUser = async (input: CreateUserInput) => {
        setLoading(true)
        setError(null)
        try{
            const res = await fetch('/api/users', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            })

            const data  = await res.json()

            if(!res.ok){
                setError(data.error)
                return null
            }
            return data
        }catch{
            setError('Error de conexion. Intenta de nuevo')
        }finally{
            setLoading(false)
        }
    }

    return {
        createUser,
        loading,
        error
    }
}