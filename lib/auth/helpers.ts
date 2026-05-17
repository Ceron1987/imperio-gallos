// Imperio Gallos - Auth Helpers
// Funciones para manejo de autenticación y roles

import { createClient } from '@/lib/supabase/server'
import type { UserRole, Usuario } from '@/lib/types/database.types'
import { MOCK_USUARIOS } from '@/lib/data/mock-data'

/**
 * Obtiene el usuario actual (en DEMO mode usa mock data)
 */
export async function getCurrentUser(): Promise<Usuario | null> {
  // TODO: En producción, descomentar esto
  // const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) return null
  // const { data: usuario } = await supabase
  //   .from('usuarios')
  //   .select('*')
  //   .eq('id', user.id)
  //   .single()
  // return usuario

  // DEMO: Retornar usuario mock (por defecto DIRECTIVA)
  return MOCK_USUARIOS[0] // Carlos Ramírez Director
}

/**
 * Verifica si el usuario tiene uno de los roles permitidos
 */
export async function hasRole(allowedRoles: UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return allowedRoles.includes(user.rol)
}

/**
 * Verifica si el usuario es DIRECTIVA
 */
export async function isDirectiva(): Promise<boolean> {
  return hasRole(['DIRECTIVA'])
}

/**
 * Verifica si el usuario es DIRECTIVA o ADMINISTRACION
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole(['DIRECTIVA', 'ADMINISTRACION'])
}

/**
 * Verifica si el usuario es PROFESOR
 */
export async function isProfesor(): Promise<boolean> {
  return hasRole(['PROFESOR'])
}

/**
 * Verifica si el usuario es PAPA_ALUMNO
 */
export async function isPapa(): Promise<boolean> {
  return hasRole(['PAPA_ALUMNO'])
}

/**
 * Obtiene las rutas permitidas según el rol del usuario
 */
export function getAllowedRoutes(rol: UserRole): string[] {
  const routes: Record<UserRole, string[]> = {
    DIRECTIVA: [
      '/dashboard',
      '/sedes',
      '/categorias',
      '/usuarios',
      '/alumnos',
      '/profesores',
      '/asistencias',
      '/pagos',
      '/torneos',
      '/uniformes',
      '/reportes',
      '/configuracion',
    ],
    ADMINISTRACION: [
      '/dashboard',
      '/alumnos',
      '/asistencias',
      '/pagos',
      '/torneos',
      '/uniformes',
      '/reportes',
    ],
    PROFESOR: [
      '/dashboard',
      '/alumnos',
      '/asistencias',
      '/torneos',
    ],
    PAPA_ALUMNO: [
      '/dashboard',
      '/mis-hijos',
      '/pagos',
      '/uniformes',
    ],
    ALUMNO: [
      '/dashboard',
      '/mi-perfil',
      '/torneos',
    ],
    PATROCINADOR: [
      '/dashboard',
      '/torneos',
      '/alumnos',
    ],
  }

  return routes[rol] || ['/dashboard']
}

/**
 * Verifica si el usuario tiene acceso a una ruta específica
 */
export async function canAccessRoute(path: string): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  const allowedRoutes = getAllowedRoutes(user.rol)

  // Verificar si la ruta coincide exactamente o es una subruta
  return allowedRoutes.some(route =>
    path === route || path.startsWith(route + '/')
  )
}

/**
 * Obtiene el rol display name en español
 */
export function getRoleDisplayName(rol: UserRole): string {
  const names: Record<UserRole, string> = {
    DIRECTIVA: 'Directiva',
    ADMINISTRACION: 'Administración',
    PROFESOR: 'Profesor',
    PAPA_ALUMNO: 'Padre de Familia',
    ALUMNO: 'Alumno',
    PATROCINADOR: 'Patrocinador',
  }
  return names[rol]
}
