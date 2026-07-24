export type VarianteBadge =
  | "activo"
  | "inactivo"
  | "pendiente"
  | "asistida"
  | "retirada"
  | "descuento";

interface BadgeProps {
  texto: string;
  variante: VarianteBadge;
}

export function Badge({ texto, variante }: BadgeProps) {
  return <span className={`badge badge--${variante}`}>{texto}</span>;
}
