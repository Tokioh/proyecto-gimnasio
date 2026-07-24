# Proceso por Checkpoint — Gimnasio Atlas

> Documento vivo: aquí registramos **qué hacemos**, **en qué orden** y **qué queda hecho** en cada checkpoint.
> Referencia de reglas: ver `REGLAS-EXAMEN.md`.

---

## Estado general

| Checkpoint | Estado | Fuente activa | Commit |
|---|---|---|---|
| **CP1** — La estructura existe | ⬜ Pendiente | `memoria` | — |
| **CP2** — Las reglas viven en la interfaz | ⬜ Pendiente | `json` | — |
| **CP3** — Cerrado y conmutable | ⬜ Pendiente | `api` | — |
| **C4** — Auditoría final | ⬜ Pendiente | — | `"Examen C4 - Auditoría"` |

**Leyenda:** ⬜ Pendiente · 🔄 En progreso · ✅ Completado

---

## Antes de CP1 — Setup inicial

> Hacer esto una sola vez antes de empezar el primer checkpoint.

| # | Tarea | Estado | Notas |
|---|---|---|---|
| 0.1 | Proyecto Vite + React + TypeScript creado | ✅ | `proyecto-gimnasio` |
| 0.2 | Corregir `.env` → `VITE_FUENTE_DATOS=memoria` | ⬜ | Actualmente tiene valor incorrecto |
| 0.3 | Copiar `base/datos/` → `src/datos/` | ⬜ | Incluye contrato, index, configuracion |
| 0.4 | Copiar `mock/semillas.json` → `public/semillas.json` | ⬜ | Para modo json (CP2) |
| 0.5 | Crear carpetas `src/dominio/`, `src/componentes/`, `src/pantallas/` | ⬜ | |
| 0.6 | Crear esqueletos `datos.memoria.ts`, `datos.json.ts`, `datos.api.ts` | ⬜ | Los 3 deben existir desde CP1 |
| 0.7 | Verificar que `npm run dev` arranca sin errores | ⬜ | |

---

## CP1 — La estructura existe (3.0 pts · ~60 min)

**Objetivo:** Arquitectura completa + dominio tipado + pantalla 01 funcional con fuente `memoria`.

**Al terminar:** pantalla de catálogo de clases visible, cabecera con fuente activa, commit CP1.

### Paso 1 — Dominio (`src/dominio/index.ts`)

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Crear interface `Clase` (`id`, `nombre`, `precioUnitario`, `disponibles`, `activo`) | ⬜ |
| 1.2 | Crear interface `Cliente` (`id`, `nombre`, `cedula`, `telefono`) | ⬜ |
| 1.3 | Crear type `NuevoCliente` (`nombre`, `cedula`, `telefono`) | ⬜ |
| 1.4 | Crear interface `Inscripcion` (`id`, `claseId`, `clienteId`, `cantidad`, `total`, `descuentoAplicado`, `estado`) | ⬜ |
| 1.5 | Crear type `NuevaInscripcion` (`claseId`, `clienteId`, `cantidad`) | ⬜ |

### Paso 2 — Capa de datos (esqueletos + memoria)

| # | Tarea | Estado |
|---|---|---|
| 2.1 | `datos.memoria.ts` — importar semillas en código (desde `semillas.json`) | ⬜ |
| 2.2 | Implementar `listarClases()` en memoria | ⬜ |
| 2.3 | Implementar `listarClientes()` en memoria (puede devolver datos aunque no se usen aún) | ⬜ |
| 2.4 | Implementar `listarInscripciones()` en memoria (puede devolver datos aunque no se usen aún) | ⬜ |
| 2.5 | Dejar `crearCliente`, `crearInscripcion`, `retirarInscripcion` con `pendiente()` | ⬜ |
| 2.6 | `datos.json.ts` — esqueleto que rechaza con `"no implementado"` | ⬜ |
| 2.7 | `datos.api.ts` — esqueleto que rechaza con `"no implementado"` | ⬜ |
| 2.8 | Verificar que `obtenerFuenteDatos()` compila y devuelve memoria | ⬜ |

### Paso 3 — Componentes reutilizables

| # | Tarea | Estado |
|---|---|---|
| 3.1 | `Cabecera` — título "Gimnasio Atlas", subtítulo, fuente activa (`FUENTE_ACTIVA`) | ⬜ |
| 3.2 | `Badge` — variantes Activo (verde) / Inactivo (gris) | ⬜ |
| 3.3 | `Tabla` — componente genérico para filas y columnas | ⬜ |

### Paso 4 — Pantalla 01 — Catálogo de clases

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Crear `src/pantallas/PantallaListado.tsx` | ⬜ |
| 4.2 | Consumir `obtenerFuenteDatos().listarClases()` (no acceder a datos directamente) | ⬜ |
| 4.3 | Tabla con columnas: Clase, Precio, Disponibles, Estado | ⬜ |
| 4.4 | Mostrar las 4 semillas (boxeo como Inactivo) | ⬜ |
| 4.5 | Formatear precio con `$` y 2 decimales | ⬜ |

### Paso 5 — Integración en App

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Limpiar plantilla por defecto de Vite en `App.tsx` | ⬜ |
| 5.2 | Montar `Cabecera` + `PantallaListado` | ⬜ |
| 5.3 | Estilos básicos similares a `01-listado.png` | ⬜ |

### Paso 6 — Documentación y entrega CP1

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Crear `DECISIONES.md` (máx. 10 líneas) | ⬜ |
| 6.2 | Probar con `VITE_FUENTE_DATOS=memoria` + `npm run dev` | ⬜ |
| 6.3 | Commit descriptivo (ej: `"CP1: estructura, dominio y pantalla listado en memoria"`) | ⬜ |

### Criterios de aceptación CP1

- [ ] Carpetas `dominio`, `datos`, `componentes`, `pantallas` existen
- [ ] Archivos bloqueados intactos (no modificados en `base/`, `mock/`, `pantallas/`)
- [ ] Dominio con los 5 tipos exportados
- [ ] Pantalla 01 muestra 4 clases con badges
- [ ] Cabecera muestra fuente `memoria`
- [ ] `DECISIONES.md` creado
- [ ] App arranca sin errores

---

## CP2 — Las reglas viven en la interfaz (5.0 pts · ~140 min)

**Objetivo:** Pantalla 02 con validación en vivo + reglas R1, R2, R3 + fuente `json` funcional.

**Al terminar:** formulario de inscripción con total en vivo, cambio a modo json probado, commit CP2.

### Paso 1 — Lógica de negocio compartida

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Crear función `calcularTotal(cantidad, precioUnitario)` en dominio o utilidad | ⬜ |
| 1.2 | Regla: descuento 10% desde 5 unidades | ⬜ |
| 1.3 | Crear validaciones reutilizables (cantidad vs disponibles, clase activa) | ⬜ |

### Paso 2 — Completar `datos.memoria.ts`

| # | Tarea | Estado |
|---|---|---|
| 2.1 | Implementar `crearInscripcion()` con reglas R1, R2, R3, R5 | ⬜ |
| 2.2 | Al crear: descontar `disponibles` de la clase | ⬜ |
| 2.3 | Rechazar con `Error` descriptivo si falla una regla | ⬜ |

### Paso 3 — Implementar `datos.json.ts`

| # | Tarea | Estado |
|---|---|---|
| 3.1 | `fetch('/semillas.json')` al iniciar | ⬜ |
| 3.2 | Operar en memoria con los datos cargados | ⬜ |
| 3.3 | Implementar los 6 métodos (misma lógica que memoria) | ⬜ |

### Paso 4 — Componentes adicionales

| # | Tarea | Estado |
|---|---|---|
| 4.1 | `Badge` — variantes PENDIENTE / ASISTIDA / RETIRADA (para CP3, opcional aquí) | ⬜ |
| 4.2 | `Badge` — variante descuento `-10%` | ⬜ |
| 4.3 | Inputs reutilizables (select, número) si conviene | ⬜ |

### Paso 5 — Pantalla 02 — Nueva inscripción

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Crear `src/pantallas/PantallaCrear.tsx` | ⬜ |
| 5.2 | Select de clase — **solo clases activas** | ⬜ |
| 5.3 | Select de cliente — formato `Nombre (cédula)` | ⬜ |
| 5.4 | Campo cantidad (mínimo 1) | ⬜ |
| 5.5 | Texto dinámico "Quedan X disponibles" al elegir clase | ⬜ |
| 5.6 | Total calculado **en vivo** al cambiar clase o cantidad | ⬜ |
| 5.7 | Nota "Desde 5 unidades: 10% de descuento" | ⬜ |
| 5.8 | Bloquear registro si: sin cliente, cantidad > disponibles | ⬜ |
| 5.9 | Botón "Registrar inscripción" llama a `crearInscripcion()` | ⬜ |
| 5.10 | Tras registrar: actualizar UI (disponibles descontados) | ⬜ |

### Paso 6 — Navegación entre pantallas

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Enlazar pantalla 01 y 02 (tabs, links o router simple) | ⬜ |
| 6.2 | Mantener cabecera con fuente activa en todas las vistas | ⬜ |

### Paso 7 — Prueba modo json y entrega CP2

| # | Tarea | Estado |
|---|---|---|
| 7.1 | Cambiar `.env` → `VITE_FUENTE_DATOS=json` | ⬜ |
| 7.2 | Reiniciar `npm run dev` y verificar que carga desde `/semillas.json` | ⬜ |
| 7.3 | Probar creación de inscripción en modo json | ⬜ |
| 7.4 | Commit descriptivo (ej: `"CP2: pantalla crear, reglas en vivo y fuente json"`) | ⬜ |

### Criterios de aceptación CP2

- [ ] Selector solo muestra clases activas
- [ ] No registra sin cliente seleccionado
- [ ] Muestra "Quedan X disponibles"
- [ ] Bloquea si cantidad > disponibles
- [ ] Total en vivo: 3 × $8.50 = $25.50
- [ ] Descuento: 5 × $8.50 = $38.25 (con -10%)
- [ ] Al registrar, disponibilidad se descuenta
- [ ] Modo `json` funciona tras cambiar `.env` y reiniciar
- [ ] Cabecera muestra fuente `json`

---

## CP3 — Cerrado y conmutable (2.0 pts · ~175 min)

**Objetivo:** Pantalla 03 con retiro y reposición + nuevo cliente + fuente `api` contra el mock.

**Al terminar:** las 3 pantallas completas, mock funcionando, `npm run build` OK, commit CP3.

### Paso 1 — Completar capa de datos (memoria y json)

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Implementar `crearCliente()` en `datos.memoria.ts` | ⬜ |
| 1.2 | Implementar `retirarInscripcion()` con reglas R4, R5 en memoria | ⬜ |
| 1.3 | Replicar `crearCliente` y `retirarInscripcion` en `datos.json.ts` | ⬜ |

### Paso 2 — Implementar `datos.api.ts`

| # | Tarea | Estado |
|---|---|---|
| 2.1 | `GET /clases` → `listarClases()` | ⬜ |
| 2.2 | `GET /clientes` → `listarClientes()` | ⬜ |
| 2.3 | `POST /clientes` → `crearCliente()` | ⬜ |
| 2.4 | `GET /inscripciones` → `listarInscripciones()` | ⬜ |
| 2.5 | `POST /inscripciones` → `crearInscripcion()` | ⬜ |
| 2.6 | `PATCH /inscripciones/:id` → `retirarInscripcion()` | ⬜ |
| 2.7 | Manejar errores HTTP (422, 409, 404) y propagar mensaje | ⬜ |

### Paso 3 — Pantalla 03 — Inscripciones

| # | Tarea | Estado |
|---|---|---|
| 3.1 | Crear `src/pantallas/PantallaDetalle.tsx` | ⬜ |
| 3.2 | Tabla: Cliente, Clase, Cant., Total, Estado, Acción | ⬜ |
| 3.3 | Resolver nombres de cliente y clase por id | ⬜ |
| 3.4 | Badge `-10%` cuando `descuentoAplicado === true` | ⬜ |
| 3.5 | Badges de estado: PENDIENTE / ASISTIDA / RETIRADA | ⬜ |
| 3.6 | Botón "Retirar" habilitado solo en PENDIENTE | ⬜ |
| 3.7 | Al retirar: llamar `retirarInscripcion(id)` y refrescar | ⬜ |
| 3.8 | En RETIRADA: mostrar *"X cupos repuestos a la disponibilidad"* | ⬜ |

