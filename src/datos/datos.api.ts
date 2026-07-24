import type { FuenteDatos } from "./contrato";

const pendiente = () => Promise.reject(new Error("no implementado"));

export const fuenteApi: FuenteDatos = {
  listarClases: pendiente,
  listarClientes: pendiente,
  crearCliente: pendiente,
  listarInscripciones: pendiente,
  crearInscripcion: pendiente,
  retirarInscripcion: pendiente,
};
