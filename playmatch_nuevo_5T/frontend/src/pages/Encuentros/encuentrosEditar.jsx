import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EditarEncuentro() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [idTorneo, setIdTorneo] = useState (0);
  const [idEquipoLocal, setIdEquipoLocal] = useState (0);
  const [idEquipoVisitante, setIdEquipoVisitante] = useState(0);
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
    axios.get("http://localhost:3000/api/torneos")
        .then(res => setTorneos(res.data));

    axios.get("http://localhost:3000/api/equipos")
        .then(res => setEquipoLocal(res.data));

    axios.get("http://localhost:3000/api/equipos")
        .then(res => setEquipoVisitante(res.data));

    axios.get("http://localhost:3000/api/usuarios")
        .then(res => setArbitros(res.data));

    axios.get("http://localhost:3000/api/encuentros")
    .then((response) => {
        const encuentro = response.data.find (e => e.id_encuentro === parseInt(id));
        if (encuentro){
            setIdTorneo(encuentro.id_torneo);
            setIdEquipoLocal(encuentro.id_equipo_local);
            setIdEquipoVisitante(encuentro.id_equipo_visitante);
            setFecha(encuentro.fecha);
            setLugar(encuentro.lugar);
            setJornada(encuentro.jornada);
            setIdArbitro(encuentro.id_arbitro);
            setEstado(encuentro.estado);
        }
    });
  }, [id]);

  const editar = () => {
    axios.put(`http://localhost:3000/api/encuentros/${id}`, {
      id_torneo: idTorneo,
      id_equipo_local: idEquipoLocal,
      id_equipo_visitante: idEquipoVisitante,
      fecha,
      lugar,
      jornada,
      id_arbitro: idArbitro,
      estado
    }).then(() => {
      alert("Encuentro editado correctamente");
      navigate("/encuentros");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar encuentro</h2>


            <label>Torneo: </label>
            <select value={idTorneo} onChange={(e) => setIdTorneo(e.target.value)}>
                <option value="">Seleccione el torneo</option>
                    {torneos.map(t => (
                        <option key={t.id_torneo} value={t.id_torneo}>
                        {t.nombre}
                </option>
                ))}
            </select>

            <label>Equipo local: </label>
            <select value={idEquipoLocal} onChange={(e) => setIdEquipoLocal(e.target.value)}>
                <option value="">Seleccione el equipo local</option>
                    {equipoLocal.map(e => (
                        <option key={e.id_equipo} value={e.id_equipo}>
                        {e.nombre}
                </option>
                ))}
            </select>

            <label>Equipo visitante: </label>
            <select value={idEquipoVisitante} onChange={(e) => setIdEquipoVisitante(e.target.value)}>
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
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Lugar: </label>
            <br/>
            <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Jornada: </label>
            <br/>
            <input type="text"value={jornada} onChange={(e) => setJornada(e.target.value)}></input>
          </div>

            <label>Arbitro </label>
          <select value={idArbitro} onChange={(e) => setIdArbitro(e.target.value)}>
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
            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)}></input>
          </div>
         
          <button type='button' onClick={editar}>Editar</button>

        </div>
    </div>
  );
}

export default EditarEncuentro;