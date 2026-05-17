import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/', '/login', '/registro']

// Rutas protegidas que requieren autenticación
const PROTECTED_ROUTES = [
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
  '/mis-hijos',
  '/mi-perfil',
]

export async function middleware(request: NextRequest) {
  // Actualizar sesión de Supabase
  const response = await updateSession(request)

  const { pathname } = request.nextUrl

  // Permitir rutas públicas
  if (PUBLIC_ROUTES.includes(pathname)) {
    return response
  }

  // Verificar si es una ruta protegida
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  if (isProtectedRoute) {
    // TODO: En producción, verificar autenticación real
    // const supabase = createServerClient(...)
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

    // DEMO MODE: Permitir acceso a todas las rutas protegidas
    // (asumimos que el usuario está autenticado)
    return response
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
