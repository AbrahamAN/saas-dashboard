'use client'

import {Component  , ReactNode} from 'react'


interface ErrorBoundaryProps {
    children: ReactNode
    fallback?:ReactNode
}


interface ErrorBoundaryState {
    hasError:boolean
    error: Error |null
}


export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props:ErrorBoundaryProps) {
        super(props)
        this.state = {hasError:false , error:null}
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Cuando ocurre un error de render, actualiza el estado
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        // Acá podrías enviar el error a un servicio como Sentry
        console.error('ErrorBoundary capturó:', error, info)
    }

    render() {
        if (this.state.hasError) {
          return this.props.fallback ?? (
            <div
              role="alert"
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <span className="text-5xl mb-4">💥</span>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Error inesperado
              </h2>
              <p className="text-gray-500 max-w-sm">
                {this.state.error?.message ?? 'Algo salió mal. Recargá la página.'}
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Reintentar
              </button>
            </div>
          )
        }
        return this.props.children
    }
}