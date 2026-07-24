# Decisiones de diseño — CP1

- Framework: React + Vite + TypeScript por rapidez de desarrollo y tipado estático.
- Arquitectura en capas: dominio (tipos), datos (fuentes), componentes (UI), pantallas (vistas).
- Modo memoria: semillas en `src/datos/semillas.ts`, clonadas con `structuredClone` para mutaciones futuras.
- La app consume datos solo vía `obtenerFuenteDatos()`; la pantalla no conoce la fuente activa.
- Componentes reutilizables (`Badge`, `Tabla`, `Cabecera`) reciben datos por props, sin acceso a la capa de datos.
- La fuente activa se lee de `FUENTE_ACTIVA` (fábrica bloqueada) y se muestra en la cabecera.
