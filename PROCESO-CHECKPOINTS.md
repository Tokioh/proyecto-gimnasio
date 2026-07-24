# Proceso por Checkpoint — Gimnasio Atlas

> Documento vivo: aquí registramos **qué hacemos**, **en qué orden** y **qué queda hecho** en cada checkpoint.
> Referencia de reglas: ver `REGLAS-EXAMEN.md`.

---

## Estado general

| Checkpoint | Estado | Fuente activa | Commit |
|---|---|---|---|
| **CP1** — La estructura existe | ✅ Completado | `memoria` | `CP1: estructura, dominio y pantalla listado en memoria` |
| **CP2** — Las reglas viven en la interfaz | ✅ Completado | `json` (probar en `.env`) | pendiente commit |
| **CP3** — Cerrado y conmutable | ⬜ Pendiente | `api` | — |
| **C4** — Auditoría final | ⬜ Pendiente | — | `"Examen C4 - Auditoría"` |

**Leyenda:** ⬜ Pendiente · 🔄 En progreso · ✅ Completado

---

## Antes de CP1 — Setup inicial

> Hacer esto una sola vez antes de empezar el primer checkpoint.

| # | Tarea | Estado | Notas |
|---|---|---|---|
| 0.1 | Proyecto Vite + React + TypeScript creado | ✅ | `proyecto-gimnasio` | npm create vite@latest proyecto-gimnasio -- --template react-ts
| 0.2 | crear `.env` → `VITE_FUENTE_DATOS=memoria` | ✅ | |
| 0.3 | Copiar `base/datos/` → `src/datos/` | ✅ | contrato, index, configuracion |
| 0.4 | Copiar `mock/semillas.json` → `public/semillas.json` | ✅ | |
| 0.5 | Crear carpetas `src/dominio/`, `src/componentes/`, `src/pantallas/` | ✅ | |
| 0.6 | Crear esqueletos `datos.memoria.ts`, `datos.json.ts`, `datos.api.ts` | ✅ | + `dominio/index.ts` |
| 0.7 | Verificar que `npm run dev` y `npm run build` arrancan sin errores | ✅ | build OK |

---

## CP1 — La estructura existe (3.0 pts · ~60 min)

**Objetivo:** Arquitectura completa + dominio tipado + pantalla 01 funcional con fuente `memoria`.

**Al terminar:** pantalla de catálogo de clases visible, cabecera con fuente activa, commit CP1.

### Paso 1 — Dominio (`src/dominio/index.ts`)

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Crear interface `Clase` (`id`, `nombre`, `precioUnitario`, `disponibles`, `activo`) | ✅ |
| 1.2 | Crear interface `Cliente` (`id`, `nombre`, `cedula`, `telefono`) | ✅ |
| 1.3 | Crear type `NuevoCliente` (`nombre`, `cedula`, `telefono`) | ✅ |
| 1.4 | Crear interface `Inscripcion` (`id`, `claseId`, `clienteId`, `cantidad`, `total`, `descuentoAplicado`, `estado`) | ✅ |
| 1.5 | Crear type `NuevaInscripcion` (`claseId`, `clienteId`, `cantidad`) | ✅ |

### Paso 2 — Capa de datos (esqueletos + memoria)

| # | Tarea | Estado |
|---|---|---|
| 2.1 | `datos.memoria.ts` — importar semillas en código (`semillas.ts`) | ✅ |
| 2.2 | Implementar `listarClases()` en memoria | ✅ |
| 2.3 | Implementar `listarClientes()` en memoria (puede devolver datos aunque no se usen aún) | ✅ |
| 2.4 | Implementar `listarInscripciones()` en memoria (puede devolver datos aunque no se usen aún) | ✅ |
| 2.5 | Dejar `crearCliente`, `crearInscripcion`, `retirarInscripcion` con `pendiente()` | ✅ |
| 2.6 | `datos.json.ts` — esqueleto que rechaza con `"no implementado"` | ✅ |
| 2.7 | `datos.api.ts` — esqueleto que rechaza con `"no implementado"` | ✅ |
| 2.8 | Verificar que `obtenerFuenteDatos()` compila y devuelve memoria | ✅ |

### Paso 3 — Componentes reutilizables

| # | Tarea | Estado |
|---|---|---|
| 3.1 | `Cabecera` — título "Gimnasio Atlas", subtítulo, fuente activa (`FUENTE_ACTIVA`) | ✅ |
| 3.2 | `Badge` — variantes Activo (verde) / Inactivo (gris) | ✅ |
| 3.3 | `Tabla` — componente genérico para filas y columnas | ✅ |

### Paso 4 — Pantalla 01 — Catálogo de clases

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Crear `src/pantallas/PantallaListado.tsx` | ✅ |
| 4.2 | Consumir `obtenerFuenteDatos().listarClases()` (no acceder a datos directamente) | ✅ |
| 4.3 | Tabla con columnas: Clase, Precio, Disponibles, Estado | ✅ |
| 4.4 | Mostrar las 4 semillas (boxeo como Inactivo) | ✅ |
| 4.5 | Formatear precio con `$` y 2 decimales | ✅ |

### Paso 5 — Integración en App

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Limpiar plantilla por defecto de Vite en `App.tsx` | ✅ |
| 5.2 | Montar `Cabecera` + `PantallaListado` | ✅ |
| 5.3 | Estilos básicos similares a `01-listado.png` | ✅ |

### Paso 6 — Documentación y entrega CP1

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Crear `DECISIONES.md` (máx. 10 líneas) | ✅ |
| 6.2 | Probar con `VITE_FUENTE_DATOS=memoria` + `npm run dev` | ✅ |
| 6.3 | Commit descriptivo (ej: `"CP1: estructura, dominio y pantalla listado en memoria"`) | ✅ |

### Criterios de aceptación CP1

- [x] Carpetas `dominio`, `datos`, `componentes`, `pantallas` existen
- [x] Archivos bloqueados intactos (no modificados en `base/`, `mock/`, `pantallas/`)
- [x] Dominio con los 5 tipos exportados
- [x] Pantalla 01 muestra 4 clases con badges
- [x] Cabecera muestra fuente `memoria`
- [x] `DECISIONES.md` creado
- [x] App arranca sin errores (`npm run build` OK)

### 10 preguntas frecuentes — CP1 (con respuestas)

**1. ¿Por qué el dominio no importa de ninguna otra carpeta?**  
Porque el dominio solo define *tipos* (`Clase`, `Cliente`, etc.) derivados de las pantallas. No sabe si los datos vienen de memoria, JSON o API. Así la lógica de negocio y la UI quedan desacopladas de la fuente.

**2. ¿Dónde definiste los tipos y de dónde sacaste los campos?**  
En `src/dominio/index.ts`. Los campos los derivé de `pantallas/01-listado.png` (clases) y de `mock/semillas.json` (clientes e inscripciones para CP2/CP3).

**3. ¿Cómo cambia la fuente de datos sin tocar componentes ni pantallas?**  
Solo cambio `VITE_FUENTE_DATOS` en `.env` y reinicio. `configuracion.ts` lee esa variable, `index.ts` (fábrica bloqueada) elige `fuenteMemoria`, `fuenteJson` o `fuenteApi`, y el resto de la app sigue llamando `obtenerFuenteDatos()`.

**4. ¿Por qué la pantalla no importa `semillas.ts` directamente?**  
Porque rompería la arquitectura: la pantalla no debe saber de dónde vienen los datos. Solo llama `obtenerFuenteDatos().listarClases()`. Si mañana cambio a JSON o API, la pantalla no cambia.

**5. ¿Dónde están las semillas en modo memoria?**  
En `src/datos/semillas.ts`, importadas en código. `datos.memoria.ts` las clona con `structuredClone` a arrays mutables (`clases`, `clientes`, `inscripciones`).

**6. ¿Para qué usas `structuredClone`?**  
Para copiar las semillas al iniciar y devolver copias en cada `listar*()`. Así la UI no modifica el original y en CP2/CP3 podré mutar disponibilidad e inscripciones sin efectos secundarios.

**7. ¿Qué métodos implementaste en `fuenteMemoria` y cuáles dejaste pendientes?**  
Implementados: `listarClases`, `listarClientes`, `listarInscripciones`. Pendientes (rechazan con `"no implementado"`): `crearCliente`, `crearInscripcion`, `retirarInscripcion` — se completan en CP2 y CP3.

**8. ¿Por qué existen `datos.json.ts` y `datos.api.ts` si aún no funcionan?**  
El examen exige que los tres archivos existan desde CP1. La fábrica (`index.ts`, bloqueada) los importa siempre. En CP2 implemento JSON y en CP3 la API.

**9. ¿Cómo muestra la cabecera la fuente activa?**  
`Cabecera.tsx` importa `FUENTE_ACTIVA` de `src/datos/index.ts`. Esa constante la calcula la fábrica al arrancar según `.env`. No hardcodeo `"memoria"` en la UI.

**10. ¿Qué muestra la pantalla 01 y cómo validas que cumple CP1?**  
Tabla con 4 clases: nombre, precio (`$8.50`), disponibles y badge Activo/Inactivo. La cuarta (boxeo) debe verse **Inactivo**. Fuente en cabecera: `memoria`. `npm run dev` y `npm run build` sin errores.

---

| Pregunta probable | Dónde está en el código | Respuesta clave |
|---|---|---|
| ¿Dónde están los tipos del dominio? | `src/dominio/index.ts` | Interfaces derivadas de las pantallas y semillas; el dominio no importa otras capas |
| ¿Por qué el contrato importa del dominio? | `src/datos/contrato.ts` (bloqueado) | El contrato define *qué operaciones* existen; el dominio define *qué datos* se mueven |
| ¿Cómo cambia la fuente sin tocar componentes? | `.env` → `configuracion.ts` → `index.ts` (fábrica) | Solo cambia `VITE_FUENTE_DATOS`; la fábrica devuelve `fuenteMemoria`, `fuenteJson` o `fuenteApi` |
| ¿Cómo sabe la pantalla qué fuente hay activa? | No lo sabe directamente | `PantallaListado` llama `obtenerFuenteDatos()`; la cabecera lee `FUENTE_ACTIVA` solo para mostrarla |
| ¿Dónde están las semillas en modo memoria? | `src/datos/semillas.ts` | Importadas en código; `datos.memoria.ts` clona con `structuredClone` para mutar después |
| ¿Por qué `structuredClone`? | `datos.memoria.ts` | Evita que la UI modifique el objeto original al mutar en CP2/CP3 |
| ¿Qué métodos implementa memoria en CP1? | `datos.memoria.ts` | Solo lectura: `listarClases`, `listarClientes`, `listarInscripciones` |
| ¿Por qué json/api rechazan con error? | `datos.json.ts`, `datos.api.ts` | Requisito del examen: los 3 archivos existen desde CP1; se implementan en CP2 y CP3 |

### Archivos creados/modificados en CP1

```
src/dominio/index.ts              → 5 tipos del dominio
src/datos/semillas.ts             → semillas en código (modo memoria)
src/datos/datos.memoria.ts        → fuente memoria (listar*)
src/datos/datos.json.ts           → esqueleto (pendiente CP2)
src/datos/datos.api.ts            → esqueleto (pendiente CP3)
src/componentes/Cabecera.tsx      → título + fuente activa
src/componentes/Badge.tsx         → badges reutilizables
src/componentes/Tabla.tsx         → tabla genérica con columnas
src/pantallas/PantallaListado.tsx → pantalla 01
src/App.tsx                       → integración
src/App.css + src/index.css       → estilos
DECISIONES.md                     → decisiones de diseño (≤10 líneas)
```

### Flujo de datos CP1

```
.env (VITE_FUENTE_DATOS=memoria)
  → configuracion.ts → leerFuente()
    → index.ts → obtenerFuenteDatos() → fuenteMemoria
      → datos.memoria.ts → listarClases()
        → PantallaListado → Tabla + Badge
```

---

## CP2 — Las reglas viven en la interfaz (5.0 pts · ~140 min)

**Objetivo:** Pantalla 02 con validación en vivo + reglas R1, R2, R3 + fuente `json` funcional.

**Al terminar:** formulario de inscripción con total en vivo, cambio a modo json probado, commit CP2.

### Paso 1 — Lógica de negocio compartida

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Crear función `calcularTotal(cantidad, precioUnitario)` en dominio o utilidad | ✅ |
| 1.2 | Regla: descuento 10% desde 5 unidades | ✅ |
| 1.3 | Crear validaciones reutilizables (cantidad vs disponibles, clase activa) | ✅ |

### Paso 2 — Completar `datos.memoria.ts`

| # | Tarea | Estado |
|---|---|---|
| 2.1 | Implementar `crearInscripcion()` con reglas R1, R2, R3, R5 | ✅ |
| 2.2 | Al crear: descontar `disponibles` de la clase | ✅ |
| 2.3 | Rechazar con `Error` descriptivo si falla una regla | ✅ |

### Paso 3 — Implementar `datos.json.ts`

| # | Tarea | Estado |
|---|---|---|
| 3.1 | `fetch('/semillas.json')` al iniciar | ✅ |
| 3.2 | Operar en memoria con los datos cargados | ✅ |
| 3.3 | Implementar los 6 métodos (misma lógica que memoria) | ✅ |

### Paso 4 — Componentes adicionales

| # | Tarea | Estado |
|---|---|---|
| 4.1 | `Badge` — variantes PENDIENTE / ASISTIDA / RETIRADA (para CP3, opcional aquí) | ✅ |
| 4.2 | `Badge` — variante descuento `-10%` | ✅ |
| 4.3 | Inputs reutilizables (select, número) si conviene | ✅ |

### Paso 5 — Pantalla 02 — Nueva inscripción

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Crear `src/pantallas/PantallaCrear.tsx` | ✅ |
| 5.2 | Select de clase — **solo clases activas** | ✅ |
| 5.3 | Select de cliente — formato `Nombre (cédula)` | ✅ |
| 5.4 | Campo cantidad (mínimo 1) | ✅ |
| 5.5 | Texto dinámico "Quedan X disponibles" al elegir clase | ✅ |
| 5.6 | Total calculado **en vivo** al cambiar clase o cantidad | ✅ |
| 5.7 | Nota "Desde 5 unidades: 10% de descuento" | ✅ |
| 5.8 | Bloquear registro si: sin cliente, cantidad > disponibles | ✅ |
| 5.9 | Botón "Registrar inscripción" llama a `crearInscripcion()` | ✅ |
| 5.10 | Tras registrar: actualizar UI (disponibles descontados) | ✅ |

### Paso 6 — Navegación entre pantallas

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Enlazar pantalla 01 y 02 (tabs, links o router simple) | ✅ |
| 6.2 | Mantener cabecera con fuente activa en todas las vistas | ✅ |

### Paso 7 — Prueba modo json y entrega CP2

| # | Tarea | Estado |
|---|---|---|
| 7.1 | Cambiar `.env` → `VITE_FUENTE_DATOS=json` | ⬜ | Probar manualmente al presentar |
| 7.2 | Reiniciar `npm run dev` y verificar que carga desde `/semillas.json` | ⬜ |
| 7.3 | Probar creación de inscripción en modo json | ⬜ |
| 7.4 | Commit descriptivo (ej: `"CP2: pantalla crear, reglas en vivo y fuente json"`) | ⬜ |

### Criterios de aceptación CP2

- [x] Selector solo muestra clases activas
- [x] No registra sin cliente seleccionado
- [x] Muestra "Quedan X disponibles"
- [x] Bloquea si cantidad > disponibles
- [x] Total en vivo: 3 × $8.50 = $25.50
- [x] Descuento: 5 × $8.50 = $38.25 (con -10%)
- [x] Al registrar, disponibilidad se descuenta
- [x] Modo `json` implementado en `datos.json.ts`
- [x] Cabecera muestra fuente activa en ambas pantallas
- [x] `npm run build` sin errores

### 10 preguntas frecuentes — CP2 (con respuestas)

**1. ¿Dónde se calcula el total y desde qué cantidad aplica el descuento?**  
En `src/dominio/calculos.ts`, función `calcularTotal()`. El -10% aplica desde **5 unidades** (`DESCUENTO_DESDE_UNIDADES = 5`).

**2. ¿Por qué el cálculo está en dominio y no solo en la pantalla?**  
Porque la misma regla R3 debe aplicarse en la UI (vista previa) y en la capa de datos al crear (`logica.ts`). Una sola fuente de verdad evita inconsistencias.

