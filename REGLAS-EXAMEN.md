# Reglas del Examen — Gimnasio Atlas (Temática 06)

> **IS-403 — Aplicaciones para el Cliente Web** · ULEAM · Examen Práctico Final C4 (35%)
> Duración: **3 horas** · Framework elegido: **React + Vite + TypeScript**

---

## 1. El reto

Construir una interfaz web **similar a las 3 pantallas** de referencia. Las entidades, campos, textos y **5 reglas de negocio** no se dictan por escrito: se derivan de las imágenes y de `mock/semillas.json`.

### Contenido del paquete base

| Carpeta | Qué contiene | Rol |
|---|---|---|
| `pantallas/` | `01-listado.png`, `02-crear.png`, `03-detalle.png` | **Única especificación** de campos, layout y reglas |
| `mock/` | `servidor-mock.cjs` + `semillas.json` | Servidor local en puerto **3000** |
| `base/datos/` | `contrato.ts` + `index.ts` (**BLOQUEADOS**) + `configuracion.ts` | Contrato y fábrica de la capa de datos |

### Requisito central

Una sola aplicación con **3 fuentes de datos intercambiables**, sin modificar código, solo cambiando `VITE_FUENTE_DATOS` en `.env` y reiniciando. La cabecera debe mostrar la fuente activa.

---

## 2. Archivos y carpetas bloqueados (NO TOCAR)

| Recurso | Motivo |
|---|---|
| `base/datos/contrato.ts` | Contrato fijo de la capa de datos |
| `base/datos/index.ts` | Fábrica fija que elige la fuente |
| Carpeta `mock/` completa | Servidor y semillas oficiales |
| Carpeta `pantallas/` completa | Especificación visual de referencia |

**Consecuencia:** si se modifican, el trabajo queda invalidado (se comparan contra el original al firmar).

**Sí se puede editar:** `base/datos/configuracion.ts` (y su copia en `src/datos/`).

---

## 3. Estructura obligatoria en `src/`

```
src/
  dominio/          → interfaces y tipos (lenguaje de la app)
  datos/
    contrato.ts     → copiado de base/ (bloqueado)
    index.ts        → copiado de base/ (bloqueado)
    configuracion.ts
    datos.memoria.ts
    datos.json.ts
    datos.api.ts
  componentes/      → piezas reutilizables (Badge, Tabla, Cabecera, ...)
  pantallas/        → las 3 vistas del examen
```

### Reglas de arquitectura (tres reglas de oro)

1. **Pantallas** no definen tipos ni acceden a datos directamente.
2. **Componentes** no saben de dónde vienen los datos.
3. **Dominio** no importa nada de nadie.

Toda la app consume datos **únicamente** a través de `obtenerFuenteDatos()` exportado por `src/datos/index.ts`.

---

## 4. Fuentes de datos

| Fuente | Variable `.env` | Implementación | Cuándo se evalúa |
|---|---|---|---|
| **memoria** | `VITE_FUENTE_DATOS=memoria` | Semillas importadas en código; mutaciones en arreglos JS | CP1 |
| **json** | `VITE_FUENTE_DATOS=json` | `fetch` a `/semillas.json` al iniciar; luego opera en memoria | CP2 |
| **api** | `VITE_FUENTE_DATOS=api` | REST contra el mock en `http://localhost:3000` | CP3 |

### Configuración

Archivo `.env` en la raíz del proyecto Vite:

```env
VITE_FUENTE_DATOS=memoria
```

Valores válidos: `memoria` | `json` | `api`.

**Requisito obligatorio:** la cabecera de la aplicación debe mostrar la fuente activa (`memoria`, `json` o `api`). Usar `FUENTE_ACTIVA` exportada desde `src/datos/index.ts`.

### Archivos auxiliares

| Archivo | Ubicación | Uso |
|---|---|---|
| `semillas.json` | `public/semillas.json` | Modo `json` (copiar desde `mock/semillas.json`) |
| `servidor-mock.cjs` | `mock/` (no mover) | Modo `api` |

Comando del mock:

```bash
node mock/servidor-mock.cjs mock/semillas.json
```

---

## 5. Dominio — tipos que debes definir

Crear `src/dominio/index.ts`. El contrato bloqueado importa exactamente estos cinco nombres:

```ts
export interface Clase { ... }
export interface Cliente { ... }
export type NuevoCliente = ...;
export interface Inscripcion { ... }
export type NuevaInscripcion = ...;
```

### Campos derivados de pantallas y semillas

| Tipo | Campos observables |
|---|---|
| `Clase` | `id`, `nombre`, `precioUnitario`, `disponibles`, `activo` |
| `Cliente` | `id`, `nombre`, `cedula`, `telefono` |
| `NuevoCliente` | `nombre`, `cedula`, `telefono` (sin `id`) |
| `Inscripcion` | `id`, `claseId`, `clienteId`, `cantidad`, `total`, `descuentoAplicado`, `estado` |
| `NuevaInscripcion` | `claseId`, `clienteId`, `cantidad` |

### Estados de inscripción

| Estado | Badge | Acción en pantalla 03 |
|---|---|---|
| `PENDIENTE` | Amarillo | Botón **Retirar** habilitado |
| `ASISTIDA` | Azul | Botón **Retirar** deshabilitado |
| `RETIRADA` | Gris | Texto *"X cupos repuestos a la disponibilidad"* |

---

## 6. Contrato de la capa de datos (`FuenteDatos`)

Los tres archivos `datos.*.ts` deben exportar un objeto que implemente:

| Método | Descripción |
|---|---|
| `listarClases()` | Catálogo completo, incluidos inactivos |
| `listarClientes()` | Todos los clientes |
| `crearCliente(datos)` | Crea cliente y devuelve con `id` asignado |
| `listarInscripciones()` | Todas las transacciones, cualquier estado |
| `crearInscripcion(datos)` | Crea inscripción aplicando reglas de negocio |
| `retirarInscripcion(id)` | PENDIENTE → RETIRADA y repone disponibilidad |

Los tres archivos deben **existir desde CP1**, aunque dos rechacen con `"no implementado"`.

---

## 7. Las 3 pantallas — funcionalidades obligatorias

### Pantalla 01 — Catálogo de clases (`01-listado.png`)

- Título: **Gimnasio Atlas** / **Sistema de inscripciones**
- Sección: **Catálogo de clases**
- Tabla con columnas: **Clase**, **Precio**, **Disponibles**, **Estado**
- Badge verde **Activo** / gris **Inactivo**
- Mostrar las **4 semillas** (la 4.ª, boxeo, debe verse como **Inactivo**)
- Fuente evaluada en CP1: **memoria**

### Pantalla 02 — Nueva inscripción (`02-crear.png`)

- Formulario con:
  - **Clase** (select, obligatorio) — solo clases **activas**
  - **Cliente** (select, obligatorio) — formato `Nombre (cédula)`
  - Botón **+ Nuevo cliente**
  - **Cantidad** (número, mínimo 1)
  - Texto dinámico: **"Quedan X disponibles"**
  - Resumen: **Total** calculado en vivo
  - Nota: **"Desde 5 unidades: 10% de descuento"**
  - Botón **Registrar inscripción**
- Fuente evaluada en CP2: **json**

### Pantalla 03 — Inscripciones (`03-detalle.png`)

- Tabla con: **Cliente**, **Clase**, **Cant.**, **Total**, **Estado**, **Acción**
- Badge **-10%** junto al total cuando `descuentoAplicado === true`
- Badges de estado: PENDIENTE / ASISTIDA / RETIRADA
- Botón **Retirar** solo habilitado en estado **PENDIENTE**
- Al retirar: mostrar *"X cupos repuestos a la disponibilidad"*
- Botón **+ Nuevo cliente** funcional
- Fuente evaluada en CP3: **api**

---

## 8. Reglas de negocio (R1–R5)

Estas reglas están implementadas en el mock y deben replicarse en `datos.memoria.ts` y `datos.json.ts`:

| Regla | Descripción | Dónde se aplica |
|---|---|---|
| **R1** | La clase debe existir y estar **activa**; el cliente debe existir | `crearInscripcion` |
| **R2** | La cantidad no puede superar los **disponibles** de la clase | `crearInscripcion` + validación en UI |
| **R3** | Descuento del **10%** desde **5 unidades** | Cálculo de total (UI y capa de datos) |
| **R4** | Solo se puede **retirar** desde estado **PENDIENTE** | `retirarInscripcion` + botón en UI |
| **R5** | Al **crear** se descuenta disponibilidad; al **retirar** se repone | `crearInscripcion` / `retirarInscripcion` |

