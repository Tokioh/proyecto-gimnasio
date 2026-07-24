export interface Clase {
  id: number;
  nombre: string;
  precioUnitario: number;
  disponibles: number;
  activo: boolean;
}

export interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
}

export type NuevoCliente = {
  nombre: string;
  cedula: string;
  telefono: string;
};

export type EstadoInscripcion = "PENDIENTE" | "ASISTIDA" | "RETIRADA";

export interface Inscripcion {
  id: number;
  claseId: number;
  clienteId: number;
  cantidad: number;
  total: number;
  descuentoAplicado: boolean;
  estado: EstadoInscripcion;
}

export type NuevaInscripcion = {
  claseId: number;
  clienteId: number;
  cantidad: number;
};
