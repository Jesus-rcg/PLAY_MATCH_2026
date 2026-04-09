import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tabla.css";

function TorneosTabla() {

  const [torneos, setTorneos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();


  useEffect(() => {
    obtenerTorneos();
  }, []);

  const obtenerTorneos = () => {
    axios.get("http://localhost:3000/torneos")
      .then(res => {
        setTorneos(res.data);
      })
      .catch(err => console.log(err));
  };

  const torneosFiltrados = torneos.filter(t => {
    const texto = busqueda.toLowerCase();

    return (
      t.id_torneo.toString().includes(texto) ||
      t.nombre.toLowerCase().includes(texto) ||
      t.descripcion.toLowerCase().includes(texto) ||
      t.fecha_inicio.toLowerCase().includes(texto) ||
      t.fecha_fin.toString().includes(texto) ||
      t.estado.toString().includes(texto)
    );
  });

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const torneosPagina = torneosFiltrados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(torneosFiltrados.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de torneos</h2>
      <div className="tabla-header">
        <input
          type="text"
          placeholder="Buscar.. "
          onChange={(e) => {
          setBusqueda(e.target.value); 
          setPaginaActual(1);
          }}
        />
        <button className="btn-add"
        onClick={() => navigate("/torneos/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Fecha de inicio</th>
            <th>Fecha de finalización</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {torneosPagina.length > 0 ? (
            torneosPagina.map((t) => (
              <tr key={t.id_torneo}>
                <td>{t.id_torneo}</td>
                <td>{t.nombre}</td>
                <td>{t.descripcion}</td>
                <td>{t.fecha_inicio}</td>
                <td>{t.fecha_fin}</td>
                <td>{t.estado}</td>
                <td>
                  <button className="btn-edit"  onClick={() => navigate(`/torneos/editar/${t.id_torneo}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/torneos/eliminar/${t.id_torneo}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay resultados</td>
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

export default TorneosTabla;