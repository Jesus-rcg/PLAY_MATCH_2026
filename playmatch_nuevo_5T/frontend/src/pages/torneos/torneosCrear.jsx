import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function TorneosCrear() {

  const navigate = useNavigate();
  const [nombre, setNombre] = useState ("");
  const [descripcion, setDescripcion] = useState ("");
  const [fecha_inicio, setFechaInicio] = useState(undefined);
  const [fecha_fin, setFechaFin] = useState(undefined);
  const [estado, setEstado] = useState(0);

  const agregar = () => {
    axios.post("http://localhost:3000/torneos/agregar", {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado
    }).then(() => {
      alert("Torneo creado correctamente");
      navigate("/torneos");
      setNombre("");
      setDescripcion("");
      setFechaInicio(undefined);
      setFechaFin(undefined);
      setEstado(0);
      obtenerTorneos();
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Agregar Torneo</h2>

          <div className="mb-3">
            <label>Nombre: </label>
            <br/>
            <input type="text" onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Descripcion: </label>
            <br/>
            <input type="email" onChange={(e) => setDescripcion(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Fecha Inicio: </label>
            <br/>
            <input type="date" onChange={(e) => setFechaInicio(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Fecha Finalización: </label>
            <br/>
            <input type="date" onChange={(e) => setFechaFin(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Estado: </label>
            <br/>
            <input type="email" onChange={(e) => setEstado(e.target.value)}></input>
          </div>
          
          <button type='button' onClick={agregar}>Agregar</button>

        </div>
    </div>
  );
}

export default TorneosCrear;