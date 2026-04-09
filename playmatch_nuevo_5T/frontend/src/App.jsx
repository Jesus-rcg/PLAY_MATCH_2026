import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/index"
import Login from "./pages/login"
import InicioAdmin from "./pages/inicioAdm";
import MostrarUsuarios from "./pages/usuarios/usuariosMostrar";
import AgregarUsuarios from "./pages/usuarios/usuariosCrear";
import EditarUsuarios from "./pages/usuarios/usuariosEditar";
import EliminarUsuarios from "./pages/usuarios/usuariosEliminar";

import MostrarPosiciones from "./pages/posiciones/posicionesMostrar";
import CrearPosicion from "./pages/posiciones/posicionesCrear";
import EditarPosicion from "./pages/posiciones/posicionesEditar";
import EliminarPosicion from "./pages/posiciones/posicionesEliminar";

import MostrarEquipos from "./pages/equipos/equiposMostrar";
import CrearEquipo from "./pages/equipos/equiposCrear";
import EditarEquipo from "./pages/equipos/equiposEditar";
import EliminarEquipo from "./pages/equipos/equiposEliminar";

import MostrarTorneos from "./pages/torneos/torneosMostrar";
import CrearTorneo from "./pages/torneos/torneosCrear";
import EditarTorneo from "./pages/torneos/torneosEditar";
import EliminarTorneo from "./pages/torneos/torneosEliminar";

import MostrarJugadores from "./pages/Jugadores/jugadoresMostrar";
import CrearJugadores from "./pages/Jugadores/jugadoresCrear";
import EditarJugadores from "./pages/Jugadores/jugadoresEditar";
import EliminarJugadores from "./pages/Jugadores/jugadoresEliminar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route element={<InicioAdmin />}>
        <Route path="/inicioAdmin" element={<InicioAdmin />} />

          <Route path="/usuarios" element={<MostrarUsuarios />} />
          <Route path="/usuarios/agregar" element={<AgregarUsuarios />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuarios />} />
          <Route path="/usuarios/eliminar/:id" element={<EliminarUsuarios />} />

          <Route path="/posiciones" element={<MostrarPosiciones />} />
          <Route path="/posiciones/agregar" element={<CrearPosicion />} />
          <Route path="/posiciones/editar/:id" element={<EditarPosicion />} />
          <Route path="/posiciones/eliminar/:id" element={<EliminarPosicion />} />

          <Route path="/equipos" element={<MostrarEquipos />} />
          <Route path="/equipos/agregar" element={<CrearEquipo />} />
          <Route path="/equipos/editar/:id" element={<EditarEquipo />} />
          <Route path="/equipos/eliminar/:id" element={<EliminarEquipo />} />

          <Route path="/torneos" element={<MostrarTorneos />} />
          <Route path="/torneos/agregar" element={<CrearTorneo />} />
          <Route path="/torneos/editar/:id" element={<EditarTorneo />} />
          <Route path="/torneos/eliminar/:id" element={<EliminarTorneo />} />

          <Route path="/jugadores" element={<MostrarJugadores />} />
          <Route path="/jugadores/agregar" element={<CrearJugadores />} />
          <Route path="/jugadores/editar/:id" element={<EditarJugadores />} />
          <Route path="/jugadores/eliminar/:id" element={<EliminarJugadores/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
