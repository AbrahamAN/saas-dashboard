
export type ErrorType = 'network' | 'server' | 'timeout' | 'unknown'

export interface AppError {
    type: ErrorType,
    message: string,
    statusCode?:number
}


export function createError(err: unknown, statusCode?: number): AppError {

    //Error network 
    if (err instanceof TypeError && err.message.includes('fetch')) {
        return {
            type:'network',
            message:'Sin conexion. Verifica ty internet.',
        }
    }

    //Error timeout
    if (
        (err instanceof DOMException && err.name === 'AbortError') ||
        (err instanceof Error && err.message.toLowerCase().includes('timeout')) ||
        statusCode === 408 ||
        statusCode === 504
    ) {
        return {
            type:'timeout',
            message:'La solicitud excedio el tiempo de espera. Intenta de nuevo.',
            statusCode,
        }
    }

    //Error server

    if(statusCode){
        return {
            type:'server',
            message:`Error del servidor (${statusCode}). Intente de nuevo `
        }
    }

    //Generic Error
    if(err instanceof Error) {
        return {
            type:'unknown',
            message:err.message,
        }
    }

    if (
        (err instanceof DOMException && err.name === 'AbortError') ||
        (err instanceof Error && err.message.toLowerCase().includes('timeout')) ||
        statusCode === 408 ||
        statusCode === 504
    ) {
        return {
            type:'timeout',
            message:'La solicitud excedio el tiempo de espera. Intenta de nuevo.',
            statusCode,
        }
    }

    return {
        type:'unknown',
        message:'Ocurrio un error inesperado'
    }
}