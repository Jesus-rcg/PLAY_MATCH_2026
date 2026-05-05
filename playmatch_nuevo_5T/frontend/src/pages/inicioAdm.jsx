import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/inicioAdmin.css";

function InicioAdmin() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!usuario || !token) {
      navigate("/login");
    }
  }, [usuario, token, navigate]);

  if (!usuario) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout-container">
  
      <aside className="sidebar">
        <div className="brand-title">🏆 Playmatch</div>
        
        <div className="sidebar-content">
          <Link to="/usuarios" className="sidebar-link">
            <i className="fas fa-user-cog"></i> Usuarios
          </Link>
          <Link to="/torneos" className="sidebar-link">
            <i className="fas fa-trophy"></i> Torneos
          </Link>
          <Link to="/equipos" className="sidebar-link">
            <i className="fas fa-users"></i> Equipos
          </Link>

          <Link to="/posiciones" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Posiciones
          </Link>

          <Link to="/jugadores" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Jugadores
          </Link>

          <Link to="/encuentros" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Encuentros
          </Link>

          <Link to="/resultados" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Resultados
          </Link>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn btn-light w-100">
            Cerrar sesión
          </button>
        </div>  
      </aside>

      <main id="main-view" className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default InicioAdmin;