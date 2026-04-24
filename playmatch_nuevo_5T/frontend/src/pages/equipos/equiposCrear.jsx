import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/create.css"

function EquiposCrear() {

  const navigate = useNavigate();
  const [id_torneo, setIdTorneo] = useState (0);
  const [nombre, setNombre] = useState("");
  const [entrenador, setEntrenador] = useState("");

  const [torneos, setTorneos] = useState([]);



  useEffect(() => {
    Api.get("/torneos")
        .then(res => setTorneos(res.data));
  }, []);

  const agregar = () => {
    Api.post("/equipos", {
    id_torneo, 
    nombre, 
    entrenador
    }).then(() => {
      alert("Equipo creado correctamente");
      navigate("/equipos");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Agregar Equipo</h2>

            <select onChange={(e) => setIdTorneo(e.target.value)}>
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
            <input type="text" onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Entrenador: </label>
            <br/>
            <input type="text" onChange={(e) => setEntrenador(e.target.value)}></input>
          </div>
         
          <button type='button' onClick={agregar}>Agregar</button>

        </div>
    </div>
  );
}

export default EquiposCrear;