import type { ReactNode } from "react";

export interface ColumnaTabla<T> {
  encabezado: string;
  render: (fila: T) => ReactNode;
}

interface TablaProps<T> {
  columnas: ColumnaTabla<T>[];
  datos: T[];
}

export function Tabla<T>({ columnas, datos }: TablaProps<T>) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          {columnas.map((columna) => (
            <th key={columna.encabezado}>{columna.encabezado}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, indice) => (
          <tr key={indice}>
            {columnas.map((columna) => (
              <td key={columna.encabezado}>{columna.render(fila)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
