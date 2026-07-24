import { Cabecera } from "./componentes/Cabecera";
import { PantallaListado } from "./pantallas/PantallaListado";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Cabecera />
      <main className="app__contenido">
        <PantallaListado />
      </main>
    </div>
  );
}

export default App;
