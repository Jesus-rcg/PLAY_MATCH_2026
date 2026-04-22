import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/eliminar.css"

function EliminarEncuentros() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    axios.delete(`http://localhost:3000/api/encuentros/${id}`)
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