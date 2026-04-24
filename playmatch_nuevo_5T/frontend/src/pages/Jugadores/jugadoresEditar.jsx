import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/create.css"
import JugadoresMostrar from "./jugadoresMostrar";

function EditarUsuario() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [equipo, setEquipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState(null);
  const [numero_camiseta, setNumeroCamiseta] = useState(undefined);
  const [estado, setEstado] = useState("activo");

  const [equipos, setEquipos] = useState([]);

  useEffect(() => {

    Api.get("/equipos")
    .then(res => setEquipos(res.data));
    
    Api.get(`/jugadores`)
      .then((response) => {
        const jugador = response.data.find(j => j.id_jugador === parseInt(id));
        if (jugador) {
          setEquipo(jugador.id_equipo);
          setNombre(jugador.nombre);
          setApellido(jugador.apellido);
          setDocumento(jugador.documento);
          setNumeroCamiseta(jugador.numero_camiseta);
          setEstado(jugador.estado);
        }
      });
  }, [id]);

  const editar = () => {
    Api.put(`/jugadores/${id}`, {
      id_equipo: equipo,
      nombre,
      apellido,
      documento,
      numero_camiseta,
      estado
    }).then(() => {
      alert("Jugador actualizado correctamente");
      navigate("/jugadores");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Jugador</h2>
          
          <label>Equipo:</label>
          <select value={equipo} onChange={(e) => setEquipo(e.target.value)}>
                <option value="">Seleccione el equipo</option>
                    {equipos.map(e => (
                        <option key={e.id_equipo} value={e.id_equipo}>
                        {e.nombre}
                </option>
                ))}
            </select>

          <div className="mb-3">
            <label>Nombre: </label>
            <br/>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Apellido: </label>
            <br/>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Documento: </label>
            <br/>
            <input type="number" value={documento} onChange={(e) => setDocumento(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Número camiseta: </label>
            <br/>
            <input type="number" value={numero_camiseta} onChange={(e) => setNumeroCamiseta(e.target.value)}></input>
          </div>

          <label>Estado:</label>
          <select className="select-rol" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="activo">Activo</option>
            <option value="lesionado">Lesionado</option>
            <option value="suspendido">Suspendido</option>
          </select>
          
          <button type='button' onClick={editar}>Actualizar</button>

        </div>
    </div>
  );
}

export default EditarUsuario;