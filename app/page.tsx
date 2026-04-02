import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Bienvenido al SaaS Dashboard</h1>
      <p className="text-xl text-gray-600 mb-8">
        Proyecto de aprendizaje: React + Next.js + TypeScript + Testing
      </p>
      <Link
        href="/users"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
      >
        Ver Usuarios →
      </Link>
    </div>
  )
}