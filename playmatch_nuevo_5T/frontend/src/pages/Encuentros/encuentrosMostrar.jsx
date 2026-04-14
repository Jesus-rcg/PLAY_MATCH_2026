import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tabla.css";

function EncuentrosTabla() {

  const [encuentros, setEncuentros] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();


  useEffect(() => {
    obtenerEncuentros();
  }, []);

  const obtenerEncuentros = () => {
    axios.get("http://localhost:3000/encuentros")
      .then(res => {
        setEncuentros(res.data);
      })
      .catch(err => console.log(err));
  };

  const encuentrosFiltrados = encuentros.filter(en => {
    const texto = busqueda.toLowerCase();

    return (
      en.id_encuentro.toString().includes(texto) ||
      en.torneo.toLowerCase().includes(texto) ||
      en.equipo_local.toLowerCase().includes(texto) ||
      en.equipo_visitante.toString().includes(texto) ||
      en.fecha.toString().includes(texto) ||
      en.lugar.toString().includes(texto) ||
      en.jornada.toString().includes(texto) ||
      en.arbitro.toString().includes(texto) ||
      en.estado.toString().includes(texto)
    );
});

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const encuentrosPagina = encuentrosFiltrados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(encuentrosFiltrados.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de encuentros</h2>
      <div className="tabla-header">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => {
          setBusqueda(e.target.value); 
          setPaginaActual(1);
          }}
        />
        <button className="btn-add"
        onClick={() => navigate("/encuentros/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Torneo</th>
            <th>Equipo local</th>
            <th>Equipo visitante</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Jornada</th>
            <th>Arbitro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {encuentrosPagina.length > 0 ? (
            encuentrosPagina.map((en) => (
              <tr key={en.id_encuentro}>
                <td>{en.id_encuentro}</td>
                <td>{en.torneo}</td>
                <td>{en.equipo_local}</td>
                <td>{en.equipo_visitante}</td>
                <td>{en.fecha}</td>
                <td>{en.lugar}</td>
                <td>{en.jornada}</td>
                <td>{en.arbitro}</td>
                <td>{en.estado}</td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/encuentros/editar/${en.id_encuentro}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/encuentros/eliminar/${en.id_encuentro}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No hay resultados</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacion">

        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          Anterior
        </button>

        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={paginaActual === i + 1 ? "activo" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={paginaActual === totalPaginas || totalPaginas === 0}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente
        </button>

      </div>

    </div>
  );
}

export default EncuentrosTabla;