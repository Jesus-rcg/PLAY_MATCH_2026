import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Api from "../../api/axios";
import "../../styles/eliminar.css"

function EliminarEncuentros() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    Api.delete(`/encuentros/${id}`)
      .then(() => {
        alert("Encuentro eliminado correctamente");
        navigate("/encuentros");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar encuentros</h2>
        <p>¿Estás seguro de que deseas eliminar este encuentro?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/encuentros")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarEncuentros;