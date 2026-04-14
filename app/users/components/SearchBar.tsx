'use client'

interface SearchBarProps {
    value:string
    onChange: (value:string) => void
    placeholder?:string
}

export const SearchBar = ({value, onChange, placeholder}: SearchBarProps) => {
    return (
    <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? 'Buscar usuarios...'}
          aria-label="Buscar usuarios"
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        )}
    </div>
    )
}