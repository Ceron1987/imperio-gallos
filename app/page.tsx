import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trophy, Users, ClipboardCheck, Shirt } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
              <span className="text-xl font-bold text-white">IG</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Imperio Gallos</span>
          </div>
          <Link href="/dashboard">
            <Button>Ir al Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
            Sistema de Gestión
            <br />
            <span className="text-red-600">Academia Deportiva</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            Administra tu academia de fútbol de manera profesional.
            Control total de alumnos, asistencias, pagos y torneos.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Ver Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Funcionalidades Principales
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Gestión de Alumnos
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Control completo de inscripciones, categorías y expedientes
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <ClipboardCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Control de Asistencias
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Registro diario de asistencias por sede y categoría
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Torneos y Competencias
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Organiza torneos, inscripciones y seguimiento de resultados
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Shirt className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Tienda de Uniformes
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Catálogo de uniformes y control de pedidos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sedes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Nuestras Sedes
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Imperio Gallos Del Sol</h3>
                <p className="mt-2 text-sm text-gray-600">Av. Del Sol #123, Querétaro</p>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Imperio Gallos Del Tintero</h3>
                <p className="mt-2 text-sm text-gray-600">Calle Del Tintero #456, Querétaro</p>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Imperio Gallos TBD</h3>
                <p className="mt-2 text-sm text-gray-600">Próximamente</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2026 Imperio Gallos. Sistema de Gestión Deportiva.</p>
        </div>
      </footer>
    </div>
  )
}
