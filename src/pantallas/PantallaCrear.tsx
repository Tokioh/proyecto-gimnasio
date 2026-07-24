import { useEffect, useMemo, useState } from "react";
import type { Clase, Cliente } from "../dominio";
import {
  calcularTotal,
  DESCUENTO_DESDE_UNIDADES,
  DESCUENTO_PORCENTAJE,
  formatearPrecio,
} from "../dominio/calculos";
import { obtenerFuenteDatos } from "../datos/index";

export function PantallaCrear() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [claseId, setClaseId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [registrando, setRegistrando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<string | null>(null);

  const clasesActivas = useMemo(() => clases.filter((clase) => clase.activo), [clases]);

  const claseSeleccionada = useMemo(
    () => clasesActivas.find((clase) => clase.id === Number(claseId)),
    [clasesActivas, claseId],
  );

  const totalVista = useMemo(() => {
    if (!claseSeleccionada || cantidad < 1) {
      return null;
    }
    return calcularTotal(cantidad, claseSeleccionada.precioUnitario);
  }, [claseSeleccionada, cantidad]);

  const cantidadInvalida =
    !claseSeleccionada || cantidad < 1 || cantidad > claseSeleccionada.disponibles;
  const puedeRegistrar =
    Boolean(claseSeleccionada) &&
    Boolean(clienteId) &&
    cantidad >= 1 &&
    !cantidadInvalida &&
    !registrando;

  async function cargarDatos() {
    setCargando(true);
    setError(null);
    try {
      const fuente = obtenerFuenteDatos();
      const [listaClases, listaClientes] = await Promise.all([
        fuente.listarClases(),
        fuente.listarClientes(),
      ]);
      setClases(listaClases);
      setClientes(listaClientes);
      const primeraActiva = listaClases.find((clase) => clase.activo);
      setClaseId(primeraActiva ? String(primeraActiva.id) : "");
    } catch (e: unknown) {
      const mensaje = e instanceof Error ? e.message : "Error al cargar el formulario";
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargarDatos();
  }, []);

  async function registrar() {
    if (!puedeRegistrar || !claseSeleccionada) {
      return;
    }
    setRegistrando(true);
    setError(null);
    setExito(null);
    try {
      const inscripcion = await obtenerFuenteDatos().crearInscripcion({
        claseId: claseSeleccionada.id,
        clienteId: Number(clienteId),
        cantidad,
      });
      setExito(`Inscripción #${inscripcion.id} registrada por ${formatearPrecio(inscripcion.total)}`);
      await cargarDatos();
      setCantidad(1);
    } catch (e: unknown) {
      const mensaje = e instanceof Error ? e.message : "No se pudo registrar la inscripción";
      setError(mensaje);
    } finally {
      setRegistrando(false);
    }
  }

  if (cargando) {
    return <p className="estado">Cargando formulario...</p>;
  }

  return (
    <section className="tarjeta">
      <h2 className="tarjeta__titulo">Nueva inscripción</h2>

      <form
        className="formulario"
        onSubmit={(evento) => {
          evento.preventDefault();
          void registrar();
        }}
      >
        <label className="campo">
          <span className="campo__etiqueta">
            Clase <span className="campo__requerido">*</span>
          </span>
          <select
            className="campo__control"
            value={claseId}
            onChange={(evento) => setClaseId(evento.target.value)}
          >
            {clasesActivas.map((clase) => (
              <option key={clase.id} value={clase.id}>
                {clase.nombre} — {formatearPrecio(clase.precioUnitario)}
              </option>
            ))}
          </select>
          {claseSeleccionada && (
            <span className="campo__ayuda">
              Quedan {claseSeleccionada.disponibles} disponibles
            </span>
          )}
        </label>

        <div className="campo-fila">
          <label className="campo campo--flex">
            <span className="campo__etiqueta">
              Cliente <span className="campo__requerido">*</span>
            </span>
            <select
              className="campo__control"
              value={clienteId}
              onChange={(evento) => setClienteId(evento.target.value)}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} ({cliente.cedula})
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="boton boton--secundario" disabled title="Disponible en CP3">
            + Nuevo cliente
          </button>
        </div>

        <label className="campo">
          <span className="campo__etiqueta">Cantidad</span>
          <input
            className="campo__control"
            type="number"
            min={1}
            value={cantidad}
            onChange={(evento) => setCantidad(Number(evento.target.value))}
          />
          {claseSeleccionada && cantidad > claseSeleccionada.disponibles && (
            <span className="campo__error">
              Solo quedan {claseSeleccionada.disponibles} disponibles
            </span>
          )}
        </label>

        <div className="resumen">
          <p className="resumen__total">
            Total: {totalVista ? formatearPrecio(totalVista.total) : "$0.00"}
          </p>
          <p className="resumen__nota">
            Desde {DESCUENTO_DESDE_UNIDADES} unidades: {DESCUENTO_PORCENTAJE}% de descuento
          </p>
        </div>

        {error && <p className="mensaje mensaje--error">{error}</p>}
        {exito && <p className="mensaje mensaje--exito">{exito}</p>}

        <button type="submit" className="boton boton--primario" disabled={!puedeRegistrar}>
          {registrando ? "Registrando..." : "Registrar inscripción"}
        </button>
      </form>
    </section>
  );
}
