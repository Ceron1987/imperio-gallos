-- Imperio Gallos - Row Level Security (RLS) Policies
-- Control de acceso por roles

-- =============================================
-- Habilitar RLS en todas las tablas
-- =============================================
ALTER TABLE sedes ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos_mensualidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos_torneos ENABLE ROW LEVEL SECURITY;
ALTER TABLE torneos ENABLE ROW LEVEL SECURITY;
ALTER TABLE records_deportivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE uniformes_catalogo ENABLE ROW LEVEL SECURITY;
ALTER TABLE uniformes_entregados ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_uniformes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;

-- =============================================
-- FUNCIÓN HELPER: Obtener rol del usuario actual
-- =============================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT rol FROM usuarios WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- =============================================
-- FUNCIÓN HELPER: Verificar si es DIRECTIVA
-- =============================================
CREATE OR REPLACE FUNCTION is_directiva()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM usuarios
    WHERE id = auth.uid() AND rol = 'DIRECTIVA'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =============================================
-- FUNCIÓN HELPER: Verificar si es ADMINISTRACION
-- =============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM usuarios
    WHERE id = auth.uid() AND rol IN ('DIRECTIVA', 'ADMINISTRACION')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =============================================
-- POLÍTICAS: sedes
-- =============================================
-- Todo el mundo puede ver sedes activas
CREATE POLICY "Sedes visibles para todos"
  ON sedes FOR SELECT
  USING (activo = true);

-- Solo DIRECTIVA puede modificar sedes
CREATE POLICY "Solo DIRECTIVA modifica sedes"
  ON sedes FOR ALL
  USING (is_directiva());

-- =============================================
-- POLÍTICAS: categorias
-- =============================================
-- Todo el mundo puede ver categorías activas
CREATE POLICY "Categorías visibles para todos"
  ON categorias FOR SELECT
  USING (activo = true);

-- Solo DIRECTIVA puede modificar categorías
CREATE POLICY "Solo DIRECTIVA modifica categorías"
  ON categorias FOR ALL
  USING (is_directiva());

-- =============================================
-- POLÍTICAS: usuarios
-- =============================================
-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Usuario ve su perfil"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

-- DIRECTIVA y ADMINISTRACION pueden ver todos los usuarios
CREATE POLICY "Admin ve todos los usuarios"
  ON usuarios FOR SELECT
  USING (is_admin());

-- Usuario puede actualizar su propio perfil (excepto rol)
CREATE POLICY "Usuario actualiza su perfil"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

-- Solo DIRECTIVA puede crear/eliminar usuarios
CREATE POLICY "Solo DIRECTIVA gestiona usuarios"
  ON usuarios FOR ALL
  USING (is_directiva());

-- =============================================
-- POLÍTICAS: alumnos
-- =============================================
-- DIRECTIVA y ADMIN ven todos los alumnos
CREATE POLICY "Admin ve todos los alumnos"
  ON alumnos FOR SELECT
  USING (is_admin());

-- PROFESORES ven alumnos de su sede
CREATE POLICY "Profesor ve alumnos de su sede"
  ON alumnos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE usuarios.id = auth.uid()
        AND usuarios.rol = 'PROFESOR'
        AND usuarios.sede_id = alumnos.sede_id
    )
  );

-- PAPAS ven solo sus hijos
CREATE POLICY "Papa ve sus hijos"
  ON alumnos FOR SELECT
  USING (papa_id = auth.uid());

-- ALUMNOS ven solo su propio perfil
CREATE POLICY "Alumno ve su perfil"
  ON alumnos FOR SELECT
  USING (usuario_id = auth.uid());

-- Solo ADMIN puede modificar alumnos
CREATE POLICY "Solo admin modifica alumnos"
  ON alumnos FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: asistencias
-- =============================================
-- ADMIN ve todas las asistencias
CREATE POLICY "Admin ve todas asistencias"
  ON asistencias FOR SELECT
  USING (is_admin());

-- PROFESOR ve asistencias de su sede
CREATE POLICY "Profesor ve asistencias de su sede"
  ON asistencias FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE usuarios.id = auth.uid()
        AND usuarios.rol = 'PROFESOR'
        AND usuarios.sede_id = asistencias.sede_id
    )
  );

-- PROFESOR puede registrar asistencias
CREATE POLICY "Profesor registra asistencias"
  ON asistencias FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE usuarios.id = auth.uid()
        AND usuarios.rol IN ('PROFESOR', 'ADMINISTRACION', 'DIRECTIVA')
    )
  );

-- PAPAS ven asistencias de sus hijos
CREATE POLICY "Papa ve asistencias de sus hijos"
  ON asistencias FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = asistencias.alumno_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- =============================================
-- POLÍTICAS: pagos_mensualidades
-- =============================================
-- ADMIN ve todos los pagos
CREATE POLICY "Admin ve todos los pagos mensualidades"
  ON pagos_mensualidades FOR SELECT
  USING (is_admin());

-- PAPAS ven pagos de sus hijos
CREATE POLICY "Papa ve pagos de sus hijos"
  ON pagos_mensualidades FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = pagos_mensualidades.alumno_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- Solo ADMIN puede modificar pagos
CREATE POLICY "Solo admin modifica pagos mensualidades"
  ON pagos_mensualidades FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: pagos_torneos
-- =============================================
-- ADMIN ve todos los pagos de torneos
CREATE POLICY "Admin ve todos los pagos torneos"
  ON pagos_torneos FOR SELECT
  USING (is_admin());

-- PAPAS ven pagos de torneos de sus hijos
CREATE POLICY "Papa ve pagos torneos de sus hijos"
  ON pagos_torneos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = pagos_torneos.alumno_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- Solo ADMIN puede modificar pagos de torneos
CREATE POLICY "Solo admin modifica pagos torneos"
  ON pagos_torneos FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: torneos
-- =============================================
-- Todos pueden ver torneos activos
CREATE POLICY "Todos ven torneos activos"
  ON torneos FOR SELECT
  USING (activo = true);

-- Solo ADMIN puede modificar torneos
CREATE POLICY "Solo admin modifica torneos"
  ON torneos FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: records_deportivos
-- =============================================
-- ADMIN ve todos los records
CREATE POLICY "Admin ve todos los records"
  ON records_deportivos FOR SELECT
  USING (is_admin());

-- PROFESORES ven records de alumnos de su sede
CREATE POLICY "Profesor ve records de su sede"
  ON records_deportivos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      JOIN usuarios ON usuarios.id = auth.uid()
      WHERE alumnos.id = records_deportivos.alumno_id
        AND usuarios.rol = 'PROFESOR'
        AND usuarios.sede_id = alumnos.sede_id
    )
  );

-- PAPAS y ALUMNOS ven sus propios records
CREATE POLICY "Papa y alumno ven sus records"
  ON records_deportivos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = records_deportivos.alumno_id
        AND (alumnos.papa_id = auth.uid() OR alumnos.usuario_id = auth.uid())
    )
  );

-- Solo ADMIN y PROFESOR pueden crear records
CREATE POLICY "Admin y profesor crean records"
  ON records_deportivos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE usuarios.id = auth.uid()
        AND usuarios.rol IN ('DIRECTIVA', 'ADMINISTRACION', 'PROFESOR')
    )
  );

-- =============================================
-- POLÍTICAS: uniformes_catalogo
-- =============================================
-- Todos pueden ver uniformes activos
CREATE POLICY "Todos ven uniformes activos"
  ON uniformes_catalogo FOR SELECT
  USING (activo = true);

-- Solo ADMIN puede modificar catálogo
CREATE POLICY "Solo admin modifica uniformes"
  ON uniformes_catalogo FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: pedidos_uniformes
-- =============================================
-- ADMIN ve todos los pedidos
CREATE POLICY "Admin ve todos los pedidos"
  ON pedidos_uniformes FOR SELECT
  USING (is_admin());

-- PAPAS ven pedidos de sus hijos
CREATE POLICY "Papa ve pedidos de sus hijos"
  ON pedidos_uniformes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = pedidos_uniformes.alumno_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- PAPAS pueden crear pedidos para sus hijos
CREATE POLICY "Papa crea pedidos para sus hijos"
  ON pedidos_uniformes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM alumnos
      WHERE alumnos.id = alumno_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- Solo ADMIN puede actualizar status de pedidos
CREATE POLICY "Solo admin actualiza pedidos"
  ON pedidos_uniformes FOR UPDATE
  USING (is_admin());

-- =============================================
-- POLÍTICAS: uniformes_entregados
-- =============================================
-- ADMIN ve todos los items entregados
CREATE POLICY "Admin ve items entregados"
  ON uniformes_entregados FOR SELECT
  USING (is_admin());

-- PAPAS ven items de pedidos de sus hijos
CREATE POLICY "Papa ve items de sus pedidos"
  ON uniformes_entregados FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pedidos_uniformes
      JOIN alumnos ON alumnos.id = pedidos_uniformes.alumno_id
      WHERE pedidos_uniformes.id = uniformes_entregados.pedido_id
        AND alumnos.papa_id = auth.uid()
    )
  );

-- Solo ADMIN puede gestionar items
CREATE POLICY "Solo admin gestiona items entregados"
  ON uniformes_entregados FOR ALL
  USING (is_admin());

-- =============================================
-- POLÍTICAS: notificaciones
-- =============================================
-- Usuario solo ve sus propias notificaciones
CREATE POLICY "Usuario ve sus notificaciones"
  ON notificaciones FOR SELECT
  USING (usuario_id = auth.uid());

-- Usuario puede marcar como leídas sus notificaciones
CREATE POLICY "Usuario marca sus notificaciones leídas"
  ON notificaciones FOR UPDATE
  USING (usuario_id = auth.uid());

-- Solo ADMIN puede crear notificaciones
CREATE POLICY "Solo admin crea notificaciones"
  ON notificaciones FOR INSERT
  WITH CHECK (is_admin());
