import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/eliminar.css"

function EliminarEquipo() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    Api.delete(`/equipos/${id}`)
      .then(() => {
        alert("Equipo eliminado correctamente");
        navigate("/equipos");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar equipo</h2>
        <p>¿Estás seguro de que deseas eliminar este equipo?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/equipos")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarEquipo;