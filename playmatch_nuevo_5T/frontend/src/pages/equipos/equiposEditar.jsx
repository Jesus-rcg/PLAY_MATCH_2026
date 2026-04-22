import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EditarEquipo() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [idTorneo, setIdTorneo] = useState (0);
  const [nombre, setNombre] = useState("");
  const [entrenador, setEntrenador] = useState("");

  const [torneos, setTorneos] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/torneos")
        .then(res => setTorneos(res.data));

    axios.get("http://localhost:3000/api/equipos")
    .then((response) => {
        const equipo = response.data.find (e => e.id_equipo === parseInt(id));
        if (equipo){
            setIdTorneo(equipo.id_torneo);
            setNombre(equipo.nombre);
            setEntrenador(equipo.entrenador);
        }
    });
  }, [id]);

  const editar = () => {
    axios.put(`http://localhost:3000/api/equipos/${id}`, {
      id_torneo: idTorneo,
      nombre,
      entrenador
    }).then(() => {
      alert("Equipo editado correctamente");
      navigate("/equipos");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Equipo</h2>

           <select value={idTorneo} onChange={(e) => setIdTorneo(e.target.value)}>
                <option value="">Seleccione el torneo</option>
                    {torneos.map(t => (
                        <option key={t.id_torneo} value={t.id_torneo}>
                        {t.nombre}
                </option>
                ))}
            </select>

          <div className="mb-3">
            <label>Nombre del equipo: </label>
            <br/>
            <input type="text" value={nombre}onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Entrenador: </label>
            <br/>
            <input type="text" value={entrenador}onChange={(e) => setEntrenador(e.target.value)}></input>
          </div>
         
          <button type='button' onClick={editar}>Editar</button>

        </div>
    </div>
  );
}

export default EditarEquipo;