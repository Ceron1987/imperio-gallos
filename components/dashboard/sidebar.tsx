'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Building2,
  FolderTree,
  UserCog,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  Trophy,
  Shirt,
  BarChart3,
  Settings,
  User,
  Baby,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types/database.types'

interface MenuItem {
  title: string
  href: string
  icon: React.ElementType
  roles: UserRole[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PROFESOR', 'PAPA_ALUMNO', 'ALUMNO', 'PATROCINADOR'],
  },
  {
    title: 'Sedes',
    href: '/sedes',
    icon: Building2,
    roles: ['DIRECTIVA'],
  },
  {
    title: 'Categorías',
    href: '/categorias',
    icon: FolderTree,
    roles: ['DIRECTIVA'],
  },
  {
    title: 'Usuarios',
    href: '/usuarios',
    icon: UserCog,
    roles: ['DIRECTIVA'],
  },
  {
    title: 'Alumnos',
    href: '/alumnos',
    icon: GraduationCap,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PROFESOR', 'PATROCINADOR'],
  },
  {
    title: 'Mis Hijos',
    href: '/mis-hijos',
    icon: Baby,
    roles: ['PAPA_ALUMNO'],
  },
  {
    title: 'Mi Perfil',
    href: '/mi-perfil',
    icon: User,
    roles: ['ALUMNO'],
  },
  {
    title: 'Asistencias',
    href: '/asistencias',
    icon: ClipboardCheck,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PROFESOR'],
  },
  {
    title: 'Pagos',
    href: '/pagos',
    icon: DollarSign,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PAPA_ALUMNO'],
  },
  {
    title: 'Torneos',
    href: '/torneos',
    icon: Trophy,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PROFESOR', 'ALUMNO', 'PATROCINADOR'],
  },
  {
    title: 'Uniformes',
    href: '/uniformes',
    icon: Shirt,
    roles: ['DIRECTIVA', 'ADMINISTRACION', 'PAPA_ALUMNO'],
  },
  {
    title: 'Reportes',
    href: '/reportes',
    icon: BarChart3,
    roles: ['DIRECTIVA', 'ADMINISTRACION'],
  },
  {
    title: 'Configuración',
    href: '/configuracion',
    icon: Settings,
    roles: ['DIRECTIVA'],
  },
]

interface SidebarProps {
  userRole: UserRole
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()

  // Filtrar items del menú según el rol del usuario
  const filteredItems = menuItems.filter(item => item.roles.includes(userRole))

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <span className="text-lg font-bold text-white">IG</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Imperio Gallos</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-gray-500">
          Academia Deportiva
        </div>
      </div>
    </div>
  )
}
