import type { FuenteDatos } from "./contrato";
import { RUTA_SEMILLAS_JSON } from "./configuracion";
import {
  crearInscripcionEnAlmacen,
  listarClasesDesde,
  listarClientesDesde,
  listarInscripcionesDesde,
  type AlmacenDatos,
} from "./logica";
import type { Clase, Cliente, Inscripcion } from "../dominio";

const pendiente = () => Promise.reject(new Error("no implementado"));

let almacen: AlmacenDatos | null = null;
let carga: Promise<AlmacenDatos> | null = null;

interface SemillasJson {
  clases: Clase[];
  clientes: Cliente[];
  inscripciones: Inscripcion[];
}

async function obtenerAlmacen(): Promise<AlmacenDatos> {
  if (almacen) {
    return almacen;
  }
  if (!carga) {
    carga = fetch(RUTA_SEMILLAS_JSON)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`No se pudo cargar ${RUTA_SEMILLAS_JSON}`);
        }
        return respuesta.json() as Promise<SemillasJson>;
      })
      .then((datos) => {
        almacen = {
          clases: structuredClone(datos.clases),
          clientes: structuredClone(datos.clientes),
          inscripciones: structuredClone(datos.inscripciones),
        };
        return almacen;
      });
  }
  return carga;
}

export const fuenteJson: FuenteDatos = {
  listarClases: async () => listarClasesDesde(await obtenerAlmacen()),
  listarClientes: async () => listarClientesDesde(await obtenerAlmacen()),
  listarInscripciones: async () => listarInscripcionesDesde(await obtenerAlmacen()),
  crearCliente: pendiente,
  crearInscripcion: async (datos) =>
    crearInscripcionEnAlmacen(await obtenerAlmacen(), datos),
  retirarInscripcion: pendiente,
};