### Paso 4 — Modal / formulario Nuevo cliente

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Botón "+ Nuevo cliente" en pantalla 02 (y/o 03) | ⬜ |
| 4.2 | Formulario: nombre, cédula, teléfono | ⬜ |
| 4.3 | Llamar `crearCliente()` y actualizar select de clientes | ⬜ |
| 4.4 | Validar nombre y cédula obligatorios | ⬜ |

### Paso 5 — Navegación y pulido final

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Las 3 pantallas accesibles desde la app | ⬜ |
| 5.2 | Estilos alineados con `03-detalle.png` | ⬜ |
| 5.3 | Revisar que componentes no importan fuentes de datos directamente | ⬜ |

### Paso 6 — Prueba modo api y entrega CP3

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Levantar mock: `node mock/servidor-mock.cjs mock/semillas.json` | ⬜ |
| 6.2 | Cambiar `.env` → `VITE_FUENTE_DATOS=api` | ⬜ |
| 6.3 | Reiniciar app y probar listar, crear, retirar vía API | ⬜ |
| 6.4 | Ejecutar `npm run build` sin errores | ⬜ |
| 6.5 | Commit descriptivo (ej: `"CP3: pantalla detalle, nuevo cliente y fuente api"`) | ⬜ |

### Criterios de aceptación CP3

- [ ] Pantalla 03 con badges de estado y -10%
- [ ] Retirar solo en PENDIENTE
- [ ] Reposición de cupos con nota al retirar
- [ ] "+ Nuevo cliente" funcional
- [ ] Modo `api` funciona con mock en puerto 3000
- [ ] Cabecera muestra fuente `api`
- [ ] `npm run build` pasa sin errores

---

## C4 — Entrega final (auditoría)

| # | Tarea | Estado |
|---|---|---|
| 1 | Revisar que archivos bloqueados no fueron modificados | ⬜ |
| 2 | Probar las 3 fuentes (`memoria`, `json`, `api`) | ⬜ |
| 3 | Commit final: `"Examen C4 - Auditoría"` | ⬜ |
| 4 | Push al repositorio (hasta 1 h después del cierre) | ⬜ |

---

## Bitácora de avance

> Aquí anotamos lo que hacemos en cada sesión.

### Sesión 1 — _(fecha)_

- [ ] _Pendiente: primera sesión de trabajo_

**Notas:**

```
(espacio para anotar decisiones, problemas y soluciones)
```

---

### Sesión 2 — _(fecha)_

**Notas:**

```
```

---

### Sesión 3 — _(fecha)_

**Notas:**

```
```

---

## Comandos de referencia rápida

```bash
# Desarrollo
npm run dev

# Build (obligatorio antes de entregar)
npm run build

# Mock (modo api — desde la raíz del paquete de examen)
node mock/servidor-mock.cjs mock/semillas.json

# Cambiar fuente (editar .env y reiniciar dev)
# VITE_FUENTE_DATOS=memoria
# VITE_FUENTE_DATOS=json
# VITE_FUENTE_DATOS=api
```

---

## Archivos que crearemos (mapa)

```
src/
  dominio/
    index.ts                    ← CP1
  datos/
    contrato.ts                 ← copia de base/ (CP1)
    index.ts                    ← copia de base/ (CP1)
    configuracion.ts            ← copia de base/ (CP1)
    datos.memoria.ts            ← CP1 (parcial) → CP2 (completo) → CP3 (completo)
    datos.json.ts               ← CP1 (esqueleto) → CP2 (completo) → CP3 (completo)
    datos.api.ts                ← CP1 (esqueleto) → CP3 (completo)
  componentes/
    Cabecera.tsx                ← CP1
    Badge.tsx                   ← CP1
    Tabla.tsx                   ← CP1
    ...                         ← CP2/CP3 según necesidad
  pantallas/
    PantallaListado.tsx         ← CP1
    PantallaCrear.tsx           ← CP2
    PantallaDetalle.tsx         ← CP3
  App.tsx                       ← CP1 (integración progresiva)
public/
  semillas.json                 ← setup inicial
DECISIONES.md                   ← CP1
.env                            ← setup inicial (corregir)
```
