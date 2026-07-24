import { useEffect, useState } from "react";
import type { Clase } from "../dominio";
import { obtenerFuenteDatos } from "../datos/index";
import { Badge } from "../componentes/Badge";
import { Tabla } from "../componentes/Tabla";

function formatearPrecio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}

export function PantallaListado() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerFuenteDatos()
      .listarClases()
      .then(setClases)
      .catch((e: unknown) => {
        const mensaje = e instanceof Error ? e.message : "Error al cargar clases";
        setError(mensaje);
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p className="estado">Cargando catálogo...</p>;
  }

  if (error) {
    return <p className="estado estado--error">{error}</p>;
  }

  return (
    <section className="tarjeta">
      <h2 className="tarjeta__titulo">Catálogo de clases</h2>
      <Tabla
        datos={clases}
        columnas={[
          { encabezado: "Clase", render: (clase) => clase.nombre },
          { encabezado: "Precio", render: (clase) => formatearPrecio(clase.precioUnitario) },
          { encabezado: "Disponibles", render: (clase) => clase.disponibles },
          {
            encabezado: "Estado",
            render: (clase) => (
              <Badge
                texto={clase.activo ? "Activo" : "Inactivo"}
                variante={clase.activo ? "activo" : "inactivo"}
              />
            ),
          },
        ]}
      />
    </section>
  );
}
