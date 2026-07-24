import type {
  Clase,
  Cliente,
  Inscripcion,
  NuevaInscripcion,
  EstadoInscripcion,
} from "../dominio";
import { calcularTotal } from "../dominio/calculos";

export interface AlmacenDatos {
  clases: Clase[];
  clientes: Cliente[];
  inscripciones: Inscripcion[];
}

const clonar = <T>(valor: T): T => structuredClone(valor);

export function listarClasesDesde(almacen: AlmacenDatos): Clase[] {
  return clonar(almacen.clases);
}

export function listarClientesDesde(almacen: AlmacenDatos): Cliente[] {
  return clonar(almacen.clientes);
}

export function listarInscripcionesDesde(almacen: AlmacenDatos): Inscripcion[] {
  return clonar(almacen.inscripciones);
}

function siguienteId(coleccion: { id: number }[]): number {
  return coleccion.reduce((max, registro) => Math.max(max, registro.id), 0) + 1;
}

export function crearInscripcionEnAlmacen(
  almacen: AlmacenDatos,
  datos: NuevaInscripcion,
): Inscripcion {
  const claseId = Number(datos.claseId);
  const clienteId = Number(datos.clienteId);
  const cantidad = Number(datos.cantidad);

  if (!Number.isInteger(claseId) || !Number.isInteger(clienteId) || !Number.isInteger(cantidad)) {
    throw new Error("Se requieren claseId, clienteId y cantidad (enteros)");
  }
  if (cantidad < 1) {
    throw new Error("La cantidad mínima es 1");
  }

  const clase = almacen.clases.find((item) => item.id === claseId);
  if (!clase) {
    throw new Error(`No existe la clase ${claseId}`);
  }
  if (!clase.activo) {
    throw new Error(`"${clase.nombre}" está inactiva`);
  }

  const cliente = almacen.clientes.find((item) => item.id === clienteId);
  if (!cliente) {
    throw new Error(`No existe el cliente ${clienteId}`);
  }

  if (cantidad > clase.disponibles) {
    throw new Error(`Solo quedan ${clase.disponibles} disponibles`);
  }

  const { total, descuentoAplicado } = calcularTotal(cantidad, clase.precioUnitario);
  const inscripcion: Inscripcion = {
    id: siguienteId(almacen.inscripciones),
    claseId,
    clienteId,
    cantidad,
    total,
    descuentoAplicado,
    estado: "PENDIENTE" satisfies EstadoInscripcion,
  };

  clase.disponibles -= cantidad;
  almacen.inscripciones.push(inscripcion);
  return clonar(inscripcion);
}
