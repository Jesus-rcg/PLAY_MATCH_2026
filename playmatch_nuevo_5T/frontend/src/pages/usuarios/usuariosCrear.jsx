import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/create.css"

function Usuarios() {

  const navigate = useNavigate();
  const [nombre, setNombre] = useState ("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState(null);
  const [rol, setRol] = useState(undefined);
  const [activo, setActivo] = useState(0);

  const agregar = () => {
    Api.post("/usuarios", {
      nombre,
      email,
      password,
      rol,
      activo
    }).then(() => {
      alert("Usuario creado correctamente");
      navigate("/usuarios");
      setNombre("");
      setEmail("");
      setPassword(null);
      setRol(undefined);
      setActivo(0);
    });
  };

  return (
    <div className="container">
        <div className="form-card">

          <h2>Agregar Usuario</h2>

          <div className="mb-3">
            <label>Nombre: </label>
            <br/>
            <input type="text" onChange={(e) => setNombre(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Email: </label>
            <br/>
            <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div className="mb-3">
            <label>Contraseña: </label>
            <br/>
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <label>Rol:</label>
          <select className="select-rol" onChange={(e) => setRol(e.target.value)}>
            <option selected>Seleccione el rol</option>
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
          
          <button type='button' onClick={agregar}>Agregar</button>

        </div>
    </div>
  );
}

export default Usuarios;