**3. ¿Dónde viven las reglas R1, R2, R3 y R5 al crear?**  
En `src/datos/logica.ts`, función `crearInscripcionEnAlmacen()`. Valida clase activa, cliente existente, disponibilidad y descuenta cupos.

**4. ¿Por qué extrajiste `logica.ts`?**  
Para que `datos.memoria.ts` y `datos.json.ts` compartan la misma lógica sin duplicar código. Solo cambia de dónde cargan el almacén inicial.

**5. ¿Cómo funciona el modo json?**  
`datos.json.ts` hace `fetch(RUTA_SEMILLAS_JSON)` una vez, clona los datos a un almacén en memoria y usa las mismas funciones de `logica.ts`.

**6. ¿Cómo valida la interfaz sin esperar al servidor?**  
`PantallaCrear.tsx` deshabilita el botón si no hay cliente, si cantidad &lt; 1 o si cantidad &gt; disponibles. El total se recalcula con `useMemo` + `calcularTotal`.

**7. ¿Qué pasa después de registrar una inscripción?**  
Se llama `crearInscripcion()`, se descuenta disponibilidad en el almacén y la pantalla vuelve a cargar clases/clientes para reflejar los cambios.

**8. ¿Por qué el select de clase no muestra boxeo?**  
Porque filtro `clases.filter(c => c.activo)` — regla R1: solo clases activas se pueden inscribir.

**9. ¿Por qué "+ Nuevo cliente" está deshabilitado?**  
Es requisito de **CP3**. En CP2 el foco es crear inscripciones y el modo json.

**10. ¿Cómo demuestro el modo json en la defensa?**  
Cambio `.env` a `VITE_FUENTE_DATOS=json`, reinicio `npm run dev`, la cabecera muestra `json` y el formulario carga desde `/semillas.json`.

### Archivos creados/modificados en CP2

```
src/dominio/calculos.ts           → calcularTotal, formatearPrecio
src/datos/logica.ts               → crearInscripcionEnAlmacen (R1-R3, R5)
src/datos/datos.memoria.ts        → crearInscripcion implementado
src/datos/datos.json.ts           → fetch + misma lógica
src/pantallas/PantallaCrear.tsx   → pantalla 02
src/pantallas/PantallaListado.tsx → usa formatearPrecio compartido
src/App.tsx                       → navegación entre pantallas
src/App.css                       → estilos formulario
```

### Flujo de datos CP2

```
PantallaCrear
  → calcularTotal() en UI (vista previa)
  → obtenerFuenteDatos().crearInscripcion()
    → datos.memoria o datos.json
      → logica.crearInscripcionEnAlmacen()
        → valida R1, R2, R3 + descuenta R5
```

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

### Sesión 1 — 24/07/2026

- [x] Fase 0 completada (setup, esqueletos, dominio)
- [x] CP1 implementado (pantalla listado, componentes, fuente memoria)
- [x] `DECISIONES.md` creado
- [x] `npm run build` verificado
- [x] Commit CP1 realizado

**Notas:**

```
- Semillas en modo memoria viven en src/datos/semillas.ts (no en public/).
- public/semillas.json queda reservado para modo json (CP2).
- Badge ya incluye variantes para CP2/CP3 (pendiente, asistida, retirada, descuento).
- La pantalla usa useEffect + obtenerFuenteDatos() sin saber qué fuente hay detrás.
```

---

### Sesión 2 — 24/07/2026

- [x] CP2 implementado: PantallaCrear, calcularTotal, crearInscripcion
- [x] datos.json.ts con fetch a /semillas.json
- [x] logica.ts compartida entre memoria y json
- [x] Navegación entre catálogo y nueva inscripción
- [x] npm run build OK
- [ ] Probar con .env=json y commit CP2

**Notas:**

```
- calcularTotal vive en dominio/calculos.ts (UI + datos usan la misma regla).
- crearInscripcionEnAlmacen centraliza R1, R2, R3 y R5.
- Tras registrar, PantallaCrear recarga datos para ver disponibles actualizados.
- + Nuevo cliente deshabilitado hasta CP3.
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
    semillas.ts                 ← CP1 (semillas en código)
    datos.memoria.ts            ← CP1 (listar*) → CP2 (crear) → CP3 (completo)
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
