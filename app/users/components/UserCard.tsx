'use client'

interface user {
    id: number;
    name: string;
    email: string;
}

interface UserCardProps {
    user: user;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
      data-testid="user-card"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {user.name}
        </h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium text-sm"
          aria-label={`Ver usuario ${user.name}`}
        >
          Ver
        </button>
        <button
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-medium text-sm"
          aria-label={`Eliminar usuario ${user.name}`}
        >
          Eliminar
        </button>
      </div>
    </div>
    )
}