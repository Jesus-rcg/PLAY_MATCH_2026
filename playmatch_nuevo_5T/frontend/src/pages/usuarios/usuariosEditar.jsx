import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/create.css"

function EditarUsuario() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [rol, setRol] = useState(undefined);
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/usuarios`)
      .then((response) => {
        const usuario = response.data.find(u => u.id_usuario === parseInt(id));
        if (usuario) {
          setNombre(usuario.nombre);
          setEmail(usuario.email);
          setRol(usuario.rol);
          setActivo(usuario.activo);
        }
      });
  }, [id]);

  const editar = () => {
    axios.put(`http://localhost:3000/api/usuarios/${id}`, {
      nombre,
      email,
      password,
      rol,
      activo
    }).then(() => {
      alert("Usuario actualizado correctamente");
      navigate("/usuarios");
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Editar Usuario</h2>

          <div className="mb-3">
            <label>Nombre: </label>
            <br/>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Email: </label>
            <br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Contraseña: </label>
            <br/>
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <label>Rol:</label>
          <select className="select-rol" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="admin">Administrador</option>
            <option value="arbitro">Árbitro</option>
            <option value="entrenador">Entrenador</option>
            <option value="consultor">Consultor</option>
          </select>

          <label>¿Activo?</label>
          <select className="select-activo" onChange={(e) => setActivo(e.target.value)}>
            <option selected>Seleccione</option>
            <option value="1">Si</option>
            <option value="2">No</option>
          </select>
          
          <button type='button' onClick={editar}>Actualizar</button>

        </div>
    </div>
  );
}

export default EditarUsuario;