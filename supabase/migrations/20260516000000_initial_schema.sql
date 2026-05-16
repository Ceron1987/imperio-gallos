-- Imperio Gallos - Schema Completo
-- Sistema de gestión para academia deportiva

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos ENUM
CREATE TYPE user_role AS ENUM (
  'DIRECTIVA',
  'ADMINISTRACION',
  'PROFESOR',
  'ALUMNO',
  'PAPA_ALUMNO',
  'PATROCINADOR'
);

CREATE TYPE payment_status AS ENUM (
  'PENDIENTE',
  'PAGADO',
  'VENCIDO',
  'CANCELADO'
);

CREATE TYPE attendance_status AS ENUM (
  'PRESENTE',
  'AUSENTE',
  'JUSTIFICADO',
  'TARDE'
);

CREATE TYPE pedido_status AS ENUM (
  'PENDIENTE',
  'EN_PROCESO',
  'ENTREGADO',
  'CANCELADO'
);

-- =============================================
-- TABLA: sedes
-- =============================================
CREATE TABLE sedes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL,
  direccion TEXT,
  telefono VARCHAR(20),
  email VARCHAR(100),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: categorias
-- =============================================
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(50) NOT NULL,
  edad_minima INTEGER,
  edad_maxima INTEGER,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: usuarios
-- =============================================
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  nombre_completo VARCHAR(200) NOT NULL,
  telefono VARCHAR(20),
  rol user_role NOT NULL,
  sede_id UUID REFERENCES sedes(id) ON DELETE SET NULL,
  avatar_url TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: alumnos
-- =============================================
CREATE TABLE alumnos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre_completo VARCHAR(200) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  sede_id UUID REFERENCES sedes(id) ON DELETE SET NULL,
  papa_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  telefono_emergencia VARCHAR(20),
  direccion TEXT,
  foto_url TEXT,
  numero_camiseta INTEGER,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: asistencias
-- =============================================
CREATE TABLE asistencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumno_id UUID REFERENCES alumnos(id) ON DELETE CASCADE NOT NULL,
  fecha DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'PRESENTE',
  profesor_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  sede_id UUID REFERENCES sedes(id) ON DELETE SET NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(alumno_id, fecha)
);

-- =============================================
-- TABLA: pagos_mensualidades
-- =============================================
CREATE TABLE pagos_mensualidades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumno_id UUID REFERENCES alumnos(id) ON DELETE CASCADE NOT NULL,
  mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
  anio INTEGER NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  fecha_pago DATE,
  status payment_status NOT NULL DEFAULT 'PENDIENTE',
  metodo_pago VARCHAR(50),
  recibo_url TEXT,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(alumno_id, mes, anio)
);

-- =============================================
-- TABLA: torneos
-- =============================================
CREATE TABLE torneos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  sede_id UUID REFERENCES sedes(id) ON DELETE SET NULL,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  costo_inscripcion DECIMAL(10, 2),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: pagos_torneos
-- =============================================
CREATE TABLE pagos_torneos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumno_id UUID REFERENCES alumnos(id) ON DELETE CASCADE NOT NULL,
  torneo_id UUID REFERENCES torneos(id) ON DELETE CASCADE NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_pago DATE,
  status payment_status NOT NULL DEFAULT 'PENDIENTE',
  metodo_pago VARCHAR(50),
  recibo_url TEXT,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(alumno_id, torneo_id)
);

-- =============================================
-- TABLA: records_deportivos
-- =============================================
CREATE TABLE records_deportivos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumno_id UUID REFERENCES alumnos(id) ON DELETE CASCADE NOT NULL,
  torneo_id UUID REFERENCES torneos(id) ON DELETE SET NULL,
  tipo_record VARCHAR(100) NOT NULL, -- goles, asistencias, tarjetas, etc
  valor DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: uniformes_catalogo
-- =============================================
CREATE TABLE uniformes_catalogo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  tipo VARCHAR(50) NOT NULL, -- jersey, short, calcetas, etc
  talla VARCHAR(20) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  imagen_url TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: pedidos_uniformes
-- =============================================
CREATE TABLE pedidos_uniformes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alumno_id UUID REFERENCES alumnos(id) ON DELETE CASCADE NOT NULL,
  status pedido_status NOT NULL DEFAULT 'PENDIENTE',
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  fecha_pedido DATE DEFAULT CURRENT_DATE,
  fecha_entrega DATE,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: uniformes_entregados
-- =============================================
CREATE TABLE uniformes_entregados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID REFERENCES pedidos_uniformes(id) ON DELETE CASCADE NOT NULL,
  uniforme_id UUID REFERENCES uniformes_catalogo(id) ON DELETE CASCADE NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABLA: notificaciones
-- =============================================
CREATE TABLE notificaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  mensaje TEXT NOT NULL,
  tipo VARCHAR(50), -- info, warning, success, error
  leido BOOLEAN DEFAULT false,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ÍNDICES para mejor performance
-- =============================================
CREATE INDEX idx_usuarios_sede ON usuarios(sede_id);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_alumnos_sede ON alumnos(sede_id);
CREATE INDEX idx_alumnos_categoria ON alumnos(categoria_id);
CREATE INDEX idx_alumnos_papa ON alumnos(papa_id);
CREATE INDEX idx_asistencias_alumno ON asistencias(alumno_id);
CREATE INDEX idx_asistencias_fecha ON asistencias(fecha);
CREATE INDEX idx_pagos_mensualidades_alumno ON pagos_mensualidades(alumno_id);
CREATE INDEX idx_pagos_mensualidades_status ON pagos_mensualidades(status);
CREATE INDEX idx_pagos_torneos_alumno ON pagos_torneos(alumno_id);
CREATE INDEX idx_pagos_torneos_torneo ON pagos_torneos(torneo_id);
CREATE INDEX idx_records_alumno ON records_deportivos(alumno_id);
CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notificaciones_leido ON notificaciones(leido);

-- =============================================
-- TRIGGERS para updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sedes_updated_at BEFORE UPDATE ON sedes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumnos_updated_at BEFORE UPDATE ON alumnos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_asistencias_updated_at BEFORE UPDATE ON asistencias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagos_mensualidades_updated_at BEFORE UPDATE ON pagos_mensualidades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_torneos_updated_at BEFORE UPDATE ON torneos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagos_torneos_updated_at BEFORE UPDATE ON pagos_torneos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_records_deportivos_updated_at BEFORE UPDATE ON records_deportivos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_uniformes_catalogo_updated_at BEFORE UPDATE ON uniformes_catalogo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_uniformes_updated_at BEFORE UPDATE ON pedidos_uniformes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
