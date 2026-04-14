import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function ResultadosCrear() {

  const navigate = useNavigate();
  const [id_encuentro, setIdEncuentro] = useState ("");
  const [goles_local, setGolesLocal] = useState (0);
  const [goles_visitante, setGolesVisitante] = useState(0);
  const [faltas_local, setFaltasLocal] = useState(0);
  const [faltas_visitante, setFaltasVisitante] = useState(0);
  const [tarjetas_amarillas, setTarjetasAmarillas] = useState(0);
  const [tarjetas_rojas, setTarjetasRojas] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [creador, setCreador] = useState("");

  const [encuentros, setEncuentros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/encuentros")
        .then(res => setEncuentros(res.data));

    axios.get("http://localhost:3000/usuarios")
        .then(res => setUsuarios(res.data));
  }, []);

  const agregar = () => {
    axios.post("http://localhost:3000/resultados/agregar", {
      id_encuentro,
      goles_local,
      goles_visitante,
      faltas_local,
      faltas_visitante,
      tarjetas_amarillas,
      tarjetas_rojas,
      observaciones,
      id_created_by: creador
    }).then(() => {
      alert("Resultado creado correctamente");
      navigate("/resultados");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Agregar resultado</h2>

            <label>Encuentro</label>
            <select onChange={(e) => setIdEncuentro(e.target.value)}>
                <option value="">Seleccione el encuentro</option>
                    {encuentros.map(e => (
                        <option key={e.id_encuentro} value={e.id_encuentro}>
                        {e.id_encuentro}
                </option>
                ))}
            </select>

            <div className="mb-3">
                <label>Goles E.Local: </label>
                <br/>
                <input type="number" onChange={(e) => setGolesLocal(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Goles E.Visitante: </label>
                <br/>
                <input type="number" onChange={(e) => setGolesVisitante(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Faltas E.Local: </label>
                <br/>
                <input type="number" onChange={(e) => setFaltasLocal(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Faltas E.Visitante: </label>
                <br/>
                <input type="number" onChange={(e) => setFaltasVisitante(Number(e.target.value))}></input>
            </div>
            
            <div className="mb-3">
                <label>Tarjetas amarillas: </label>
                <br/>
                <input type="number" onChange={(e) => setTarjetasAmarillas(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Tarjetas rojas: </label>
                <br/>
                <input type="number" onChange={(e) => setTarjetasRojas(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Observaciones: </label>
                <br/>
                <input type="text" onChange={(e) => setObservaciones(e.target.value)}></input>
            </div>

            <label>Creador</label>
            <select onChange={(e) => setCreador(e.target.value)}>
                <option value="">Seleccione el creador</option>
                    {usuarios.map(u => (
                        <option key={u.id_usuario} value={u.id_usuario}>
                        {u.nombre}
                </option>
                ))}
            </select>
         
          <button type='button' onClick={agregar}>Agregar</button>

        </div>
    </div>
  );
}

export default ResultadosCrear;