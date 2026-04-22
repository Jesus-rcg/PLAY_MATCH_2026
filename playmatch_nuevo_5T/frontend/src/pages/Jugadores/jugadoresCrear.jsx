import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Api from "../../api/axios";
import "../../styles/create.css"

function JugadoresCrear() {

  const navigate = useNavigate();

  const [id_equipo, setId_equipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [numero_camiseta, setNumero_camiseta] = useState("");
  const [estado, setEstado] = useState("");
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    Api.get("/equipos")
      .then(res => setEquipos(res.data))
      .catch(err => console.log(err));
  }, []);

  const agregar = () => {
    Api.post("/jugadores", {
      id_equipo,
      nombre,
      apellido,
      documento,
      numero_camiseta,
      estado
    })
    .then(() => {
      alert("Jugador creado correctamente");
      navigate("/jugadores");
    })
  };

  return (
    <div className="container">
      <div className="form-card">

        <h2>Agregar Jugador</h2>

        {/* EQUIPO */}
        <select  onChange={(e) => setId_equipo(e.target.value)}>
          <option value="">Seleccione el equipo</option>
          {equipos.map(e => (
            <option key={e.id_equipo} value={e.id_equipo}>
              {e.nombre}
            </option>
          ))}
        </select>

        {/* NOMBRE */}
        <div className="mb-3">
          <label>Nombre: </label>
          <br/>
          <input type="text" onChange={(e) => setNombre(e.target.value)} />
        </div>

        {/* APELLIDO */}
        <div className="mb-3">
          <label>Apellido: </label>
          <br/>
          <input type="text" onChange={(e) => setApellido(e.target.value)} />
        </div>

        {/* DOCUMENTO */}
        <div className="mb-3">
          <label>Documento: </label>
          <br/>
          <input type="text" onChange={(e) => setDocumento(e.target.value)} />
        </div>

        {/* CAMISETA */}
        <div className="mb-3">
          <label>Número Camiseta: </label>
          <br/>
          <input type="number"  onChange={(e) => setNumero_camiseta(e.target.value)} />
        </div>

        {/* ESTADO */}
        <div className="mb-3">
          <label>Estado:</label>
          <br/>
          <select onChange={(e) => setEstado(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="activo">Activo</option>
            <option value="lesionado">Lesionado</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>

        <button type="button" onClick={agregar}>Agregar</button>

      </div>
    </div>
  );
}

export default JugadoresCrear;