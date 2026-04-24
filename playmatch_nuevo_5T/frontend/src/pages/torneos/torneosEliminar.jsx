import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/eliminar.css"

function EliminarTorneo() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    Api.delete(`/torneos/${id}`)
      .then(() => {
        alert("Torneo eliminado correctamente");
        navigate("/torneos");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar Torneo</h2>
        <p>¿Estás seguro de que deseas eliminar este torneo?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/usuarios")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarTorneo;