'use client'
import { AppError } from "@/lib/types/errors"

interface ErrorMessageProps { 
    error:AppError;
    onRetry?:() => void;
} 
const errorIcons: Record<string, string> = {
    network: '📡',
    server:  '🔥',
    timeout: '⏱️',
    unknown: '❌',
}

const errorTitles: Record<string, string> = {
    network: 'Sin conexión',
    server:  'Error del servidor',
    timeout: 'Tiempo de espera agotado',
    unknown: 'Algo salió mal',
}

export const ErrorMessage = ({error, onRetry}:ErrorMessageProps) => {

const icon = errorIcons[error.type] ?? '❌'
const title = errorTitles[error.type] ?? 'Error'


return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-16 text-center"
      data-testid="error-message"
    >
      <span className="text-5xl mb-4">{icon}</span>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-500 mb-6 max-w-sm">{error.message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Reintentar
        </button>
      )}

      {error.statusCode && (
        <p className="text-xs text-gray-400 mt-4">
          Código de error: {error.statusCode}
        </p>
      )}
    </div>
  )
}