// Imperio Gallos - Database Types
// Auto-generated types from Supabase schema

export type UserRole =
  | 'DIRECTIVA'
  | 'ADMINISTRACION'
  | 'PROFESOR'
  | 'ALUMNO'
  | 'PAPA_ALUMNO'
  | 'PATROCINADOR'

export type PaymentStatus =
  | 'PENDIENTE'
  | 'PAGADO'
  | 'VENCIDO'
  | 'CANCELADO'

export type AttendanceStatus =
  | 'PRESENTE'
  | 'AUSENTE'
  | 'JUSTIFICADO'
  | 'TARDE'

export type PedidoStatus =
  | 'PENDIENTE'
  | 'EN_PROCESO'
  | 'ENTREGADO'
  | 'CANCELADO'

export interface Sede {
  id: string
  nombre: string
  direccion: string | null
  telefono: string | null
  email: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Categoria {
  id: string
  nombre: string
  edad_minima: number | null
  edad_maxima: number | null
  descripcion: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Usuario {
  id: string
  email: string
  nombre_completo: string
  telefono: string | null
  rol: UserRole
  sede_id: string | null
  avatar_url: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Alumno {
  id: string
  usuario_id: string | null
  nombre_completo: string
  fecha_nacimiento: string
  categoria_id: string | null
  sede_id: string | null
  papa_id: string | null
  telefono_emergencia: string | null
  direccion: string | null
  foto_url: string | null
  numero_camiseta: number | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Asistencia {
  id: string
  alumno_id: string
  fecha: string
  status: AttendanceStatus
  profesor_id: string | null
  sede_id: string | null
  notas: string | null
  created_at: string
  updated_at: string
}

export interface PagoMensualidad {
  id: string
  alumno_id: string
  mes: number
  anio: number
  monto: number
  fecha_vencimiento: string
  fecha_pago: string | null
  status: PaymentStatus
  metodo_pago: string | null
  recibo_url: string | null
  notas: string | null
  created_at: string
  updated_at: string
}

export interface Torneo {
  id: string
  nombre: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string | null
  sede_id: string | null
  categoria_id: string | null
  costo_inscripcion: number | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface PagoTorneo {
  id: string
  alumno_id: string
  torneo_id: string
  monto: number
  fecha_pago: string | null
  status: PaymentStatus
  metodo_pago: string | null
  recibo_url: string | null
  notas: string | null
  created_at: string
  updated_at: string
}

export interface RecordDeportivo {
  id: string
  alumno_id: string
  torneo_id: string | null
  tipo_record: string
  valor: number
  fecha: string
  notas: string | null
  created_at: string
  updated_at: string
}

export interface UniformeCatalogo {
  id: string
  nombre: string
  descripcion: string | null
  tipo: string
  talla: string
  precio: number
  stock: number
  imagen_url: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface PedidoUniforme {
  id: string
  alumno_id: string
  status: PedidoStatus
  total: number
  fecha_pedido: string
  fecha_entrega: string | null
  notas: string | null
  created_at: string
  updated_at: string
}

export interface UniformeEntregado {
  id: string
  pedido_id: string
  uniforme_id: string
  cantidad: number
  precio_unitario: number
  subtotal: number
  created_at: string
}

export interface Notificacion {
  id: string
  usuario_id: string
  titulo: string
  mensaje: string
  tipo: string | null
  leido: boolean
  url: string | null
  created_at: string
}

// Types con relaciones (para joins)
export interface AlumnoConRelaciones extends Alumno {
  sede?: Sede
  categoria?: Categoria
  papa?: Usuario
}

export interface AsistenciaConRelaciones extends Asistencia {
  alumno?: Alumno
  profesor?: Usuario
  sede?: Sede
}

export interface PagoMensualidadConRelaciones extends PagoMensualidad {
  alumno?: Alumno
}

export interface PagoTorneoConRelaciones extends PagoTorneo {
  alumno?: Alumno
  torneo?: Torneo
}

export interface RecordDeportivoConRelaciones extends RecordDeportivo {
  alumno?: Alumno
  torneo?: Torneo
}

export interface PedidoUniformeConRelaciones extends PedidoUniforme {
  alumno?: Alumno
  items?: UniformeEntregado[]
}
