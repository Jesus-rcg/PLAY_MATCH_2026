import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/eliminar.css"

function EliminarPosicion() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    Api.delete(`/posiciones/${id}`)
      .then(() => {
        alert("Posición eliminada correctamente");
        navigate("/posiciones");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar posicion</h2>
        <p>¿Estás seguro de que deseas eliminar esta posición?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/posiciones")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarPosicion;