import { useState } from "react";
import { Cabecera } from "./componentes/Cabecera";
import { PantallaListado } from "./pantallas/PantallaListado";
import { PantallaCrear } from "./pantallas/PantallaCrear";
import "./App.css";

type Vista = "listado" | "crear";

function App() {
  const [vista, setVista] = useState<Vista>("listado");

  return (
    <div className="app">
      <Cabecera />
      <nav className="navegacion">
        <button
          type="button"
          className={`navegacion__enlace ${vista === "listado" ? "navegacion__enlace--activo" : ""}`}
          onClick={() => setVista("listado")}
        >
          Catálogo de clases
        </button>
        <button
          type="button"
          className={`navegacion__enlace ${vista === "crear" ? "navegacion__enlace--activo" : ""}`}
          onClick={() => setVista("crear")}
        >
          Nueva inscripción
        </button>
      </nav>
      <main className="app__contenido">
        {vista === "listado" ? <PantallaListado key="listado" /> : <PantallaCrear key="crear" />}
      </main>
    </div>
  );
}

export default App;
