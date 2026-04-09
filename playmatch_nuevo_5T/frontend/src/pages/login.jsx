import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        correo,
        password
      });

      setMensaje("Inicio de sesión exitoso");

      // guardar usuario (opcional)
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      // 🔥 redirigir
      setTimeout(() => {
        navigate("/inicioAdmin");
      }, 800);

    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container-login">
      <div className="card-login">

        <h3 className="title">Iniciar Sesión</h3>

        {mensaje && (
          <div className="alert success">{mensaje}</div>
        )}

        {error && (
          <div className="alert error">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary">Ingresar</button>
        </form>

      </div>
    </div>
  );
}

export default Login;
