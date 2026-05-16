// Imperio Gallos - Mock Data para DEMO
// Datos hardcodeados para funcionar sin base de datos

import type {
  Sede,
  Categoria,
  Usuario,
  Alumno,
  Asistencia,
  PagoMensualidad,
  Torneo,
  UniformeCatalogo,
} from '@/lib/types/database.types'

// =============================================
// SEDES
// =============================================
export const MOCK_SEDES: Sede[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    nombre: 'Imperio Gallos Del Sol',
    direccion: 'Av. Del Sol #123, Querétaro',
    telefono: '442-123-4567',
    email: 'delsol@imperiogallos.com',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    nombre: 'Imperio Gallos Del Tintero',
    direccion: 'Calle Del Tintero #456, Querétaro',
    telefono: '442-234-5678',
    email: 'deltintero@imperiogallos.com',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    nombre: 'Imperio Gallos TBD',
    direccion: 'Por definir',
    telefono: '442-345-6789',
    email: 'tbd@imperiogallos.com',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// CATEGORÍAS
// =============================================
export const MOCK_CATEGORIAS: Categoria[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    nombre: 'Pre-Kinder',
    edad_minima: 4,
    edad_maxima: 5,
    descripcion: 'Introducción al fútbol para niños pequeños',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    nombre: 'Infantil',
    edad_minima: 6,
    edad_maxima: 8,
    descripcion: 'Desarrollo de habilidades básicas',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    nombre: 'Junior',
    edad_minima: 9,
    edad_maxima: 11,
    descripcion: 'Técnica y táctica intermedia',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    nombre: 'Juvenil',
    edad_minima: 12,
    edad_maxima: 14,
    descripcion: 'Competencia y desarrollo avanzado',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c5555555-5555-5555-5555-555555555555',
    nombre: 'Varonil',
    edad_minima: 15,
    edad_maxima: 17,
    descripcion: 'Alto rendimiento y competencia seria',
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// USUARIOS
// =============================================
export const MOCK_USUARIOS: Usuario[] = [
  {
    id: 'user-directiva-1',
    email: 'director@imperiogallos.com',
    nombre_completo: 'Carlos Ramírez Director',
    telefono: '442-111-1111',
    rol: 'DIRECTIVA',
    sede_id: '11111111-1111-1111-1111-111111111111',
    avatar_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-admin-1',
    email: 'admin@imperiogallos.com',
    nombre_completo: 'María González Admin',
    telefono: '442-222-2222',
    rol: 'ADMINISTRACION',
    sede_id: '11111111-1111-1111-1111-111111111111',
    avatar_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-profesor-1',
    email: 'profesor1@imperiogallos.com',
    nombre_completo: 'Juan Pérez Entrenador',
    telefono: '442-333-3333',
    rol: 'PROFESOR',
    sede_id: '11111111-1111-1111-1111-111111111111',
    avatar_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-papa-1',
    email: 'papa1@example.com',
    nombre_completo: 'Roberto García Papa',
    telefono: '442-444-4444',
    rol: 'PAPA_ALUMNO',
    sede_id: '11111111-1111-1111-1111-111111111111',
    avatar_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// ALUMNOS
// =============================================
export const MOCK_ALUMNOS: Alumno[] = [
  {
    id: 'alumno-1',
    usuario_id: null,
    nombre_completo: 'Pedrito García López',
    fecha_nacimiento: '2018-03-15',
    categoria_id: 'c2222222-2222-2222-2222-222222222222',
    sede_id: '11111111-1111-1111-1111-111111111111',
    papa_id: 'user-papa-1',
    telefono_emergencia: '442-444-4444',
    direccion: 'Calle Principal #123',
    foto_url: null,
    numero_camiseta: 10,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'alumno-2',
    usuario_id: null,
    nombre_completo: 'Juanito Martínez Ruiz',
    fecha_nacimiento: '2017-08-22',
    categoria_id: 'c2222222-2222-2222-2222-222222222222',
    sede_id: '11111111-1111-1111-1111-111111111111',
    papa_id: 'user-papa-1',
    telefono_emergencia: '442-555-5555',
    direccion: 'Av. Secundaria #456',
    foto_url: null,
    numero_camiseta: 7,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'alumno-3',
    usuario_id: null,
    nombre_completo: 'Carlitos Hernández Díaz',
    fecha_nacimiento: '2016-12-05',
    categoria_id: 'c3333333-3333-3333-3333-333333333333',
    sede_id: '11111111-1111-1111-1111-111111111111',
    papa_id: null,
    telefono_emergencia: '442-666-6666',
    direccion: 'Blvd. Central #789',
    foto_url: null,
    numero_camiseta: 9,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'alumno-4',
    usuario_id: null,
    nombre_completo: 'Miguel Ángel Torres',
    fecha_nacimiento: '2015-06-18',
    categoria_id: 'c3333333-3333-3333-3333-333333333333',
    sede_id: '22222222-2222-2222-2222-222222222222',
    papa_id: null,
    telefono_emergencia: '442-777-7777',
    direccion: 'Calle Norte #321',
    foto_url: null,
    numero_camiseta: 11,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// ASISTENCIAS (últimos 7 días)
// =============================================
export const MOCK_ASISTENCIAS: Asistencia[] = [
  {
    id: 'asist-1',
    alumno_id: 'alumno-1',
    fecha: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'PRESENTE',
    profesor_id: 'user-profesor-1',
    sede_id: '11111111-1111-1111-1111-111111111111',
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asist-2',
    alumno_id: 'alumno-2',
    fecha: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'PRESENTE',
    profesor_id: 'user-profesor-1',
    sede_id: '11111111-1111-1111-1111-111111111111',
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asist-3',
    alumno_id: 'alumno-3',
    fecha: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'TARDE',
    profesor_id: 'user-profesor-1',
    sede_id: '11111111-1111-1111-1111-111111111111',
    notas: 'Llegó 15 min tarde',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asist-4',
    alumno_id: 'alumno-1',
    fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'PRESENTE',
    profesor_id: 'user-profesor-1',
    sede_id: '11111111-1111-1111-1111-111111111111',
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// PAGOS MENSUALIDADES
// =============================================
export const MOCK_PAGOS_MENSUALIDADES: PagoMensualidad[] = [
  {
    id: 'pago-1',
    alumno_id: 'alumno-1',
    mes: 5,
    anio: 2026,
    monto: 800.0,
    fecha_vencimiento: '2026-05-10',
    fecha_pago: '2026-05-08',
    status: 'PAGADO',
    metodo_pago: 'Transferencia',
    recibo_url: null,
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'pago-2',
    alumno_id: 'alumno-2',
    mes: 5,
    anio: 2026,
    monto: 800.0,
    fecha_vencimiento: '2026-05-10',
    fecha_pago: null,
    status: 'PENDIENTE',
    metodo_pago: null,
    recibo_url: null,
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'pago-3',
    alumno_id: 'alumno-3',
    mes: 5,
    anio: 2026,
    monto: 800.0,
    fecha_vencimiento: '2026-05-10',
    fecha_pago: '2026-05-09',
    status: 'PAGADO',
    metodo_pago: 'Efectivo',
    recibo_url: null,
    notas: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// TORNEOS
// =============================================
export const MOCK_TORNEOS: Torneo[] = [
  {
    id: 't1111111-1111-1111-1111-111111111111',
    nombre: 'Torneo Primavera 2026',
    descripcion: 'Torneo interno categorías menores',
    fecha_inicio: '2026-06-01',
    fecha_fin: '2026-06-30',
    sede_id: '11111111-1111-1111-1111-111111111111',
    categoria_id: 'c2222222-2222-2222-2222-222222222222',
    costo_inscripcion: 500.0,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 't2222222-2222-2222-2222-222222222222',
    nombre: 'Copa Imperio Gallos',
    descripcion: 'Copa anual todas las categorías',
    fecha_inicio: '2026-07-15',
    fecha_fin: '2026-08-15',
    sede_id: '22222222-2222-2222-2222-222222222222',
    categoria_id: null,
    costo_inscripcion: 800.0,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// UNIFORMES CATÁLOGO
// =============================================
export const MOCK_UNIFORMES: UniformeCatalogo[] = [
  {
    id: 'u1111111-1111-1111-1111-111111111111',
    nombre: 'Jersey Local Gallos',
    descripcion: 'Jersey oficial local rojo con escudo',
    tipo: 'jersey',
    talla: 'CH',
    precio: 350.0,
    stock: 50,
    imagen_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'u1111112-1111-1111-1111-111111111111',
    nombre: 'Jersey Local Gallos',
    descripcion: 'Jersey oficial local rojo con escudo',
    tipo: 'jersey',
    talla: 'M',
    precio: 350.0,
    stock: 50,
    imagen_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'u2222221-2222-2222-2222-222222222222',
    nombre: 'Short Oficial',
    descripcion: 'Short negro con logo',
    tipo: 'short',
    talla: 'CH',
    precio: 250.0,
    stock: 60,
    imagen_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'u3333331-3333-3333-3333-333333333333',
    nombre: 'Calcetas Gallos',
    descripcion: 'Calcetas rojas con franja negra',
    tipo: 'calcetas',
    talla: '18-20',
    precio: 80.0,
    stock: 100,
    imagen_url: null,
    activo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// =============================================
// STATS PARA DASHBOARD
// =============================================
export const MOCK_STATS = {
  totalAlumnos: MOCK_ALUMNOS.length,
  asistenciaHoy: MOCK_ASISTENCIAS.filter(
    (a) => a.fecha === new Date().toISOString().split('T')[0]
  ).length,
  pagosPendientes: MOCK_PAGOS_MENSUALIDADES.filter((p) => p.status === 'PENDIENTE').length,
  proximosTorneos: MOCK_TORNEOS.filter((t) => new Date(t.fecha_inicio) > new Date()).length,
}
