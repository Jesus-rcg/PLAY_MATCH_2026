import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    try {
      const res = await Api.post("/login", {
        email,
        password
      });

      setMensaje("Inicio de sesión exitoso");

      localStorage.setItem("token", res.data.token)
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
