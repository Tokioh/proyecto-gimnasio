import type { FuenteDatos } from "./contrato";
import type { Clase, Cliente, Inscripcion } from "../dominio";
import { semillas } from "./semillas";

const clonar = <T>(valor: T): T => structuredClone(valor);

const clases: Clase[] = clonar(semillas.clases);
const clientes: Cliente[] = clonar(semillas.clientes);
const inscripciones: Inscripcion[] = clonar(semillas.inscripciones);

const pendiente = () => Promise.reject(new Error("no implementado"));

export const fuenteMemoria: FuenteDatos = {
  listarClases: () => Promise.resolve(clonar(clases)),
  listarClientes: () => Promise.resolve(clonar(clientes)),
  listarInscripciones: () => Promise.resolve(clonar(inscripciones)),
  crearCliente: pendiente,
  crearInscripcion: pendiente,
  retirarInscripcion: pendiente,
};
