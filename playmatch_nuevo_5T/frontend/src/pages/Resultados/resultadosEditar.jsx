import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/create.css"

function EditarResultado() {

  const navigate = useNavigate();
  const { id } = useParams();
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
    Api.get("/encuentros")
        .then(res => setEncuentros(res.data));

    Api.get("/usuarios")
        .then(res => setUsuarios(res.data));

    Api.get("/resultados")
    .then((response) => {
        const resultado = response.data.find (r => r.id_resultado === parseInt(id));
        if (resultado){
            setIdEncuentro(resultado.id_resultado);
            setGolesLocal(resultado.goles_local);
            setGolesVisitante(resultado.goles_visitante);
            setFaltasLocal(resultado.faltas_local);
            setFaltasVisitante(resultado.faltas_visitante);
            setTarjetasAmarillas(resultado.tarjetas_amarillas);
            setTarjetasRojas(resultado.tarjetas_rojas);
            setObservaciones(resultado.observaciones);
            setCreador(resultado.id_created_by);
        }
    });
  }, [id]);

  const editar = () => {
    Api.put(`/resultados/${id}`, {
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
      alert("Resultado editado correctamente");
      navigate("/resultados");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Resultados</h2>

            <label>Encuentro</label>
            <select value={id_encuentro} onChange={(e) => setIdEncuentro(e.target.value)}>
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
                <input type="number" value={goles_local} onChange={(e) => setGolesLocal(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Goles E.Visitante: </label>
                <br/>
                <input type="number" value={goles_visitante} onChange={(e) => setGolesVisitante(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Faltas E.Local: </label>
                <br/>
                <input type="number" value={faltas_local} onChange={(e) => setFaltasLocal(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Faltas E.Visitante: </label>
                <br/>
                <input type="number" value={faltas_visitante} onChange={(e) => setFaltasVisitante(Number(e.target.value))}></input>
            </div>
            
            <div className="mb-3">
                <label>Tarjetas amarillas: </label>
                <br/>
                <input type="number" value={tarjetas_amarillas} onChange={(e) => setTarjetasAmarillas(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Tarjetas rojas: </label>
                <br/>
                <input type="number" value={tarjetas_rojas} onChange={(e) => setTarjetasRojas(Number(e.target.value))}></input>
            </div>

            <div className="mb-3">
                <label>Observaciones: </label>
                <br/>
                <input type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></input>
            </div>

            <label>Creador</label>
            <select value={creador} onChange={(e) => setCreador(e.target.value)}>
                <option value="">Seleccione el creador</option>
                    {usuarios.map(u => (
                        <option key={u.id_usuario} value={u.id_usuario}>
                        {u.nombre}
                </option>
                ))}
            </select>
         
          <button type='button' onClick={editar}>Editar</button>

        </div>
    </div>
  );
}

export default EditarResultado;