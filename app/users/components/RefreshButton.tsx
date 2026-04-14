'use client'

interface RefreshButtonProps  {
    onRefresh: () => void
    loading:boolean
}

export const RefreshButton = ({onRefresh, loading}: RefreshButtonProps) => {
    return (
        <button
        onClick={onRefresh}
        disabled={loading}
        aria-label="Actualizar lista de usuarios"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
      >
        <span
          className={loading ? 'animate-spin inline-block' : 'inline-block'}
          aria-hidden="true"
        >
          ↻
        </span>
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
    )
}