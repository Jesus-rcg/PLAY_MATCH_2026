import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/tabla.css";

function EquiposTabla() {

  const [equipos, setEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();


  const obtenerEquipos = () => {
    Api.get("/equipos")
      .then(res => {
        setEquipos(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerEquipos();
  }, []);

  const equiposFiltados = equipos.filter(e => {
    const texto = busqueda.toLowerCase();

    return (
      e.id_equipo.toString().includes(texto) ||
      e.torneo.toLowerCase().includes(texto) ||
      e.nombre.toString().includes(texto) ||
      e.entrenador.toString().includes(texto)
    );
});

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const posicionesPagina = equiposFiltados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(equiposFiltados.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de equipos</h2>
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
        onClick={() => navigate("/equipos/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Torneo</th>
            <th>Nombre</th>
            <th>Entrenador</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {posicionesPagina.length > 0 ? (
            posicionesPagina.map((e) => (
              <tr key={e.id_equipo}>
                <td>{e.id_equipo}</td>
                <td>{e.torneo}</td>
                <td>{e.nombre}</td>
                <td>{e.entrenador}</td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/equipos/editar/${e.id_equipo}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/equipos/eliminar/${e.id_equipo}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay resultados</td>
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

export default EquiposTabla;