import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/eliminar.css"

function EliminarResultado() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    axios.delete(`http://localhost:3000/resultados/eliminar/${id}`)
      .then(() => {
        alert("Resultado eliminado correctamente");
        navigate("/resultados");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar resultado</h2>
        <p>¿Estás seguro de que deseas eliminar este resultado?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/resultados")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarResultado;