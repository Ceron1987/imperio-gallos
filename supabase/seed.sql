-- Imperio Gallos - Seed Data
-- Datos iniciales para DEMO

-- =============================================
-- SEDES
-- =============================================
INSERT INTO sedes (id, nombre, direccion, telefono, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Imperio Gallos Del Sol', 'Av. Del Sol #123, Querétaro', '442-123-4567', 'delsol@imperiogallos.com'),
  ('22222222-2222-2222-2222-222222222222', 'Imperio Gallos Del Tintero', 'Calle Del Tintero #456, Querétaro', '442-234-5678', 'deltintero@imperiogallos.com'),
  ('33333333-3333-3333-3333-333333333333', 'Imperio Gallos TBD', 'Por definir', '442-345-6789', 'tbd@imperiogallos.com');

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO categorias (id, nombre, edad_minima, edad_maxima, descripcion) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Pre-Kinder', 4, 5, 'Introducción al fútbol para niños pequeños'),
  ('c2222222-2222-2222-2222-222222222222', 'Infantil', 6, 8, 'Desarrollo de habilidades básicas'),
  ('c3333333-3333-3333-3333-333333333333', 'Junior', 9, 11, 'Técnica y táctica intermedia'),
  ('c4444444-4444-4444-4444-444444444444', 'Juvenil', 12, 14, 'Competencia y desarrollo avanzado'),
  ('c5555555-5555-5555-5555-555555555555', 'Varonil', 15, 17, 'Alto rendimiento y competencia seria');

-- =============================================
-- UNIFORMES CATÁLOGO
-- =============================================
INSERT INTO uniformes_catalogo (id, nombre, descripcion, tipo, talla, precio, stock, activo) VALUES
  -- Jerseys
  ('u1111111-1111-1111-1111-111111111111', 'Jersey Local Gallos', 'Jersey oficial local rojo con escudo', 'jersey', 'CH', 350.00, 50, true),
  ('u1111112-1111-1111-1111-111111111111', 'Jersey Local Gallos', 'Jersey oficial local rojo con escudo', 'jersey', 'M', 350.00, 50, true),
  ('u1111113-1111-1111-1111-111111111111', 'Jersey Local Gallos', 'Jersey oficial local rojo con escudo', 'jersey', 'G', 350.00, 50, true),
  ('u1111114-1111-1111-1111-111111111111', 'Jersey Local Gallos', 'Jersey oficial local rojo con escudo', 'jersey', 'XG', 350.00, 30, true),

  -- Shorts
  ('u2222221-2222-2222-2222-222222222222', 'Short Oficial', 'Short negro con logo', 'short', 'CH', 250.00, 60, true),
  ('u2222222-2222-2222-2222-222222222222', 'Short Oficial', 'Short negro con logo', 'short', 'M', 250.00, 60, true),
  ('u2222223-2222-2222-2222-222222222222', 'Short Oficial', 'Short negro con logo', 'short', 'G', 250.00, 60, true),

  -- Calcetas
  ('u3333331-3333-3333-3333-333333333333', 'Calcetas Gallos', 'Calcetas rojas con franja negra', 'calcetas', '18-20', 80.00, 100, true),
  ('u3333332-3333-3333-3333-333333333333', 'Calcetas Gallos', 'Calcetas rojas con franja negra', 'calcetas', '21-23', 80.00, 100, true),
  ('u3333333-3333-3333-3333-333333333333', 'Calcetas Gallos', 'Calcetas rojas con franja negra', 'calcetas', '24-26', 80.00, 100, true);

-- =============================================
-- TORNEOS EJEMPLO
-- =============================================
INSERT INTO torneos (id, nombre, descripcion, fecha_inicio, fecha_fin, sede_id, categoria_id, costo_inscripcion) VALUES
  ('t1111111-1111-1111-1111-111111111111', 'Torneo Primavera 2026', 'Torneo interno categorías menores', '2026-06-01', '2026-06-30', '11111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 500.00),
  ('t2222222-2222-2222-2222-222222222222', 'Copa Imperio Gallos', 'Copa anual todas las categorías', '2026-07-15', '2026-08-15', '22222222-2222-2222-2222-222222222222', NULL, 800.00);

-- =============================================
-- NOTA: Los usuarios y alumnos se crearán via app
-- porque requieren auth de Supabase
-- =============================================
