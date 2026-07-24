import { FUENTE_ACTIVA } from "../datos/index";

export function Cabecera() {
  return (
    <header className="cabecera">
      <div className="cabecera__marca">
        <h1 className="cabecera__titulo">Gimnasio Atlas</h1>
        <p className="cabecera__subtitulo">Sistema de inscripciones</p>
      </div>
      <p className="cabecera__fuente">
        Fuente: <strong>{FUENTE_ACTIVA}</strong>
      </p>
    </header>
  );
}
