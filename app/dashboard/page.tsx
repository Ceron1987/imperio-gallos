import { Users, ClipboardCheck, DollarSign, Trophy } from 'lucide-react'
import { MOCK_STATS } from '@/lib/data/mock-data'

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  description: string
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
          <Icon className="h-6 w-6 text-red-600" />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bienvenido a Imperio Gallos</h1>
        <p className="mt-2 text-gray-600">
          Resumen general de la academia deportiva
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Alumnos"
          value={MOCK_STATS.totalAlumnos}
          icon={Users}
          description="Alumnos activos"
        />
        <StatCard
          title="Asistencias Hoy"
          value={MOCK_STATS.asistenciaHoy}
          icon={ClipboardCheck}
          description="Registradas hoy"
        />
        <StatCard
          title="Pagos Pendientes"
          value={MOCK_STATS.pagosPendientes}
          icon={DollarSign}
          description="Por cobrar este mes"
        />
        <StatCard
          title="Próximos Torneos"
          value={MOCK_STATS.proximosTorneos}
          icon={Trophy}
          description="Próximos eventos"
        />
      </div>

      {/* Actividad Reciente */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <ClipboardCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Asistencias registradas</p>
              <p className="text-sm text-gray-500">Profesor Juan registró 15 asistencias hoy</p>
            </div>
            <span className="text-sm text-gray-400">Hace 2 horas</span>
          </div>

          <div className="flex items-center gap-4 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Pago recibido</p>
              <p className="text-sm text-gray-500">Mensualidad de Pedrito García - $800</p>
            </div>
            <span className="text-sm text-gray-400">Hace 3 horas</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nuevo torneo creado</p>
              <p className="text-sm text-gray-500">Torneo Primavera 2026 - Inscripciones abiertas</p>
            </div>
            <span className="text-sm text-gray-400">Hace 5 horas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
