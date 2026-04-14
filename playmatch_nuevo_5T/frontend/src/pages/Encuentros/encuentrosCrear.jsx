import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EncuentrosCrear() {

  const navigate = useNavigate();
  const [idTorneo, setIdTorneo] = useState ("");
  const [idEquipoLocal, setIdEquipoLocal] = useState ("");
  const [idEquipoVisitante, setIdEquipoVisitante] = useState("");
  const [fecha, setFecha] = useState(undefined);
  const [lugar, setLugar] = useState("");
  const [jornada, setJornada] = useState("");
  const [idArbitro, setIdArbitro] = useState(0);
  const [estado, setEstado] = useState(0);

  const [torneos, setTorneos] = useState([]);
  const [equipoLocal, setEquipoLocal] = useState([]);
  const [equipoVisitante, setEquipoVisitante] = useState([]);
  const [arbitros, setArbitros] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/torneos")
        .then(res => setTorneos(res.data));

    axios.get("http://localhost:3000/equipos")
        .then(res => setEquipoLocal(res.data));

    axios.get("http://localhost:3000/equipos")
        .then(res => setEquipoVisitante(res.data));

    axios.get("http://localhost:3000/usuarios")
        .then(res => setArbitros(res.data));
  }, []);

  const agregar = () => {
    axios.post("http://localhost:3000/encuentros/agregar", {
      id_torneo: idTorneo,
      id_equipo_local: idEquipoLocal,
      id_equipo_visitante: idEquipoVisitante,
      fecha,
      lugar,
      jornada,
      id_arbitro: idArbitro,
      estado
    }).then(() => {
      alert("Encuentro creado correctamente");
      navigate("/encuentros");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Agregar Encuentro</h2>

            <label>Torneo: </label>
            <select onChange={(e) => setIdTorneo(e.target.value)}>
                <option value="">Seleccione el torneo</option>
                    {torneos.map(t => (
                        <option key={t.id_torneo} value={t.id_torneo}>
                        {t.nombre}
                </option>
                ))}
            </select>

            <label>Equipo Local: </label>
            <select onChange={(e) => setIdEquipoLocal(e.target.value)}>
                <option value="">Seleccione el equipo local</option>
                    {equipoLocal.map(e => (
                        <option key={e.id_equipo} value={e.id_equipo}>
                        {e.nombre}
                </option>
                ))}
            </select>


            <label>Equipo visitante: </label>
            <select onChange={(e) => setIdEquipoVisitante(e.target.value)}>
                <option value="">Seleccione el equipo visitante</option>
                    {equipoVisitante.map(e => (
                        <option key={e.id_equipo} value={e.id_equipo}>
                        {e.nombre}
                </option>
                ))}
            </select>

          <div className="mb-3">
            <label>Fecha: </label>
            <br/>
            <input type="date" onChange={(e) => setFecha(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Lugar: </label>
            <br/>
            <input type="text" onChange={(e) => setLugar(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Jornada: </label>
            <br/>
            <input type="text" onChange={(e) => setJornada(e.target.value)}></input>
          </div>
                
        <label>Arbitro: </label>   
          <select onChange={(e) => setIdArbitro(e.target.value)}>
                <option value="">Seleccione el arbitro:</option>
                    {arbitros.map(a => (
                        <option key={a.id_usuario} value={a.id_usuario}>
                        {a.nombre}
                </option>
                ))}
          </select>

          <div className="mb-3">
            <label>Estado: </label>
            <br/>
            <input type="text" onChange={(e) => setEstado(e.target.value)}></input>
          </div>
         
          <button type='button' onClick={agregar}>Agregar</button>

        </div>
    </div>
  );
}

export default EncuentrosCrear;