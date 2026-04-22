import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/eliminar.css"

function EliminarUsuario() {

  const navigate = useNavigate();
  const { id } = useParams();

  const eliminar = () => {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => {
        alert("Usuario eliminado correctamente");
        navigate("/usuarios");
      });
  };

  return (
    <div className="container">
      <div className="delete-card">
        <h2>Eliminar Usuario</h2>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/usuarios")}>Cancelar</button>
      </div>
    </div>
  );
}

export default EliminarUsuario;