import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EditarPosicion() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [idTorneo, setIdTorneo] = useState ("");
  const [idEquipo, setIdEquipo] = useState ("");
  const [jugados, setJugados] = useState(0);
  const [ganados, setGanados] = useState(0);
  const [empatados, setEmpatados] = useState(0);
  const [perdidos, setPerdidos] = useState(0);
  const [golesAFavor, setGolesAFavor] = useState(0);
  const [golesEnContra, setGolesEnContra] = useState(0);

  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/torneos")
        .then(res => setTorneos(res.data));

    axios.get("http://localhost:3000/equipos")
        .then(res => setEquipos(res.data));

    axios.get("http://localhost:3000/posiciones")
    .then((response) => {
        const posicion = response.data.find (p => p.id_posicion === parseInt(id));
        if (posicion){
            setIdTorneo(posicion.id_torneo);
            setIdEquipo(posicion.id_equipo);
            setJugados(posicion.jugados);
            setGanados(posicion.ganados);
            setEmpatados(posicion.empatados);
            setPerdidos(posicion.perdidos);
            setGolesAFavor(posicion.gf);
            setGolesEnContra(posicion.gc);
        }
    });
  }, [id]);

  const editar = () => {
    axios.put(`http://localhost:3000/posiciones/editar/${id}`, {
      id_torneo: idTorneo,
      id_equipo: idEquipo,
      jugados,
      ganados,
      empatados,
      perdidos,
      gf: golesAFavor,
      gc: golesEnContra
    }).then(() => {
      alert("Posición editada correctamente");
      navigate("/posiciones");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Posicion</h2>

            <select value={idTorneo} onChange={(e) => setIdTorneo(e.target.value)}>
                <option value="">Seleccione el torneo</option>
                    {torneos.map(t => (
                        <option key={t.id_torneo} value={t.id_torneo}>
                        {t.nombre}
                </option>
                ))}
            </select>

            <select value={idEquipo} onChange={(e) => setIdEquipo(e.target.value)}>
                <option value="">Seleccione el equipo</option>
                    {equipos.map(e => (
                        <option key={e.id_equipo} value={e.id_equipo}>
                        {e.nombre}
                </option>
                ))}
            </select>

          <div className="mb-3">
            <label>Partidos jugados: </label>
            <br/>
            <input type="number" value={jugados} onChange={(e) => setJugados(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Partidos ganados: </label>
            <br/>
            <input type="number" value={ganados} onChange={(e) => setGanados(Number(e.target.value))}></input>
          </div>

          <div className="mb-3">
            <label>Partidos empatados: </label>
            <br/>
            <input type="number" value={empatados} onChange={(e) => setEmpatados(Number(e.target.value))}></input>
          </div>

          <div className="mb-3">
            <label>Partidos perdidos: </label>
            <br/>
            <input type="number" value={perdidos} onChange={(e) => setPerdidos(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Goles a Favor: </label>
            <br/>
            <input type="number" value={golesAFavor} onChange={(e) => setGolesAFavor(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Goles en Contra: </label>
            <br/>
            <input type="number" value={golesEnContra} onChange={(e) => setGolesEnContra(e.target.value)}></input>
          </div>
         
          <button type='button' onClick={editar}>Editar</button>

        </div>
    </div>
  );
}

export default EditarPosicion;