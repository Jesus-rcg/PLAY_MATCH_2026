import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EditarTorneo() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState ("");
  const [descripcion, setDescripcion] = useState ("");
  const [fecha_inicio, setFechaInicio] = useState(undefined);
  const [fecha_fin, setFechaFin] = useState(undefined);
  const [estado, setEstado] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/torneos`)
      .then((response) => {
        const torneos = response.data.find(t => t.id_torneo === parseInt(id));
        if (torneos) {
          setNombre(torneos.nombre);
          setDescripcion(torneos.descripcion);
          setFechaInicio(torneos.fecha_inicio);
          setFechaFin(torneos.fecha_fin);
          setEstado(torneos.estado);
        }
      });
  }, [id]);

  const editar = () => {
    axios.put(`http://localhost:3000/torneos/editar/${id}`, {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado
    }).then(() => {
      alert("Torneo actualizado correctamente");
      navigate("/torneos");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Torneo</h2>

          <div className="mb-3">
            <label>Nombre: </label>
            <br/>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Descripcion: </label>
            <br/>
            <input type="email" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Fecha Inicio: </label>
            <br/>
            <input type="date" value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Fecha Finalización: </label>
            <br/>
            <input type="date" value={fecha_fin} onChange={(e) => setFechaFin(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Estado: </label>
            <br/>
            <input type="email" value={estado} onChange={(e) => setEstado(e.target.value)}></input>
          </div>
          
          <button type='button' onClick={editar}>Actualizar</button>

        </div>
    </div>
  );
}

export default EditarTorneo;