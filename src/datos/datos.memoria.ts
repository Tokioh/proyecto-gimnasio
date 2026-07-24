import type { FuenteDatos } from "./contrato";
import { semillas } from "./semillas";
import {
  crearInscripcionEnAlmacen,
  listarClasesDesde,
  listarClientesDesde,
  listarInscripcionesDesde,
  type AlmacenDatos,
} from "./logica";

const clonar = <T>(valor: T): T => structuredClone(valor);

const almacen: AlmacenDatos = {
  clases: clonar(semillas.clases),
  clientes: clonar(semillas.clientes),
  inscripciones: clonar(semillas.inscripciones),
};

const pendiente = () => Promise.reject(new Error("no implementado"));

export const fuenteMemoria: FuenteDatos = {
  listarClases: () => Promise.resolve(listarClasesDesde(almacen)),
  listarClientes: () => Promise.resolve(listarClientesDesde(almacen)),
  listarInscripciones: () => Promise.resolve(listarInscripcionesDesde(almacen)),
  crearCliente: pendiente,
  crearInscripcion: (datos) =>
    Promise.resolve(crearInscripcionEnAlmacen(almacen, datos)),
  retirarInscripcion: pendiente,
};