### Cálculo del total (R3)

```
bruto = cantidad × precioUnitario
si cantidad >= 5 → total = bruto × 0.90
si no            → total = bruto
descuentoAplicado = cantidad >= 5
```

Ejemplos con spinning ($8.50):

| Cantidad | Cálculo | Total |
|---|---|---|
| 3 | 3 × 8.50 | $25.50 |
| 5 | 5 × 8.50 × 0.90 | $38.25 |

### Validaciones en la interfaz (CP2)

- El selector de clase solo ofrece registros **activos**
- No se puede registrar sin cliente seleccionado
- Si cantidad > disponibles → **bloquear** el registro
- El total se calcula **en vivo** mientras cambia la cantidad
- Al registrar, la disponibilidad de la clase se **descuenta**

---

## 9. API REST del mock (modo `api`)

| Método | Endpoint | Cuerpo / acción |
|---|---|---|
| GET | `/` | Índice de endpoints |
| GET | `/clases` | Listar clases |
| GET | `/clientes` | Listar clientes |
| POST | `/clientes` | `{ nombre, cedula, telefono }` |
| GET | `/inscripciones` | Listar inscripciones |
| POST | `/inscripciones` | `{ claseId, clienteId, cantidad }` |
| PATCH | `/inscripciones/:id` | Retirar (cambia a RETIRADA) |

Códigos HTTP del mock: `201` creado · `400` JSON inválido · `404` no existe · `409` estado no permite · `422` regla de negocio.

---

## 10. Checkpoints y puntuación

> Los checkpoints se presentan **en orden**: CP1 → CP2 → CP3.

| Checkpoint | Qué entregar | Puntos | Tiempo sugerido |
|---|---|---|---|
| **CP1** — La estructura existe | Arquitectura + dominio ligado + pantalla 01 en modo `memoria` | 3.0 | 60 min |
| **CP2** — Las reglas viven en la interfaz | Pantalla 02 con validación en vivo + modo `json` | 5.0 | 140 min |
| **CP3** — Cerrado y conmutable | Pantalla 03 + nuevo cliente + modo `api` (mock) | 2.0 | 175 min |

### CP1 — La estructura existe (3.0 pts)

| Criterio | Detalle |
|---|---|
| Estructura | Carpetas `dominio`, `datos`, `componentes`, `pantallas` |
| Archivos bloqueados | Intactos |
| `DECISIONES.md` | Máximo 10 líneas con decisiones de diseño |
| Tipado del dominio | Interfaces completadas |
| Pantalla 01 | Funcional con fuente **memoria** |
| Datos | 4 registros con precio, disponibles y badges; el 4.º inactivo |

**Puntuación:** Base 1.2 + Oral 1.8 = **3.0**

### CP2 — Las reglas viven en la interfaz (5.0 pts)

| Criterio | Detalle |
|---|---|
| Pantalla 02 | Formulario de creación con validación en vivo |
| Selector | Solo clases activas |
| Disponibilidad | "Quedan X" + bloqueo si cantidad > disponibles |
| Total en vivo | Ej: 3 × $8.50 = $25.50 |
| Descuento | -10% desde 5 unidades (ej: $38.25) |
| Fuente **json** | Cambiar variable, reiniciar, carga desde `/semillas.json` |

**Puntuación:** Base 2.0 + Oral 3.0 = **5.0**

### CP3 — Cerrado y conmutable (2.0 pts)

| Criterio | Detalle |
|---|---|
| Pantalla 03 | Badges de estado y nota -10% |
| Retirar | Botón habilitado solo en PENDIENTE |
| Reposición | Al retirar, cupos repuestos con su nota |
| Nuevo cliente | Botón **+ Nuevo cliente** funcional |
| Fuente **api** | Mock corriendo + variable en `.env` + reinicio |

**Puntuación:** Base 0.8 + Oral 1.2 = **2.0**

### Distribución general

| Componente | Peso |
|---|---|
| Base (app funciona) | 40% |
| Defensa oral | 60% |

La defensa oral evalúa si puedes explicar tu código: dónde se calcula el total, por qué el dominio no depende de datos, cómo cambias la fuente sin tocar componentes, etc.

---

## 11. Reglas del juego

1. **Archivos bloqueados:** `base/datos/contrato.ts`, `base/datos/index.ts`, carpetas `/mock/` y `/pantallas/` — no se tocan.
2. **Nombres exactos en español:** archivos, variables y rutas deben coincidir con lo indicado.
3. **Orden obligatorio:** checkpoints en secuencia CP1 → CP2 → CP3.
4. **IA permitida**, pero debes poder **explicar cada línea** en la defensa oral.
5. **Internet limitado** a: IA, documentación oficial y repositorios personales.
6. **Commits:** mínimo uno por checkpoint con mensaje descriptivo.
7. **Commit final:** `"Examen C4 - Auditoría"` con push hasta 1 hora después del cierre.
8. La app debe arrancar con `npm run dev` y compilar con `npm run build` sin errores.
9. **Si no arranca, no se califica**, sin importar el avance.

---

## 12. Checklist de implementación

### Setup inicial

- [ ] Proyecto Vite + React + TypeScript creado
- [ ] Copiar `base/datos/` → `src/datos/`
- [ ] Copiar `mock/semillas.json` → `public/semillas.json`
- [ ] `.env` con `VITE_FUENTE_DATOS=memoria`
- [ ] Crear `src/dominio/index.ts` con los 5 tipos
- [ ] Crear `datos.memoria.ts`, `datos.json.ts`, `datos.api.ts` (aunque dos sean esqueleto)

### CP1

- [ ] Pantalla 01: catálogo de clases con badges
- [ ] Cabecera muestra fuente activa
- [ ] `DECISIONES.md` (máx. 10 líneas)
- [ ] Commit CP1

### CP2

- [ ] Pantalla 02: formulario con validación en vivo
- [ ] Reglas R1, R2, R3 en UI y en `datos.memoria.ts`
- [ ] `datos.json.ts` implementado
- [ ] Probar con `VITE_FUENTE_DATOS=json`
- [ ] Commit CP2

### CP3

- [ ] Pantalla 03: listado con estados y retiro
- [ ] Reglas R4, R5
- [ ] Botón + Nuevo cliente funcional
- [ ] `datos.api.ts` implementado
- [ ] Mock corriendo + `VITE_FUENTE_DATOS=api`
- [ ] `npm run build` sin errores
- [ ] Commit CP3

### Entrega final

- [ ] Commit `"Examen C4 - Auditoría"`
- [ ] Push al repositorio

---

## 13. Datos semilla de referencia

Fuente: `mock/semillas.json`

**Clases:**

| Clase | Precio | Disponibles | Estado |
|---|---|---|---|
| Clase de spinning | $8.50 | 10 | Activo |
| Clase de yoga | $6.00 | 4 | Activo |
| Clase de crossfit | $5.00 | 2 | Activo |
| Clase de boxeo | $15.00 | 3 | **Inactivo** |

**Clientes:** Ana Zambrano, Luis Mero, Carla Vera

**Inscripciones iniciales:**

| Cliente | Clase | Cant. | Total | Descuento | Estado |
|---|---|---|---|---|---|
| Ana Zambrano | spinning | 3 | $25.50 | No | PENDIENTE |
| Luis Mero | yoga | 5 | $27.00 | Sí (-10%) | ASISTIDA |
| Carla Vera | crossfit | 2 | $10.00 | No | RETIRADA |

---

## 14. Nota sobre tu `.env` actual

El valor actual es incorrecto:

```env
VITE_FUENTE_DATOS=./semillas-tema-01.json   # ❌ incorrecto
```

Debe ser uno de estos:

```env
VITE_FUENTE_DATOS=memoria   # ✅ CP1
VITE_FUENTE_DATOS=json      # ✅ CP2
VITE_FUENTE_DATOS=api       # ✅ CP3
```

El archivo JSON va en `public/semillas.json`; la variable solo indica **qué fuente usar**, no la ruta del archivo.
