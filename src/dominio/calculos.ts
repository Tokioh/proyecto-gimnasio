export const DESCUENTO_DESDE_UNIDADES = 5;
export const DESCUENTO_PORCENTAJE = 10;

export interface ResultadoTotal {
  total: number;
  descuentoAplicado: boolean;
}

export function calcularTotal(
  cantidad: number,
  precioUnitario: number,
): ResultadoTotal {
  const bruto = cantidad * precioUnitario;
  const descuentoAplicado = cantidad >= DESCUENTO_DESDE_UNIDADES;
  const total = descuentoAplicado
    ? bruto * (1 - DESCUENTO_PORCENTAJE / 100)
    : bruto;
  return {
    total: redondear2(total),
    descuentoAplicado,
  };
}

export function formatearPrecio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}

function redondear2(n: number): number {
  return Math.round(n * 100) / 100;
}
