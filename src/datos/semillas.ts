import type { Clase, Cliente, Inscripcion } from "../dominio";

export const semillas = {
  negocio: "Gimnasio Atlas",
  subtitulo: "Sistema de inscripciones",
  clases: [
    { id: 1, nombre: "Clase de spinning", precioUnitario: 8.5, disponibles: 10, activo: true },
    { id: 2, nombre: "Clase de yoga", precioUnitario: 6.0, disponibles: 4, activo: true },
    { id: 3, nombre: "Clase de crossfit", precioUnitario: 5.0, disponibles: 2, activo: true },
    { id: 4, nombre: "Clase de boxeo", precioUnitario: 15.0, disponibles: 3, activo: false },
  ] satisfies Clase[],
  clientes: [
    { id: 1, nombre: "Ana Zambrano", cedula: "1310000001", telefono: "0990000001" },
    { id: 2, nombre: "Luis Mero", cedula: "1310000002", telefono: "0990000002" },
    { id: 3, nombre: "Carla Vera", cedula: "1310000003", telefono: "0990000003" },
  ] satisfies Cliente[],
  inscripciones: [
    {
      id: 1,
      claseId: 1,
      clienteId: 1,
      cantidad: 3,
      total: 25.5,
      descuentoAplicado: false,
      estado: "PENDIENTE",
    },
    {
      id: 2,
      claseId: 2,
      clienteId: 2,
      cantidad: 5,
      total: 27.0,
      descuentoAplicado: true,
      estado: "ASISTIDA",
    },
    {
      id: 3,
      claseId: 3,
      clienteId: 3,
      cantidad: 2,
      total: 10.0,
      descuentoAplicado: false,
      estado: "RETIRADA",
    },
  ] satisfies Inscripcion[],
};
